
export default {
  addItems: function (msg, rootVue) {
    rootVue.$refs.expEvents.addItems(msg.items)
  }
}
