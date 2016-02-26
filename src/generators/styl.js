colors     = require('../colors')
write      = require('write')
capitalize = require('capitalize')

module.exports = function () {
  var data = "// Teambition Color Palette\n"

  for (type in colors) {
    data += "\n// "+ capitalize(type) + "\n"
    for (name in colors[type]) {
      var hex = colors[type][name]
      data += "$" + name + " = " + hex + "\n"
    }
  }
  write('dist/colors.styl', data)
}
