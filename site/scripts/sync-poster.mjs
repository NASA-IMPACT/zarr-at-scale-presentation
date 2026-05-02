import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../../poster/index.html')
const dstDir = resolve(__dirname, '../public/poster')
const dst = resolve(dstDir, 'index.html')

if (!existsSync(src)) {
  console.warn(`[sync-poster] source ${src} does not exist, skipping`)
  process.exit(0)
}

if (existsSync(dstDir)) rmSync(dstDir, { recursive: true })
mkdirSync(dstDir, { recursive: true })
cpSync(src, dst)
console.log(`[sync-poster] ${src} -> ${dst}`)
