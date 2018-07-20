<template>
    <div class='update eventBody'>
        <div @click='expand' class='clickZone'>
          <span class='circle' :style='circleStyle'></span>
          <span class='name'>update</span>
          <span class='timestamp'>{{ date }}</span>
        </div>
        <div class='properties' v-if='rolledOut'>
           <exp-property v-if='rolledOut' :key='index' v-for='(p,index) in data.value' :name='index' :value='p' ></exp-property>
        </div>
    </div>
</template>
<script>
import property from './property.vue'
export default {
  props: ['data', 'size'],
  data: function () {
    return {
      rolledOut: false
    }
  },
  components: {
    'exp-property': property
  },
  computed: {
    circleStyle () {
      var col = 'Aqua'
      var ret = { 'box-shadow': '0 0 0 3px ' + col + ', 0 0 0 3px ' + col }
      return ret
    },
    date () {
      return window.dateFormater.format(new Date(this.data.timeStamp), 'MMM DD,YYYY HH:mm:ss')
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
@import "./eventBox.scss";

</style>
