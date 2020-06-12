let { watch } = require('gulp')
import DocBuilder from "./src/doc-builder";

function buildYaml (cb) {
  let builder = new DocBuilder({
    dir: `${__dirname}/yaml`,
    entry: `index.yaml`,
    output: `${__dirname}/docs/.vuepress/public/schema.json`,
    snippetsDir: `${__dirname}/snippets`,
  })
  builder.build()
  cb();
}

exports.default = function() {
  watch('yaml/**/*.yaml', buildYaml)
  watch('snippets/**/*.json', buildYaml)
}

exports.build = buildYaml
