import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const sourceUrl =
  process.argv[2] ?? 'http://127.0.0.1:4523/export/openapi/3?version=3.0'
const outputPath = path.resolve(process.cwd(), 'docs', 'public', 'openapi.yaml')

const response = await fetch(sourceUrl)

if (!response.ok) {
  throw new Error(`Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`)
}

const content = await response.text()

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, content, 'utf8')

console.log(`Saved OpenAPI spec to ${outputPath}`)
