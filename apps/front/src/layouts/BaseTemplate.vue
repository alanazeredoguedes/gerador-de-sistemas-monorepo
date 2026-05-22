<template>
  <div>
    <RouterView />



  </div>
</template>


<style>

/*@import url("../assets2/plugins/global/plugins.bundle.css");*/
/*@import url("../assets2/css/style.bundle.css");*/

</style>


<script>
import { RouterLink, RouterView } from 'vue-router'
import "https://kit.fontawesome.com/e44281f0a2.js";

export default {

  components: {  },
  mounted() {
    let body = $('body')
    body.removeClass('page-bg');
    body.css('background-image', 'none');
  },

}
</script>

