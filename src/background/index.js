import itemTemplate from '../devtools/timeLineItem.js'
import arrayBufferTo from './arrayBufferTo.js'

const __ = chrome.i18n.getMessage
console.log(__('background'))

chrome.webRequest.onBeforeRequest.addListener((details) => {
  if (details.method === 'POST') {
    console.log(arrayBufferTo.toJSON(details.requestBody.raw[0].bytes))
  }
}, {urls: ['<all_urls>']}, ['requestBody'])

var ports = { }

chrome.runtime.onSuspend.addListener(() => {
  chrome.browserAction.setBadgeBackgroundColor({
    color: '#990000'
  })
})

chrome.runtime.onConnect.addListener((port) => {
  let ids = port.name.split(':')
  var name = ids[0]
  var tabId = ids[1]
  port.onMessage.addListener((msg) => {
    ports[tabId][name] = port
  })
  port.onDisconnect.addListener(() => {
    delete ports[tabId][name]
  })
  port.postMessage({
    type: 'addItems',
    items: [itemTemplate('back-test'), itemTemplate('back-test2')]
  })
})

function trackItem (tabId, item) {
  ports[tabId]['devtools'].postMessage({
    type: 'addItems',
    items: [item]
  })
}
window.addItem = function () {
  trackItem(itemTemplate('back-test', 'exp-event', {'seconds': 22, 'brutal': 323.22323232323, 'name': 'daadad', 'tester': true, 'canihandleit': { 'dad': 5, 'string': 'hopi', 'stdaring': 'hopi', 'staaring': 'hopi', 'saatring': 'hopi', 'sntring': 'hopi' }}, '/lol.jpg', 'exponea.com', {}, Date.now()))
}
