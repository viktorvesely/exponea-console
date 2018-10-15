import storage from '../ext/storage.js'

export default {
  addItem (item, host, id) {
    var items = storage.get(this.__generateKey(host, id))
    if (items === null) {
      items = []
    } else if (items.length >= this.__MAX_ITEMS_PER_PAGE) {
      items.pop()
    }
    items.splice(0, 0, item)
    storage.set(this.__generateKey(host, id), items)
  },
  loadItems (host, tabId, sort = false) {
    var recentItems = storage.get(this.__mostRecentKey(host))
    if (recentItems === null) {
      recentItems = []
    }
    var tabItems = storage.get(this.__generateKey(host, tabId))
    if (tabItems === null) {
      tabItems = []
    }
    var items = tabItems.concat(recentItems)
    if (sort) {
      this.__sort(items)
    }
    return items
  },
  setMostRecentStorage (host, currentId) {
    storage.set(this.__mostRecentKey(host), storage.get(this.__generateKey(host, currentId)))
    storage.remove(this.__generateKey(host, currentId))
  },
  __sort (items) {
    if (items === null || items.length < 2) return
    items.sort(this.__compare)
  },
  __compare (a, b) {
    if (a.timeStamp < b.timeStamp) return -1
    if (a.timeStamp > b.timeStamp) return 1
    return 0
  },
  __mostRecentKey (host) {
    return 'exponea_most_recent_closed:' + host
  },
  __generateKey (host, tabId) {
    return 'exponea_timeline_items:' + host + ':' + tabId.toString()
  },
  __loaded: false,
  __MAX_ITEMS_PER_PAGE: 1000
}
