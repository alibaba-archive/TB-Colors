module.exports = function (value) {
  if (typeof value === 'string') return value
  return value.hex
}
