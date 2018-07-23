<template>
  <div class='divider'>
    <hr class='hLine'>
    <span class='path'>{{ displayPath }}</span>
  </div>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    displayPath () {
      return this.data.host + this.data.path
    }
  }
}
</script>
<style lang="scss" scoped>
$zIndex: 1;

.divider {
  margin: 20px;
}
.hLine {
  z-index: $zIndex;
  opacity: 0.5;
}
.path {
  position: relative;
  float: right;
  bottom: 18px;
  font-size: 15px;
  background-color: white;
  z-index: $zIndex + 1;
  padding: 0 5px 0 5px;
}
</style>

