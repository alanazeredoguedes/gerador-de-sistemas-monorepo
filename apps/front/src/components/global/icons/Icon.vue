<template>
  <div class="IconComponent">
      <i :class="name" :style="{'color': color, 'font-size': size}"></i>
  </div>
</template>

<script>

import $ from "jquery";

export default {
  name: 'Icon',
  props: [ 'name', 'size', 'color' ],
  data(){
    return {

    }
  },

  methods: {

  }
}
</script>

<style scoped>

</style>