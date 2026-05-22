<template>

    <div class="d-flex flex-column flex-root" >
      <div class="d-flex flex-column flex-column-fluid flex-lg-row">

        <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10" style="margin-top: 10%">
          <div class="d-flex flex-column">
              <RouterLink :to="{ name: 'homePage', params: {} }" class="mb-7">
                <img alt="Logo" src="../assets/media/auth/agency.png" width="150" />
                <h1 style="color: white; font-size: 35px;">Gerador de Sistemas</h1>
              </RouterLink>
            <h2 class="text-white fw-normal m-0">A ferramenta do Profissional de Tecnologia!</h2>
          </div>
        </div>

        <div class="d-flex flex-center w-lg-50 p-10" style="margin-top: 10%">
          <div class="card rounded-3 w-md-550px">
            <div class="card-body p-10 p-lg-20">

              <RouterView />

            </div>
          </div>
        </div>

      </div>
    </div>

</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700");
@import url("@/assets/plugins/global/plugins.bundle.css");
@import url("@/assets/css/style.bundle.css");

/*body {
  background-image: url('@/assets/media/auth/bg4.jpg');
}
[data-theme="dark"] body {
  background-image: url('@/assets/media/auth/bg4-dark.jpg');
}*/
</style>

<script>
import { RouterLink, RouterView } from 'vue-router'

//import "@/assets/plugins/global/plugins.bundle.js";
import "@/assets/js/auth";

export default {

  components: {  },
  mounted() {
    $('body').addClass('page-bg');
    document.body.style.backgroundImage = 'url("/img/auth/bg4.jpg")';
  }

}
</script>


