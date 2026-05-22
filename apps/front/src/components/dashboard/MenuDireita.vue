<template>
  <div>
<!--    <div class="scroll h-400px px-5">
    </div>-->
    <div id="kt_sidebar" class="sidebar px-5 py-5 py-lg-8 px-lg-11" data-kt-drawer="true" data-kt-drawer-name="sidebar"
      data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="375px"
      data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_sidebar_toggle">


      <div class="d-flex flex-stack mb-5 mb-lg-8" id="kt_sidebar_header">


        <h5 class="text-white" v-if="user" >{{user.username}}  </h5>

        <div class="ms-1">

          <button class="btn btn-icon btn-sm btn-color-white btn-active-color-primary me-n5" @click="menu"
            data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-overflow="true">
            <span class="svg-icon svg-icon-2" >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
                <rect x="11" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                <rect x="15" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor" />
                <rect x="7" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor" />
              </svg>
            </span>
          </button>



      <div v-bind:class="[menuRapido ? 'show' : '']"
          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px" data-kt-menu="true"
           style="z-index: 105; position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(-29px, 64px);"
      >
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <div class="menu-content fs-6 text-dark fw-bold px-3 py-4">Menu Rápida</div>
        </div>

        <div class="separator mb-3 opacity-75"></div>

        <div class="menu-item px-3">
          <a href="javascript:void(0)" @click="notImplement" class="menu-link px-3">Perfil</a>
        </div>

        <div class="menu-item px-3">
          <a href="javascript:void(0)" @click="deslogar" class="menu-link px-3">Deslogar</a>
        </div>

        <div class="separator mt-3 opacity-75"></div>

        <div class="menu-item px-3">

        </div>
      </div>

        </div>
      </div>


      <div class="mb-5 mb-lg-8 " id="kt_sidebar_body">

        <div class="hover-scroll-overlay-y h-lg-700px h-md-350px h-sm-200px  px-5" id="kt_sidebar_body">



          <div class="timeline">


            <!-- DASHBOARD HOME -->
            <router-link :to="{ name: 'homePage' }">
              <div class="timeline-item">

                  <div class="timeline-line w-40px"></div>

                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label">
                      <span class="svg-icon svg-icon-2 svg-icon-white">
                        <i class="fa-solid fa-house-chimney"></i>
                      </span>
                    </div>
                  </div>

                  <div class="timeline-content mt-n1" style="margin-bottom: 3rem">
                    <div class="pe-3">

                      <div class="fs-5 text-white fw-semibold mb-2">Inicio</div>

                      <div class="d-flex align-items-center mt-1 fs-6" style="display: none">
                        <div class="text-white opacity-50 me-2 fs-7">Ir a página</div>
                        <a href="#" class="text-success fs-7 fw-bold">Inicial</a>
                      </div>

                    </div>
                  </div>

              </div>
            </router-link>






            <!-- DIAGRAMAS LIST -->
            <router-link :to="{ name: 'diagramas_list' }">
            <div class="timeline-item">

                <div class="timeline-line w-40px"></div>

                <div class="timeline-icon symbol symbol-circle symbol-40px">
                  <div class="symbol-label">
                    <span class="svg-icon svg-icon-2 svg-icon-white">
                      <i class="fa-solid fa-diagram-project"></i>
                    </span>
                  </div>
                </div>

                <div class="timeline-content mt-n1" style="margin-bottom: 3rem">
                  <div class="pe-3">

                    <div class="fs-5 text-white fw-semibold mb-2">Diagramas</div>

                    <div class="d-flex align-items-center mt-1 fs-6" style="display: none">
                      <div class="text-white opacity-50 me-2 fs-7">Acesse os seus</div>
                      <a href="#" class="text-success fs-7 fw-bold">Diagramas</a>
                    </div>

                  </div>
                </div>

            </div>
            </router-link>


            <!-- APP LIST -->
            <router-link :to="{ name: 'app_list' }">
              <div class="timeline-item">

                  <div class="timeline-line w-40px"></div>

                  <div class="timeline-icon symbol symbol-circle symbol-40px">
                    <div class="symbol-label">
                      <span class="svg-icon svg-icon-2 svg-icon-white">
                        <i class="fa-solid fa-server"></i>
                      </span>
                    </div>
                  </div>

                  <div class="timeline-content mt-n1" style="margin-bottom: 3rem">
                    <div class="pe-3">

                      <div class="fs-5 text-white fw-semibold mb-2">App</div>

                      <div class="d-flex align-items-center mt-1 fs-6" style="display: none">
                        <div class="text-white opacity-50 me-2 fs-7">Acesse as suas</div>
                        <a href="#" class="text-success fs-7 fw-bold">Aplicações</a>
                      </div>

                    </div>
                  </div>

              </div>
            </router-link>


            <!-- GUIA RAPIDO MENU -->
            <a href="javascript:void(0)" @click="notImplement">

            <div class="timeline-item">

                <div class="timeline-line w-40px"></div>

                <div class="timeline-icon symbol symbol-circle symbol-40px">
                  <div class="symbol-label">
                    <span class="svg-icon svg-icon-2 svg-icon-white">
                      <i class="fa-brands fa-readme"></i>
                    </span>
                  </div>
                </div>

                <div class="timeline-content mt-n1" style="margin-bottom: 3rem">
                  <div class="pe-3">

                    <div class="fs-5 text-white fw-semibold mb-2">Guia Rápido</div>

                    <div class="d-flex align-items-center mt-1 fs-6" style="display: none">
                      <div class="text-white opacity-50 me-2 fs-7">Aprenda sobre o</div>
                      <a href="#" class="text-success fs-7 fw-bold">Gerador de Sistemas</a>
                    </div>

                  </div>
                </div>


            </div>
            </a>




          </div>
        </div>
      </div>

      <div class="text-center" id="kt_sidebar_footer">
        <a href="javascript:void(0)" @click="notImplement" class="btn btn-hover-rise text-white bg-white bg-opacity-10 text-uppercase fs-7 fw-bold">
          Ver Atualizações
        </a>
      </div>

    </div>

  </div>
</template>


<script>
import {mapState} from "vuex";
import store from "../../store";

export default {
  name: 'MenuDireita',
  data() {
    return {
      menuRapido: false,
    }
  },
  methods: {
    menu(){
      this.menuRapido = !this.menuRapido

      if( this.menuRapido )
        setTimeout(()=>{ this.menuRapido = false },2000)
    },
    deslogar(){
      store.commit('SET_UNAUTHENTICATED')
      this.$router.push({name: 'login'})
    },
    notImplement(){
      this.$functions.alerts.notification('info', "Em Construção!", 'A funcionalidade estará disponível em breve!')
    },
  },
  computed: {
    ...mapState({
      user: state => state.userStore.items.user
    })
  }
}
</script>
