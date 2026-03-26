#!/usr/bin/env node
// Simple SVG -> PNG converter using sharp (if available) or a fallback prompt.
// Usage: node scripts/svg-to-png.js <input.svg> <output-192.png> <output-512.png>
import fs from 'fs'
import path from 'path'

const [,, input, out192, out512] = process.argv
if (!input || !out192 || !out512) {
  console.error('Usage: node scripts/svg-to-png.js <input.svg> <out-192.png> <out-512.png>')
  process.exit(2)
}

try {
  const sharp = await import('sharp')
  const svg = await fs.promises.readFile(input)
  await sharp.default(svg).resize(192,192,{fit:'contain'}).png().toFile(out192)
  await sharp.default(svg).resize(512,512,{fit:'contain'}).png().toFile(out512)
  console.log('Generated PNGs:', out192, out512)
} catch (err) {
  console.error('sharp not available or conversion failed:', err.message)
  process.exitCode = 1
}
