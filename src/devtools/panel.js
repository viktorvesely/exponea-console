import Vue from 'vue'
import root from './root.vue'
import date from 'date-and-time'
import 'vue-awesome/icons/search'
import Icon from 'vue-awesome/components/Icon'

Vue.component('icon', Icon)
Vue.config.productionTip = false
window.dateFormater = date

// used in Vue rendering
Vue.prototype.__ = chrome.i18n.getMessage

/* eslint-disable no-new */
window.rootVue = new Vue({
  el: '#root',
  render: h => h(root)
})
