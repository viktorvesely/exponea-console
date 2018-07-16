<template>
    <div class="eventPage"> 
      <input type='text' v-model='name' placeholder='Name'> 
      <input type="text" v-model='filters.byName' placeholder='Filter'>
      <input type="checkbox" v-model='filters.showSessions'> <span> Show session ping</span>
      <br> 
      <button @click='addEvent'>Add Event</button>
      <hr>
      <div class='events'>
        <exp-event :key='index' v-for='(e,index) in events' :event='e' :size='events.length' v-if='!((filters.showSessions === false && sessionEventsNames.includes(e.name)) || (!!filters.byName && e.name.indexOf(filters.byName) === -1))'></exp-event>
      </div>
    </div>
</template>
<script>
  import event from './event.vue'
  export default {
    data: () => ({
      events: [],
      name: '',
      properties: [],
      prop_model: { 'seconds': 22, 'brutal': 323.22323232323, 'name': 'daadad', 'tester': true, 'canihandleit': { 'dad': 5, 'string': 'hopi' } },
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
    created () { },
    components: {
      'exp-event': event
    },
    mounted () { },
    methods: {
      addEvent () {
        this.events.splice(0, 0, {
          name: this.name,
          properties: this.prop_model
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  input {
    display: inline-block;
  }
  .eventPage {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
  }

  
</style>