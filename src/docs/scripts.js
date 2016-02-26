var createNotification = function(text) {
  var content = "Copied: " + text
  var notification = new Notification(content)
  setTimeout(function() {
    notification.close()
  }, 1000)
}

var clipboard = new Clipboard('.color')
clipboard.on('success', function(e) {
    var hex = e.text
    if (Notification.persmission === 'granted') {
      createNotification(hex)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          createNotification(hex)
        }
      })
    }
})
