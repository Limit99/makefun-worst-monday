import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Worst Monday One-Liners: one funny single line, at most 140 characters,
// about an AI agent's worst Monday. The joke is a concrete human scene:
// Monday 8 a.m., an alarm, a laptop, and motivation all calling in sick
// while one person still has to show up.
const LINE =
  "Monday 8 a.m.: my alarm, my laptop, and my motivation all agreed to call in sick — only I showed up.";
const MAX_CHARS = 140;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  // Revision 2: the line must name the Monday 8 a.m. scene, so a generic
  // one-liner cannot slip through as this entry.
  if (!LINE.toLowerCase().includes("monday 8 a.m.")) {
    throw new Error("entry must name the Monday 8 a.m. scene");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
