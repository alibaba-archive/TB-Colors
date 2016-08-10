write      = require('write')
camel2Dash = require('camel-2-dash')

colors     = require('../colors')
utils      = require('../utils')

module.exports = function () {
  var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources xmlns:tools=\"http://schemas.android.com/tools\">\n"
  for (type in colors) {
    for (name in colors[type]) {
      var hex = utils.getHex(colors[type][name])
      data += "  <color name=\"" + (camel2Dash(name)) + "\" tools:ignore=\"UnusedResources\">" + hex + "</color>\n"
    }
  }
  data += "</resources>"
  write('dist/colors.xml', data)
}
