<template>
    <div class="app">
      <ul>
        <li>
          <exp-events></exp-events>
        </li>
      </ul> 
    </div>
</template>
<script>
  import events from './events.vue'
  const __ = chrome.i18n.getMessage
  export default {
    data: () => ({
      currentPage: 0
    }),
    computed: { },
    created () {
      console.log(__('devtools'))
    },
    components: {
      'exp-events': events
    },
    mounted () { },
    methods: { }
  }
</script>
<style lang="scss" scoped>
  div.app {
    height: 100%;
    width: 100%;
  }
  ul {
    list-style-type: none;
    height: 100%;
    padding: 0;
  }
</style>
<style>
body {
  overflow:hidden;
}
</style>

