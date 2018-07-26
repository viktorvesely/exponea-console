<template>
    <div class="eventPage"> 
      <input type='text' v-model='name' placeholder='Name'> 
      <input type='checkbox' v-model='isUpdate'>
      <span> is update </span>
      <br>
      <button @click='addEvent'>Add Event</button>
      <button @click='addDivider'>Add Divider</button>
      <hr>
      <div class='eventGui top'>
        <input type="text" class='filter' v-model='filters.byName' placeholder='Event filter..'>
        <icon name='search' class='searchIcon' scale='0.9'></icon>
      </div>
      <div class='events'>
        <component :is='e.type' :key='index' v-for='(e,index) in events' :data='e' :size='events.length' v-if='!((filters.showSessions === false && sessionEventsNames.includes(e.name)) || (!!filters.byName && (e.name.indexOf(filters.byName) === -1 || e.type === "exp-update")))'></component>
      </div>
      <div class='eventGui bottom'>
          <exp-toggle @onSwitch='updateSessionFilter'></exp-toggle>
          <span> Show session events</span>
      </div>
    </div>
</template>
<script>
  import event from './event.vue'
  import update from './update.vue'
  import divider from './divider.vue'
  import toggle from './switch.vue'
  import Item from './timeLineItem.js'
  export default {
    data: () => ({
      events: [],
      name: '',
      type: '',
      isUpdate: false,
      properties: [],
      prop_model: { 'seconds': 22, 'brutal': 323.22323232323, 'name': 'daadad', 'tester': true, 'canihandleit': { 'dad': 5, 'string': 'hopi', 'stdaring': 'hopi', 'staaring': 'hopi', 'saatring': 'hopi', 'sntring': 'hopi' } },
      filters: {
        byName: '',
        showSessions: false
      },
      sessionEventsNames: ['session_ping']
    }),
    computed: {
      shouldShow (name) {
        return !((this.filters.showSessions === false && this.sessionEventsNames.includes(name)) || (!this.filters.byName && name.indexOf(this.filters.byName) !== -1))
      }
    },
    created () {
      window.timelineStorage.loadItems((items) => {
        if (items === null) return
        this.events.concat(items)
      })
    },
    components: {
      'exp-event': event,
      'exp-update': update,
      'exp-divider': divider,
      'exp-toggle': toggle
    },
    mounted () { },
    methods: {
      addEvent () {
        this.events.splice(0, 0, Item(this.name, this.isUpdate ? 'exp-update' : 'exp-event', this.prop_model, '/lol/1233213.jpg', window.devTab.URL.Host(), {}, Date.now()))
        this.saveItem(this.events[0])
      },
      addDivider () {
        this.events.splice(0, 0, Item(this.name, 'exp-divider', this.prop_model, '/lol/1233213.jpg', window.devTab.URL.Host(), {}, Date.now()))
        this.saveItem(this.events[0])
      },
      updateSessionFilter (value) {
        this.filters.showSessions = value
      },
      saveItem (item) {
        window.timelineStorage.addItem(item)
      }
    }
  }
</script>
<style lang="scss" scoped>
  $eventsWidth: 90%;
  $marginCenter: 5%;
  $eventGuiHeight: 45px;

  input {
    display: inline-block;
  }
  .eventGui {
    width: $eventsWidth;
    margin-left: $marginCenter;
    height: $eventGuiHeight;
    background-color: white;
  }
  .eventGui.top {
    margin-top: 15px;
  }
  .eventGui.top .filter {
    height: 24px;
    width: 110px;
    border-color: transparent;
    font-size: 17px;
    padding-left: 8px;
    position: relative;
    top: 50%;
    margin-top: -15px;
    outline: none;
    background-color: transparent;
  }
  .eventGui.top .searchIcon {
    position: relative;
    right: 1px;
    top: 25px;
  }
  .eventGui.top input:active {
    border: none;
  }
  .eventPage {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    background-color: #EBEEF7;
  }
  .events {
    width: $eventsWidth;
    margin-left: $marginCenter;
    overflow-y: auto;
    height: 80%;
    background-color: white;
    padding-top: 3px;
  }
  .events::-webkit-scrollbar {
    width: 0px; 
    background-color: rgba(0,0,0,0);
  }
  .eventGui.bottom {
    font-size: 15px;
    height: 28px;
    font-family: Lato,sans-serif;
    font-weight: 700;
    vertical-align: middle;
  }
  .eventGui.bottom * {
    position: relative;
    top: 4px;
  }
  .eventGui.bottom >>> .switch {
    margin-left: 10px;
    position: relative;
    top: 6px;
  }
</style>