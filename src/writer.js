const fs = require('fs');

export default new class {
  write (data, path) {
    let content = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, content)
  }
}
