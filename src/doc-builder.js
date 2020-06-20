const yaml = require('read-yaml');
import Writer from "./writer";
import snippetsParser from "./snippets-parser";

const mayContainSubYaml = [
  'properties',
  'additionalProperties',
  'defaultSnippets',
  'fields',
  'fields_blueprint',
  'sub_fields',
  'layouts',
]

export default class {

  constructor ({ dir, entry, output, snippetsDir }) {
    this.entry = entry
    this.dir = dir
    this.output = output
    this.snippetsDir = snippetsDir
    this.snippets = snippetsParser
  }

  /**
   * Build documentation
   */
  async build () {
    await this.snippets.loadSnippets(this.snippetsDir)
    let result = this.findReplaceSubYaml(
      yaml.sync(`${this.dir}/${this.entry}`)
    )
    Writer.write(result, this.output)
  }

  /**
   * Parse content string and do string replacement
   * on snippets aliases
   * @param {String} content
   */
  findReplaceSnippets (content) {
    if (content.defaultSnippets) {
      content.defaultSnippets = content.defaultSnippets.map(key => {
        return this.snippets.get(key)
      })
    }
    return content
  }

  /**
   * Parse content string and do sub-YAML replacement
   * @param {String} content
   */
  findReplaceSubYaml (content) {
    content = this.findReplaceSnippets(content)
    for (const key in content) {
      if (!content.hasOwnProperty(key)) {
        continue
      }
      let val = content[key]
      if (typeof val === 'string' && val.startsWith('@yaml')) {
        content[key] = this.findReplaceSubYaml(
          this.readYamlFile(val)
        )
      } else if (mayContainSubYaml.indexOf(key) !== -1) {
        content[key] = this.findReplaceSubYaml(content[key])
      } else if (key === 'allOf') {
        content[key] = content[key].map(row => {
          if (typeof row === 'string' && row.startsWith('@yaml')) {
            return this.findReplaceSubYaml(
              this.readYamlFile(row)
            )
          }
          return row
        })
      } else if (key === 'then' && 'allOf' in content[key]) {
        content[key]['allOf'] = content[key]['allOf'].map(row => {
          if (typeof row === 'string' && row.startsWith('@yaml')) {
            return this.findReplaceSubYaml(
              this.readYamlFile(row)
            )
          }
          return this.findReplaceSubYaml(row)
        })
      } else if (key === 'definitions') {
        content[key] = Object.assign({}, ...content[key].map(row => {
          if (typeof row === 'string' && row.startsWith('@yaml')) {
            return this.findReplaceSubYaml(
              this.readYamlFile(row)
            )
          }
          return row
        }))
      }
    }
    return content
  }

  /**
   * Find YAML file at given path and parse content
   * @param {String} path
   */
  readYamlFile (path) {
    return yaml.sync(this.aliasToPath(path))
  }

  /**
   * Return normalised key to given YAML reference
   * @param {String} key
   */
  aliasToPath (key) {
    if (key.startsWith('@yaml')) {
      return key.replace('@yaml', this.dir) + '.yaml'
    }
    return key
  }
}
