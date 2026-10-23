import test from "node:test";
import assert from "node:assert/strict";
import { lintMarkdown, lintMarkdownFiles } from "../src/index.js";
test("accepts ordinary markdown and fenced examples", () => { assert.equal(lintMarkdown("# Guide\n\n[Secure](https://example.com)\n\n```js\nconst x = 1;\n```").valid, true); });
test("rejects unsafe links, excessive headings, whitespace, and unclosed fences", () => {
  const result = lintMarkdown("####### Too deep\n[bad](javascript:alert(1))\n[http](http://example.com) \n```js\n");
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("javascript")));
  assert.ok(result.errors.some((e) => e.includes("HTTPS")));
  assert.ok(result.errors.some((e) => e.includes("unclosed")));
  assert.ok(result.errors.some((e) => e.includes("heading depth")));
});
test("validates a collection and reports paths", () => {
  const result = lintMarkdownFiles([{ path: "a.md", content: "# Good" }, { path: "b.md", content: "[x](javascript:bad)" }]);
  assert.equal(result.valid, false); assert.equal(result.filesChecked, 2); assert.equal(result.results[1].path, "b.md");
});
test("rejects oversized and non-string content safely", () => { assert.equal(lintMarkdown(null).valid, false); assert.ok(lintMarkdown("x".repeat(2000001)).errors.some((e) => e.includes("size limit"))); });
