import itemTemplate from '../devtools/timeLineItem.js'
import arrayBufferTo from './arrayBufferTo.js'

const __ = chrome.i18n.getMessage
const reqFilters = ['*://api.exponea.com/*', '*://api.infinario.com/*']
var ports = { }
window.ids = {}
console.log(__('background'))

chrome.webRequest.onBeforeRequest.addListener((details) => {
  var reqInfo = requestParser(details)
  if (reqInfo.valid) {
  }
}, {urls: reqFilters}, ['requestBody'])

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

window.onIdsUpdate = function (ids) {
  window.ids = ids
}

window.addItem = function (name) {
  trackItems(itemTemplate(name))
}

function updateIds (ids) {
  let orLength = Object.keys(window.ids).length
  let newLength = Object.keys(ids).length
  let newIds = false
  if (orLength === newLength) {
    for (let key in window.ids) {
      if (window.ids[key] !== ids[key]) {
        newIds = true
        break
      }
    }
  } else {
    newIds = true
  }
  if (newIds) {
    window.onIdsUpdate(ids)
  }
}

function processBasicCommand (command) {
  let timeLineItem = null
  let data = command.data
  switch (command.name) {
    case 'crm/events':
      timeLineItem = itemTemplate(data.type, 'event', data.properties, data.properties.path ? data.properties.path : '', data.properties.location.match(new RegExp(/www\.(.+)?\//))[1], {}, data.timestamp)
      break
    default:
      timeLineItem = -1
  }
  return timeLineItem
}

function requestParser (details) {
  let reqInfo = {
    valid: false,
    items: [],
    body: null
  }
  if (details && details.method === 'POST' && details.requestBody) {
    let body = arrayBufferTo.toJSON(details.requestBody.raw[0].bytes)
    reqInfo.body = body
    if (/\/bulk$/.test(details.url)) {
      console.log(body.commands)
      updateIds(body.commands[0].data.customer_ids)
      for (let i = 0; i < body.commands.length; ++i) {
        let command = body.commands[i]
        let item = processBasicCommand(command)
        if (item === -1) {
          console.warn('')
        } else {
          console.log(item)
        }
      }
    } else {
    }
  } else {
    console.warn('Last request did not have a body or was malformed')
  }
  return reqInfo
}

function trackItems (tabId, items) {
  ports[tabId]['devtools'].postMessage({
    type: 'addItems',
    items: items
  })
}
