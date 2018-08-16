
export default {
  init: function (context, rootVue) {
    this.__context = context
    this.__rootVue = rootVue
  },
  addItems: function (msg) {
    if (this.__expEvents !== -1) {
      this.__expEvents.addItems(msg.items)
    } else {
      this.__expEvents = this.__context.findRefVue('expEvents', this.__rootVue)
      if (this.__expEvents === -1) {
        console.warn('MessageHandler: The ref expEvents was not found in Vue hierarchy')
      } else {
        this.__expEvents.addItems(msg.items)
      }
    }
  },
  __rootVue: null,
  __expEvents: -1,
  __context: null
}
