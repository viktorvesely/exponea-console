import Vue from 'vue'
import root from './root.vue'
import date from 'date-and-time'
import 'vue-awesome/icons/search'
import Icon from 'vue-awesome/components/Icon'
import MsgHandler from './msgHandler.js'

Vue.component('icon', Icon)
Vue.config.productionTip = false
window.dateFormater = date // used in events.vue
window.port = null // used for background communication

window.onVueRendered = function () {
  MsgHandler.init(window, window.rootVue)
  openPort(window.port)
}

// used in Vue rendering
Vue.prototype.__ = chrome.i18n.getMessage

/* eslint-disable no-new */
window.rootVue = new Vue({
  el: '#root',
  render: h => h(root)
})

window.findRefVue = function (name, vue) {
  if (vue.$refs.hasOwnProperty(name)) {
    return vue.$refs[name]
  }
  for (let i = 0; i < vue.$children.length; ++i) {
    let retVal = this.findRefVue(name, vue.$children[i])
    if (retVal !== -1) {
      return retVal
    }
  }
  return -1
}

// set up comunication
function openPort () {
  window.port = chrome.runtime.connect({
    name: 'devtools' + ':' + chrome.devtools.inspectedWindow.tabId
  })
  window.port.onMessage.addListener((msg) => {
    MsgHandler[msg.type](msg, window.rootVue)
  })
  window.port.postMessage({
    source: 'devtools',
    type: 'init'
  })
}
