<template>
    <div class="eventPage"> 
      <input type='text' v-model='name'>
      <br> 
      <button @click='addEvent'>Add Event</button>
      <hr>
      <exp-event :key='index' v-for='(e,index) in events' :event='e' :size='events.length'></exp-event>
    </div>
</template>
<script>
  import event from './event.vue'
  export default {
    data: () => ({
      events: [],
      name: '',
      properties: [],
      prop_model: { 'seconds': 22, 'brutal': 323.22323232323, 'name': 'daadad', 'tester': true, 'canihandleit': { 'dad': 5, 'string': 'hopi', 'adawd': 2123, '231231': 333, '231da231': 333 } }
    }),
    computed: { },
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