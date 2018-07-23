/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage}
 */
export default {
  get (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) { throw e }
  },
  set (key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) { throw e }
  },
  remove (key) {
    try {
      localStorage.removeItem(key)
    } catch (e) { throw e }
  },
  addItem (tabId)
  __MAX_EVENTS_PER_TAB: 1000
}
