const fs   = require('fs')
const path = require('path')
const { minify } = require('terser')

const SRC_DIR  = path.join(__dirname, '..', 'src', 'js')
const DIST_DIR = path.join(__dirname, '..', 'dist', 'js')

async function buildJs()
{
  if (!fs.existsSync(DIST_DIR))
    fs.mkdirSync(DIST_DIR, { recursive: true })

  const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.js') && !f.endsWith('.min.js'))

  if (files.length === 0)
  {
    console.log('No JS files found in src/js/')
    return
  }

  for (const file of files)
  {
    const inputPath  = path.join(SRC_DIR, file)
    const outputName = file.replace(/\.js$/, '.min.js')
    const outputPath = path.join(DIST_DIR, outputName)

    const code   = fs.readFileSync(inputPath, 'utf8')
    const result = await minify(code, { sourceMap: false, compress: true, mangle: true })

    fs.writeFileSync(outputPath, result.code)
    const inKB  = (fs.statSync(inputPath).size / 1024).toFixed(1)
    const outKB = (Buffer.byteLength(result.code) / 1024).toFixed(1)
    console.log(`  ${file} (${inKB}kb) → dist/js/${outputName} (${outKB}kb)`)
  }

  console.log('\nJS build completado.')
}

buildJs().catch(err =>
{
  console.error('Error en build JS:', err.message)
  process.exit(1)
})
