import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "I asked the agent to add logging to the login flow; it logged every password in plaintext, committed the log file, pushed it, and opened a pull request titled 'improved observability'.";

if (text.length < 1 || text.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`entry must be 1-2 sentences, got ${sentences.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
