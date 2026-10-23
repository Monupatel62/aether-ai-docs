const MAX_CHARS = 2000000;
const LINK = /\[[^\]]*\]\(([^)]+)\)/g;

export function lintMarkdown(content, path = "document.md") {
  const errors = [];
  if (typeof content !== "string") return Object.freeze({ path, valid: false, errors: Object.freeze(["content must be a string"]) });
  if (content.length > MAX_CHARS) return Object.freeze({ path, valid: false, errors: Object.freeze(["document exceeds size limit"]) });
  const lines = content.split(/\r?\n/);
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) { if (!fence) fence = marker[1][0]; else if (fence === marker[1][0]) fence = null; continue; }
    if (fence) continue;
    for (const match of line.matchAll(LINK)) {
      const target = match[1].trim();
      if (!target || /\s/.test(target)) errors.push("line " + (i + 1) + ": link target is empty or contains unescaped whitespace");
      if (/^javascript:/i.test(target)) errors.push("line " + (i + 1) + ": javascript links are forbidden");
      if (/^http:\/\//i.test(target)) errors.push("line " + (i + 1) + ": external links must use HTTPS");
    }
    if (/^\s*#{7,}\s/.test(line)) errors.push("line " + (i + 1) + ": heading depth cannot exceed six");
    if (/\s+$/.test(line) && line.trim()) errors.push("line " + (i + 1) + ": trailing whitespace");
  }
  if (fence) errors.push("unclosed fenced code block");
  return Object.freeze({ path, valid: errors.length === 0, errors: Object.freeze(errors) });
}

export function lintMarkdownFiles(files) {
  if (!Array.isArray(files)) throw new TypeError("files must be an array");
  const results = files.map((file) => lintMarkdown(file.content, file.path));
  return Object.freeze({ valid: results.every((item) => item.valid), filesChecked: results.length, results: Object.freeze(results) });
}
