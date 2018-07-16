<template>
    <div :style='style' class='event'>
        <div @click='expand' class='clickZone'>
          <span class='circle' :style='circleStyle'></span>
          <span class='name'>{{ event.name }}</span>
          <span class='timestamp'>{{ date }}</span>
        </div>
        <div class='properties' v-if='rolledOut'>
           <exp-property v-if='rolledOut' :key='index' v-for='(p,index) in event.properties' :name='index' :value='p' ></exp-property>
        </div>
    </div>
</template>

<script>
import property from './property.vue'
export default {
  props: ['event', 'size'],
  data: function () {
    return {
      colors: ['yellow', 'red', 'blue', 'limegreen', 'black', 'fuchsia', 'orange'],
      date: window.dateFormater.format(new Date(), 'MMM DD,YYYY HH:mm:ss'),
      style: { backgroundColor: ['#FFFFFF', '#F8F7FD'][ this.size % 2 ] },
      rolledOut: false
    }
  },
  components: {
    'exp-property': property
  },
  computed: {
    circleStyle () {
      var sum = 0
      for (var i = 0; i < this.event.name.length; ++i) {
        sum += this.event.name.charCodeAt(i)
      }
      var col = this.colors[sum % this.colors.length]
      var ret = { 'box-shadow': '0 0 0 3px ' + col + ', 0 0 0 3px ' + col }
      return ret
    }
  },
  methods: {
    expand () {
      this.rolledOut = !this.rolledOut
    }
  }
}
</script>
<style lang="scss" scoped>
    .clickZone {
      cursor: pointer;
      padding-right: 15px;
      padding-left: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .clickZone * {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none; 
      -khtml-user-select: none; 
      -ms-user-select: none; 
    }
    .properties {
      padding-right: 15px;
      padding-left: 15px;
      padding-bottom: 10px;
    }
    .event {
        width: 99%;
        font-size: 17px;
    }
    .timestamp {
        color: #7477b0;
        display: inline-block;
    }
    .name {
        font-weight: bold;
        width: 34.6%;
        display: inline-block;
    }
    .circle {
        position: relative;
        bottom: 2px;
        border-radius: 50%;
        width: 5px;
        height: 4px;
        display: inline-block;
        margin-right: 10px;
    }
</style>
