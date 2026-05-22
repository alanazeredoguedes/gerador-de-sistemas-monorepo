<template>
  <div>

    <div class="d-flex flex-column flex-root">
      <div class="page launcher sidebar-enabled d-flex flex-row flex-column-fluid me-lg-5" id="kt_page">


        <div class="d-flex flex-column flex-root">

<!--          <LogoTitle/>-->

          <router-view></router-view>

          <Footer/>
        </div>

        <MenuDireita/>


      </div>
    </div>

<!--    <ModaisGeral/>-->

<!--    <ModalCriarDiagrama/>-->

  </div>
</template>

<style>

@import url("@/assets/themes/10/css/style.bundle.css");
@import url("@/assets/themes/10/plugins/global/plugins.bundle.css");


</style>

<script>

import { RouterLink, RouterView } from 'vue-router';
import MenuDireita from "../components/dashboard/MenuDireita.vue";
import Footer from "../components/dashboard/Footer.vue";
import LogoTitle from "../components/dashboard/LogoTitle.vue";
import ModaisGeral from "../components/dashboard/ModaisGeral.vue";
import ModalCriarDiagrama from "../components/dashboard/modal/ModalCriarDiagrama.vue";



export default {

  components: {
    ModalCriarDiagrama,
    ModaisGeral,
    LogoTitle,
    Footer,
    MenuDireita

  },
  mounted() {
    $('body').addClass('page-bg');
    document.body.style.backgroundImage = 'url("/img/page-bg.jpg")';
  }

}

</script>


