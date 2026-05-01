import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../../figures')
const dst = resolve(__dirname, '../public/figures')

if (!existsSync(src)) {
  console.warn(`[sync-figures] source ${src} does not exist, skipping`)
  process.exit(0)
}

if (existsSync(dst)) rmSync(dst, { recursive: true })
mkdirSync(dst, { recursive: true })
cpSync(src, dst, { recursive: true })
console.log(`[sync-figures] ${src} -> ${dst}`)
