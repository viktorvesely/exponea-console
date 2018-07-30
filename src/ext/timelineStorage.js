import storage from '../ext/storage.js'

export default {
  addItem (item) {
    var items = storage.get(this.__generateKey(item.host, this.__currentTab.id))
    if (items === null) {
      items = []
    } else if (items.length >= this.__MAX_ITEMS_PER_PAGE) {
      items.pop()
    }
    items.splice(0, 0, item)
    storage.set(this.__generateKey(item.host, this.__currentTab.id), items)
  },
  loadItems (callback, sort = false) {
    this.__shouldSort = sort
    this.__onLoaded = callback
    if (this.__loadedItems !== null) {
      if (this.__shouldSort) {
        this.__sort(this.__loadedItems)
      }
      this.__onLoaded(this.__loadedItems)
    }
  },
  deleteItemsByHost (host) {
    storage.remove(this.__generateKey(host))
  },
  onTabInfoLoad (tab) {
    this.__currentTab = tab
    var mostRecent = this.__getMostRecentStorageId(tab.URL.Host())
    var items = null
    if (mostRecent !== null) {
      items = storage.get(this.__mostRecentStorageKey(this.__currentTab.URL.Host(), mostRecent))
    }
    if (this.__shouldSort) {
      this.__sort(items)
    }
    if (this.__onLoaded !== null) {
      this.__onLoaded(items)
    }
    this.__loadedItems = items
  },
  setMostRecentStorage (host) {
    var mostRecent = this.__getMostRecentStorageId(host)
    if (mostRecent !== null && mostRecent.toInteger() === this.__currentTab.id) {
      storage.remove(this.__generateKey(this.__currentTab.URL.Host(), mostRecent))
    }
    storage.set(this.__mostRecentKey(host), this.__currentTab.id.toString())
  },
  __getMostRecentStorageId (host) {
    return storage.get(this.__mostRecentKey(host))
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
  __shouldSort: false,
  __loadedItems: null,
  __currentTab: null,
  __onLoaded: null,
  __loaded: false,
  __MAX_ITEMS_PER_PAGE: 1000
}
