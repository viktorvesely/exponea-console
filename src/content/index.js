const __ = chrome.i18n.getMessage
console.log(__('content'))

function detectExponea () {
  return typeof window.exponea === 'object' || typeof window.infinario === 'object'
}

if (detectExponea()) {
}

/*
function injectRequestTracking () {
  var XHR = XMLHttpRequest.prototype
  var open = XHR.open
  var send = XHR.send
  var setRequestHeader = XHR.setRequestHeader
  XMLHttpRequest._needsToProccess = false

  XHR.open = function (method, url) {
    this._method = method
    this._url = url
    this._requestHeaders = {}
    this._startTime = (new Date()).toISOString()
    this._needsToProccess = this._url.indexOf('exponea') !== -1
    return open.apply(this, arguments)
  }

  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value
    return setRequestHeader.apply(this, arguments)
  }

  XHR.send = function (postData) {
    if (this._needsToProccess) {
      this.addEventListener('load', function () {
        var myUrl = this._url ? this._url.toLowerCase() : this._url
        if (myUrl) {
          if (postData) {
            if (typeof postData === 'string') {
              try {
                this._requestHeaders = postData
              } catch (err) {
                console.log('Request Header JSON decode failed, transfer_encoding field could be base64')
                console.log(err)
              }
            } else if (typeof postData === 'object' || typeof postData === 'number' || typeof postData === 'boolean') {
              // do something if you need
            }
          }
          var responseHeaders = this.getAllResponseHeaders()

          if (this.responseType !== 'blob' && this.responseText) {
            try {
              var arr = this.responseText

              console.log(this._url)
              console.log(JSON.parse(this._requestHeaders))
              console.log(responseHeaders)
              console.log(JSON.parse(arr))
            } catch (err) {
              console.log('Error in responseType try catch')
              console.log(err)
            }
          }
        }
      })
    }
    return send.apply(this, arguments)
  }
}
*/
