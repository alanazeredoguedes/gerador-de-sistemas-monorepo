<template>
  <div class="d-flex flex-column flex-row-fluid align-items-center">

    <LogoTitle/>

    <div class="d-flex flex-column flex-column-fluid mb-5 mb-lg-10">

        <div class="row g-7 w-xxl-850px">

          <div class="col-xxl-5">
            <div class="card border-0 shadow-none h-lg-100" style="background-color: #A838FF">
              <div class="card-body d-flex flex-column flex-center pb-0 pt-15">
                <div class="px-10 mb-10">
                  <h3 class="text-white mb-2 fw-bolder ttext-center text-uppercase mb-6">Iniciar No Sistema</h3>

                  <div class="mb-7">

                    <div class="d-flex align-items-center mb-2">
                      <i class="fa-solid fa-arrow-right-long" style="color: rgba(255,255,255,0.6); margin-right: 10px;"></i>
                      <span class="text-white opacity-75">Construa Diagramas</span>
                    </div>

                    <div class="d-flex align-items-center mb-2">
                      <i class="fa-solid fa-arrow-right-long" style="color: rgba(255,255,255,0.6); margin-right: 10px;"></i>
                      <span class="text-white opacity-75">Crie Novas Aplicações</span>
                    </div>

                    <div class="d-flex align-items-center mb-2">
                      <i class="fa-solid fa-arrow-right-long" style="color: rgba(255,255,255,0.6); margin-right: 10px;"></i>
                      <span class="text-white opacity-75">Exporte Sua Aplicação</span>
                    </div>

                  </div>

                  <a href="javascript:void(0)" @click="$refs.ModalCriarDiagrama.show();" class="btn btn-hover-rise text-white bg-white bg-opacity-10 text-uppercase fs-7 fw-bold">Começar</a>
                </div>
                <img class="mw-100 h-225px mx-auto mb-lg-n18" src="@/assets/themes/10/media/illustrations/sigma-1/12.png" />
              </div>
            </div>
          </div>


          <div class="col-xxl-7">
            <div class="row g-lg-7">
              <div class="col-sm-6">
                <a href="javascript:void(0)" @click="$refs.ModalCriarAplicacao.show();" class="card border-0 shadow-none min-h-200px mb-7" style="background-color: #F9666E">
                  <div class="card-body d-flex flex-column flex-center text-center">
                    <img class="mw-100 h-100px mb-7 mx-auto" src="@/assets/themes/10/media/illustrations/sigma-1/4.png" />
                    <h4 class="text-white fw-bold text-uppercase">Criar Aplicação</h4>
                  </div>
                </a>
              </div>
              <div class="col-sm-6">
                <a href="javascript:void(0)"  @click="$refs.ModalCriarDiagrama.show();" class="card border-0 shadow-none min-h-200px mb-7" style="background-color: #35D29A">
                  <div class="card-body d-flex flex-column flex-center text-center">
                    <img class="mw-100 h-100px mb-7 mx-auto" src="@/assets/themes/10/media/illustrations/sigma-1/5.png" />
                    <h4 class="text-white fw-bold text-uppercase">Criar Diagrama</h4>
                  </div>
                </a>
              </div>
            </div>
            <div class="card border-0 shadow-none min-h-200px" style="background-color: #D5D83D">
              <div class="card-body d-flex flex-center flex-wrap">
                <img class="mw-100 h-200px me-4 mb-5 mb-lg-0" src="@/assets/themes/10/media/illustrations/sigma-1/11.png" />
                <div class="d-flex flex-column align-items-center align-items-md-start flex-grow-1" data-theme="light">
                  <h3 class="text-gray-900 fw-bolder text-uppercase mb-5">Guia Rápido</h3>
                  <div class="text-gray-800 mb-5 text-center text-md-start">
                    Explore nosso guia de
                    <br/>Utilização
                  </div>
                  <a href="javascript:void(0)" @click="notImplement" class="btn btn-hover-rise text-gray-900 text-uppercase fs-7 fw-bold" style="background-color: #EBEE51">
                    Aprenda Mais
                  </a>
                </div>
              </div>
            </div>
          </div>




        </div>


  </div>

    <ModalCriarDiagrama ref="ModalCriarDiagrama" />
    <CriarAplicacaoModal ref="ModalCriarAplicacao"/>
</div>
</template>


<script>
import { mapActions } from 'vuex'
import LogoTitle from "../../../components/dashboard/LogoTitle.vue";
import ModalCriarDiagrama from "../../../components/dashboard/modal/ModalCriarDiagrama.vue";
import CriarAplicacaoModal from "../../../components/dashboard/aplicacao/modal/CriarAplicacaoModal.vue";

export default {
  components: {CriarAplicacaoModal, ModalCriarDiagrama, LogoTitle},
  data() {
    return {
      data: null
    }
  },

  mounted() {
    //this.$store.dispatch('getCursos')
    //this.getCursos()
  },
  methods: {
    notImplement(){
      this.$functions.alerts.notification('info', "Em Construção!", 'A funcionalidade estará disponível em breve!')
    },
    /*...mapActions([
        'getCursos',
    ])*/

  }

}
</script>