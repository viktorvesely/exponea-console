const __ = chrome.i18n.getMessage
console.log(__('content'))
window.port = null
window.addEventListener('message', (event) => {
  if (event.source !== window) {
    return
  }
  window.port.postMessage({
    source: 'content',
    type: 'error',
    error: {
      message: event.data.response.message,
      timestamp: event.data.timestamp
    }
  })
})

function openPort (tabId) {
  window.port = chrome.runtime.connect({
    name: 'content' + ':' + tabId
  })
  window.port.onMessage.addListener((msg) => {
  })
  window.port.postMessage({
    source: 'content',
    type: 'init'
  })
}

function executeOnPageWindow () {
  var XHR = XMLHttpRequest.prototype
  var open = XHR.open
  var send = XHR.send
  var setRequestHeader = XHR.setRequestHeader

  XHR.open = function (method, url) {
    let retVal = open.apply(this, arguments)
    this._method = method
    this._url = url
    this._requestHeaders = {}
    this._startTime = (new Date()).toISOString()
    this._expStartTime = Date.now()
    this._needsToProccess = this._url.indexOf('exponea') !== -1
    return retVal
  }

  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value
    return setRequestHeader.apply(this, arguments)
  }

  XHR.send = function (postData) {
    let retVal = send.apply(this, arguments)
    if (this._needsToProccess) {
      this.addEventListener('load', function () {
        var myUrl = this._url ? this._url.toLowerCase() : this._url
        if (myUrl) {
          if (this.responseType !== 'blob' && this.responseText) {
            var arr = JSON.parse(this.responseText)
            if (!arr.success) {
              window.postMessage({ response: arr, timestamp: this._expStartTime }, '*')
            }
          }
        }
      })
    }
    return retVal
  }
}

chrome.runtime.sendMessage({type: 'id'}, (tabId) => {
  openPort(tabId)
})

var script = document.createElement('script')
script.textContent = executeOnPageWindow.toString() + '; executeOnPageWindow()'
document.addEventListener('DOMContentLoaded', () => {
  document.head.appendChild(script)
}, false)
