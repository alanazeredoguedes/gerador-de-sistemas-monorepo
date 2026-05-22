<template>

    <a tabindex="0" class="showinfo" data-toggle="popover" :title="title" :data-content="content" style="color: rgb(51, 86, 119); margin-right: 5px;">
      <i :class="ico ? ico : 'fa-solid fa-circle-question'"></i>
    </a>

</template>

<script>


import $ from "jquery";

$(function () {
  $('.showinfo').popover({
    container: 'body',
    trigger: 'hover'
  })
})

export default {

  name: 'InfoInput',

  components: {  },

  props: ['title', 'content', 'ico' ],

  data(){
    return {

    }
  },
  methods: {

  },
  computed: {

  },

}
</script>

<style>



</style>