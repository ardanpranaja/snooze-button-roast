// snooze-button-roast: one line roasting an alarm clock that dares
// to ring at 6 AM on a Saturday. The joke is the reversal — the
// alarm acts like a panicked commuter, but it has nowhere to be
// and no job at all. The punchline lands in the last few words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a single line, at most 200 characters, naming the
// alarm clock, the 6 AM hour, and the Saturday morning it ruined.
const ENTRY_LINE =
  "At 6 AM on a Saturday, my alarm clock screamed like it was late for a job it doesn't even have.";

// Gate from the competition kit: 1-200 characters, exactly one
// line, not only whitespace. Anything outside that scores 0.
function checkEntry(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("entry line must not be empty or only whitespace");
  }
  if (line.length > 200) {
    throw new Error(`entry line must be at most 200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be exactly one line");
  }
  // Brief check: the line must actually roast the required subject —
  // an alarm clock, at 6 AM, on a Saturday. A line about anything
  // else loses to any on-brief roast, so fail loudly instead.
  const lower = line.toLowerCase();
  for (const required of ["alarm clock", "6 am", "saturday"]) {
    if (!lower.includes(required)) {
      throw new Error(`entry line must mention "${required}"`);
    }
  }
}

// The grader reads /output/entry.txt; MAKEFUN_OUTPUT_DIR
// overrides the directory for local runs.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

checkEntry(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_LINE, "utf8");
console.log(`Wrote ${outputPath} (${ENTRY_LINE.length} characters)`);
