import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { checkMarkdownLinks } from "../scripts/check-markdown-links.mjs";

test("detects missing local files and anchors while ignoring external links", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "aether-docs-"));
  try {
    await mkdir(path.join(root, "guide"));
    await writeFile(path.join(root, "README.md"), "# Home\n\n[Good](guide/intro.md#setup) [Missing](absent.md) [External](https://example.com)\n");
    await writeFile(path.join(root, "guide", "intro.md"), "# Introduction\n\n## Setup\n");
    const issues = await checkMarkdownLinks(root);
    assert.equal(issues.length, 1);
    assert.equal(issues[0]?.target, "absent.md");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("detects missing anchors and links escaping the root", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "aether-docs-"));
  try {
    await writeFile(path.join(root, "README.md"), "# Home\n\n[Bad anchor](README.md#missing) [Escape](../outside.md)\n");
    const issues = await checkMarkdownLinks(root);
    assert.equal(issues.length, 2);
    assert.ok(issues.some(issue => issue.reason === "heading anchor does not exist"));
    assert.ok(issues.some(issue => issue.reason === "link escapes documentation root"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
