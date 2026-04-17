import { writeFileSync, mkdirSync } from "fs"
import { join } from "path"

const url = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
const outDir = join(process.cwd(), "public")
const outPath = join(outDir, "world-110m.json")

mkdirSync(outDir, { recursive: true })

console.log("[v0] Fetching world-110m.json ...")
const res = await fetch(url)
if (!res.ok) throw new Error(`Failed: ${res.status}`)
const text = await res.text()
writeFileSync(outPath, text, "utf-8")
console.log("[v0] Saved to public/world-110m.json")
