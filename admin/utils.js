module.exports.mapKeys = function mapKeys(obj) {
  return function(key) {
    let value = obj[key]
    if (typeof value === 'object') {
      value.clientId = key
    }
    return value
  }
}
