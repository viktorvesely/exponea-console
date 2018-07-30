import msgHandler from './msgHandler'

var tabId = -1
var port = null

function openPort () {
  port = chrome.runtime.connect({
    name: 'devtools' + ':' + tabId
  })
  port.onMessage.addListener((msg) => {
    msgHandler[msg.type](msg)
  })
  port.postMessage({
    source: 'devtools',
    type: 'init'
  })
}

chrome.devtools.panels.create('Exp', 'img/logo.png', 'pages/panel.html', function (panel) {
  const __ = chrome.i18n.getMessage
  console.log(__('devtools'))
  tabId = chrome.devtools.inspectedWindow.tabId
  openPort()
})
