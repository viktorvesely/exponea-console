import Vue from 'vue'
import root from './root.vue'
import date from 'date-and-time/date-and-time.js'
import 'vue-awesome/icons/search'
import Icon from 'vue-awesome/components/Icon'
import timelineStorage from './timelineStorage'

Vue.component('icon', Icon)
Vue.config.productionTip = false

function Init () {
  window.timelineStorage = timelineStorage
  window.devTab = null
  chrome.tabs.query({active: true}, (tabs) => {
    window.devTab = tabs[0]
    window.devTab.URL = new URL(tabs[0].url)
    window.devTab.URL.Host = function () {
      return this.hostname.replace('www.', '')
    }
    timelineStorage.onTabInfoLoad(window.devTab)
  })
  window.dateFormater = date

  window.onunload = function () {
    window.timelineStorage.setMostRecentStorage()
  }
}
Init()
// used in Vue rendering
Vue.prototype.__ = chrome.i18n.getMessage

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
