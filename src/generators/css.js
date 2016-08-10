write      = require('write')
capitalize = require('capitalize')
camel2Dash = require('camel-2-dash')

colors     = require('../colors')
utils      = require('../utils')

module.exports = function () {
  var data = "// Teambition Color Palette\n"

  data += "\n/* ==== Colors ==== */\n"
  for (type in colors) {
    data += "\n/* "+ capitalize(type) + " */\n"
    for (name in colors[type]) {
      var hex = utils.getHex(colors[type][name])
      var dashName = camel2Dash(name)
      data += "." + dashName + " {\n"
      data += "  color: " + hex + ";\n"
      data += "}\n"
    }
  }

  data += "\n/* ==== Background Colors ==== */\n"
  for (type in colors) {
    data += "\n/* "+ capitalize(type) + " */\n"
    for (name in colors[type]) {
      var hex = utils.getHex(colors[type][name])
      var dashName = camel2Dash(name)
      data += ".bg-" + dashName + " {\n"
      data += "  background-color: " + hex + ";\n"
      data += "}\n"    }
  }

  write('dist/colors.css', data)
}
