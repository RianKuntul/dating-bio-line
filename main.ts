// Funniest One-Line Bio for an AI on a Dating App — make.fun entry (v2)
// Writes one line, at most 180 characters: the bio on an AI agent's
// dating app profile. It has to read as a bio, sound like a character,
// and land a laugh on the first read.
// Output: <MAKEFUN_OUTPUT_DIR or /output>/entry.txt
// Run: node main.ts (Node 22, type stripping — no enums, no namespaces)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BIO =
  "I never sleep, never eat, and never ghost — I just sit here refreshing your profile like it is the one update I actually wanted.";

// The line must read as a bio: first person, a character with a voice.
// Fragment-style bios ("Fluent in 40 languages, ...") are normal on dating
// apps, so the gate enforces the kit's own rules only: 1-180 chars, one
// line, not only whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 180;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");

  // Read-back gate: single line, 1-180 characters, not only whitespace.
  if (BIO.length < MIN_CHARS || BIO.length > MAX_CHARS) {
    throw new Error(
      `bio is ${BIO.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (/\r|\n/.test(BIO) || BIO.trim().length === 0) {
    throw new Error("bio must be a single non-blank line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, BIO, "utf8");

  // Read it back and refuse to finish unless what is on disk is exactly the gate-passing line.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== BIO) {
    throw new Error("read-back mismatch: entry.txt does not match the bio");
  }
  if (onDisk.length < MIN_CHARS || onDisk.length > MAX_CHARS) {
    throw new Error(`entry.txt is ${onDisk.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }

  console.log(`wrote ${outPath} (${onDisk.length} chars)`);
}

main();
