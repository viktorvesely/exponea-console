<template>
    <div class='property'>
        <span class='name' >{{ name }}</span>
        <span class='value'> {{ displayValue }} </span>
    </div>
</template>
<script>
export default {
  props: ['name', 'value'],
  data: function () {
    return { }
  },
  methods: {
    toExponeaString (value) {
      var retVal = ''
      switch (typeof value) {
        case 'string':
          retVal = value
          break
        case 'number':
          var num = 0
          if (Math.floor(value.valueOf()) === value.valueOf()) {
            retVal = value.toString()
            break
          } else num = value.toString().split('.')[1].length || 0
          if (num > 5) retVal = value.toFixed(5).toString()
          else retVal = value.toString()
          break
        case 'boolean':
          retVal = value.toString()
          break
        case 'symbol':
          retVal = 'symbol - invalid'
          break
        case 'undefined':
          retVal = ' '
          break
        case 'object':
          if (value.constructor.name === 'Object') {
            retVal = '{ '
            var first = true
            for (var key in value) {
              if (!first) retVal += ', '
              else first = false
              retVal += key + ' : ' + this.toExponeaString(value[key])
            }
            retVal += ' }'
          } else {
            retVal = '['
            for (var i = 0; i < value.length; ++i) {
              retVal += this.toExponeaString(value[i])
              if (i !== value.length - 1) retVal += ', '
            }
            retVal += ']'
          }
          break
        case 'function':
          retVal = 'function - invalid'
          break
      }
      return retVal
    }
  },
  computed: {
    displayValue () {
      return this.toExponeaString(this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.property {
  max-height: 200px;
  overflow: hidden;
  margin-top: 8px;
  margin-bottom: 8px;
}
.name {
  display: inline-block;
  width: 35%;
  min-width: 150px;
  text-align: left;
  margin-left: 15px;
}
.value {
  display: inline-table;
  color: #7477b0;
  white-space: pre-line;
  width: 62%;
}
</style>
