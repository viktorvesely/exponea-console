<template>
  <label class="switch">
    <input type="checkbox">
    <span @click='turn' class="slider round"></span>
  </label>
</template>
<script>
export default {
  data: () => ({
    switched: false
  }),
  computed: { },
  methods: {
    turn () {
      this.switched = !this.switched
      this.$emit('onSwitch', this.switched)
    }
  }
}
</script>
<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 28px;
  height: 14px;
  user-select: none;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .2s;
  transition: .2s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 1px;
  bottom: 1.5px;
  background-color: white;
  -webkit-transition: .2s;
  transition: .2s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>

