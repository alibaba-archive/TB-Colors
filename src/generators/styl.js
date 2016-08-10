write      = require('write')
capitalize = require('capitalize')

colors     = require('../colors')
utils      = require('../utils')

module.exports = function () {
  var data = "// Teambition Color Palette\n"

  for (type in colors) {
    data += "\n// "+ capitalize(type) + "\n"
    for (name in colors[type]) {
      var hex = utils.getHex(colors[type][name])
      data += "$" + name + " = " + hex + "\n"
    }
  }
  write('dist/colors.styl', data)
}
