const { join } = require('path')
const { readdir, stat } = require('fs')
const { promisify } = require('util')

const readdirP = promisify(readdir)
const statP = promisify(stat)

async function rreaddir(dir, allFiles = []) {
    const files = (await readdirP(dir)).map(f => join(dir, f))
    allFiles.push(...files)
    await Promise.all(
        files.map(
            async f => (await statP(f)).isDirectory() && rreaddir(f, allFiles)
        )
    )
    return allFiles
}

export default rreaddir

module.exports = rreaddir
