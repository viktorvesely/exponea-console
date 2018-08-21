import itemTemplate from '../devtools/timeLineItem.js'
import arrayBufferTo from './arrayBufferTo.js'

URL.prototype.Host = function () {
  return this.host.replace('www.', '')
}
const __ = chrome.i18n.getMessage
const DEBUG = true
const reqFilters = ['*://api.exponea.com/*', '*://api.infinario.com/*']
var ports = { }
var lastPath = ''
window.ids = {}
console.log(__('background'))

if (DEBUG === false) {
  console.log = function () {}
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status && changeInfo.status === 'loading') {
    let url = new URL(tab.url)
    if (lastPath !== url.pathname) {
      trackItems(tabId, [itemTemplate('divider', 'divider', {}, url.pathname, url.Host(), {}, Date.now())])
      lastPath = url.pathname
    }
  }
})

chrome.webRequest.onBeforeRequest.addListener((details) => {
  var reqInfo = requestParser(details)
  if (reqInfo.valid) {
    trackItems(details.tabId, reqInfo.items, reqInfo.items[0].host)
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
  if (ports[tabId] === undefined) {
    ports[tabId] = {}
  }
  port.onMessage.addListener((msg) => {
    ports[tabId][name] = port
  })
  port.onDisconnect.addListener(() => {
    delete ports[tabId][name]
  })
})

window.onIdsUpdate = function (ids) {
  window.ids = ids
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
      timeLineItem = itemTemplate(data.type, 'event', data.properties, data.properties.path ? data.properties.path : '', new URL(data.properties.location).Host(), {}, data.timestamp)
      break
    case 'crm/customers':
      timeLineItem = itemTemplate('Update', 'update', data.properties, '', '', {}, Date.now())
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
    parsed_body: null
  }
  if (details.requestBody) {
    let body = arrayBufferTo.toJSON(details.requestBody.raw[0].bytes)
    reqInfo.parsed_body = body
    if (/\/bulk$/.test(details.url)) {
      let firstData = body.commands[0].data
      updateIds(firstData.customer_ids === undefined ? firstData.ids : firstData.customer_ids)
      for (let i = 0; i < body.commands.length; ++i) {
        let command = body.commands[i]
        let item = processBasicCommand(command)
        if (item === -1) {
          console.log('Could not parsed item. Item has unknown name. Name: ' + command.name)
        } else {
          reqInfo.items.push(item)
          reqInfo.valid = true
        }
      }
    } else {
    }
  } else if (details.method === 'POST') {
    console.warn('Last request did not have a body or was malformed:')
    console.warn(details)
  }
  return reqInfo
}

function trackItems (tabId, items, hostname) {
  addToStorage(items, tabId, hostname)
  if (ports[tabId] === undefined || ports[tabId]['devtools'] === undefined) {
    return
  }
  ports[tabId]['devtools'].postMessage({
    type: 'addItems',
    items: items
  })
}

function addToStorage (items, tabId, hostname) {
}
