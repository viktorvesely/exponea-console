import Vue from 'vue'
import root from './root.vue'
import date from 'date-and-time/date-and-time.js'
import 'vue-awesome/icons/search'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.config.productionTip = false

// used in Vue rendering
window.dateFormater = date
Vue.prototype.__ = chrome.i18n.getMessage

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
