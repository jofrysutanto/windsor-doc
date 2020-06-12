const fs = require('fs')
const path = require('path')
import rreaddir from "./rreaddir"

export default new class {

  constructor () {
    this.snippets = {}
  }

  /**
   * Loads available snippets
   *
   * @param {String} snippetsDir
   *
   * @returns self
   */
  async loadSnippets (snippetsDir) {
    let snippetFiles = await rreaddir(snippetsDir)
    this.snippets = {}
    snippetFiles.forEach(filepath => {
      if (!path.extname(filepath)) {
        return
      }
      let name = filepath
        .replace(snippetsDir, '')
        .replace(path.extname(filepath), '')
      if (name.startsWith('/')) {
        name = name.slice(1)
      }
      let result = JSON.parse(fs.readFileSync(filepath))
      this.snippets[name] = result
    })
    return this
  }

  /**
   * Retrieve snippet by key
   *
   * @param {String} key
   */
  get (key) {
    let keyNormalised = this.normaliseKey(key)
    if (typeof this.snippets[keyNormalised] === 'undefined') {
      return key
    }
    try {
      return this.formatSnippet(this.snippets[keyNormalised])
    } catch (error) {
      console.error(`Unable to parse given snippet: ${key}`)
    }
  }

  /**
   * Format given snippet into VSCode stringified JSON snippet
   * @param {String} snippet
   */
  formatSnippet (snippet) {
    return {
      ...snippet,
      body: snippet.body.join('\n')
    }
  }

  /**
   * Normalise given snippet key
   * @param {String} key
   */
  normaliseKey (key) {
    return key.replace('@snippets/', '')
  }

}
