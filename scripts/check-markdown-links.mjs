import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const IGNORED_DIRS = new Set([".git", "node_modules", "dist", "build", ".next"]);
const LINK_PATTERN = /!?\[[^\]]*\]\(([^)]+)\)/g;

export async function collectMarkdownFiles(root) {
  const files = [];
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) await walk(path.join(directory, entry.name));
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(path.join(directory, entry.name));
      }
    }
  }
  await walk(root);
  return files.sort();
}

function parseTarget(raw) {
  const trimmed = raw.trim();
  const target = trimmed.startsWith("<") ? trimmed.slice(1, trimmed.indexOf(">")) : trimmed.split(/\s+["']/)[0];
  return target.replace(/&amp;/g, "&");
}

function headingSlug(text) {
  return text.toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function getHeadings(markdown) {
  const headings = new Set();
  const counts = new Map();
  for (const line of markdown.split(/\r?\n/)) {
    const match = /^#{1,6}\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const base = headingSlug(match[1]);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    headings.add(count === 0 ? base : `${base}-${count}`);
  }
  return headings;
}

export async function checkMarkdownLinks(root) {
  const absoluteRoot = path.resolve(root);
  const markdownFiles = await collectMarkdownFiles(absoluteRoot);
  const contentCache = new Map();
  const issues = [];

  async function readMarkdown(file) {
    if (!contentCache.has(file)) contentCache.set(file, await readFile(file, "utf8"));
    return contentCache.get(file);
  }

  for (const file of markdownFiles) {
    const content = await readMarkdown(file);
    LINK_PATTERN.lastIndex = 0;
    let match;
    while ((match = LINK_PATTERN.exec(content)) !== null) {
      const target = parseTarget(match[1]);
      if (!target || /^(?:https?:|mailto:|tel:|data:)/i.test(target)) continue;
      const [pathPart, ...fragmentParts] = target.split("#");
      const fragment = fragmentParts.join("#");
      if (!pathPart && !fragment) continue;

      let destination;
      try {
        const decoded = decodeURIComponent(pathPart);
        destination = path.resolve(path.dirname(file), decoded || path.basename(file));
      } catch {
        issues.push({ file: path.relative(absoluteRoot, file), target, reason: "invalid URL encoding" });
        continue;
      }
      if (!destination.startsWith(absoluteRoot + path.sep) && destination !== absoluteRoot) {
        issues.push({ file: path.relative(absoluteRoot, file), target, reason: "link escapes documentation root" });
        continue;
      }

      let destinationFile = destination;
      try {
        const destinationStat = await stat(destination);
        if (destinationStat.isDirectory()) {
          const candidates = [path.join(destination, "README.md"), path.join(destination, "index.md")];
          destinationFile = "";
          for (const candidate of candidates) {
            try {
              const candidateStat = await stat(candidate);
              if (candidateStat.isFile()) { destinationFile = candidate; break; }
            } catch {}
          }
          if (!destinationFile) {
            issues.push({ file: path.relative(absoluteRoot, file), target, reason: "directory has no README.md or index.md" });
            continue;
          }
        } else if (!destinationStat.isFile()) {
          issues.push({ file: path.relative(absoluteRoot, file), target, reason: "target is not a file" });
          continue;
        }
      } catch {
        issues.push({ file: path.relative(absoluteRoot, file), target, reason: "target does not exist" });
        continue;
      }

      if (fragment) {
        if (!destinationFile.toLowerCase().endsWith(".md")) continue;
        const targetContent = await readMarkdown(destinationFile);
        const headings = getHeadings(targetContent);
        if (!headings.has(decodeURIComponent(fragment))) {
          issues.push({ file: path.relative(absoluteRoot, file), target, reason: "heading anchor does not exist" });
        }
      }
    }
  }
  return issues;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = process.argv[2] ?? ".";
  const issues = await checkMarkdownLinks(root);
  if (issues.length > 0) {
    for (const issue of issues) console.error(`${issue.file}: [${issue.reason}] ${issue.target}`);
    console.error(`Found ${issues.length} broken Markdown link(s).`);
    process.exitCode = 1;
  } else {
    console.log("All local Markdown links and heading anchors are valid.");
  }
}
