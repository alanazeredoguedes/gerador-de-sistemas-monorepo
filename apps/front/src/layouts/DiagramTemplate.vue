<template>
  <div>




    <RouterView />


  </div>
</template>

<style>
@import url("@/assets/themes/10/css/style.bundle.css");

.header-bg2{
  background-image: url('../assets/themes/10/media/header-bg.png');
  height: 8vh;
}

/*@import url("../assets/plugins/global/plugins.bundle.css");*/

</style>

<script>
import { RouterLink, RouterView } from 'vue-router';



export default {

  components: {
  },
  mounted() {
    $('body').removeClass('page-bg');
    $('body').css('background-image', 'none');
  },

}

</script>


