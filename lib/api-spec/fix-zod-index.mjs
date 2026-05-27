/**
 * Post-codegen patch: orval generates an index.ts that re-exports from both
 * ./generated/api (Zod schemas) and ./generated/types (TS interfaces).
 * This causes TS2308 because several schemas have identical names in both.
 * Solution: only export from ./generated/api — Zod schemas are the source of
 * truth; TS types can be derived via z.infer<> where needed.
 */
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, "..", "api-zod", "src", "index.ts");

const content = `export * from "./generated/api";\n`;

writeFileSync(indexPath, content, "utf-8");
console.log("✓ Patched api-zod/src/index.ts — Zod schemas only (no types/ re-export)");
