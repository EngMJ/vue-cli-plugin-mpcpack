const path = require('path')

// alias.config.js
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
