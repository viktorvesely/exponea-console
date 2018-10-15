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
}

chrome.runtime.sendMessage({type: 'id'}, (tabId) => {
  openPort(tabId)
})

var script = document.createElement('script')
script.textContent = executeOnPageWindow.toString() + '; executeOnPageWindow()'
document.addEventListener('DOMContentLoaded', () => {
  document.head.appendChild(script)
}, false)
