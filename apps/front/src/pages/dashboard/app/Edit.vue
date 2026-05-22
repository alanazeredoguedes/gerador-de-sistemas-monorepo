<template>
<div v-if="application">
  <div class="card mb-6 mb-xl-9">
    <div class="card-body pt-9 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
<!--        <div class="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
&lt;!&ndash;          <img class="mw-50px mw-lg-75px" src="@/assets/themes/10/media/logos/default-small.svg" alt="image">&ndash;&gt;
        </div>-->
        <div class="flex-grow-1">

          <div class="row d-flex justify-content-between align-items-start flex-wrap mb-2">

            <div class="col-12 d-flex flex-column">
              <div class="d-flex align-items-center mb-1">
                <a href="#" class="text-gray-800 text-hover-primary fs-2 fw-bold me-3">{{ application.name }}</a>
                <span class="badge badge-light-success me-auto">Ativo</span>
              </div>
              <div class="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                # {{ application.description }}
              </div>
            </div>


          </div>

          <div class="d-flex flex-wrap justify-content-start">

            <div class="d-flex flex-wrap">

<!--              <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div class="d-flex align-items-center">
                  <div class="fs-4 fw-bold">29 Jan, 2022</div>
                </div>
                <div class="fw-semibold fs-6 text-gray-400">Criado em</div>
              </div>

              <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div class="d-flex align-items-center">
                  <div class="fs-4 fw-bold">29 Jan, 2022</div>
                </div>
                <div class="fw-semibold fs-6 text-gray-400">Atualizado em</div>
              </div>-->

            </div>

            <div class="symbol-group symbol-hover mb-3">

              <div v-if="application.framework" class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                <img :src="URI_BASE_API + application.framework.logo.url.reference">
              </div>

              <div v-if="application.framework" class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                <img :src="URI_BASE_API + application.framework.programmingLanguage.logo.url.reference">
              </div>

            </div>

          </div>


        </div>

      </div>


      <div class="card-footer d-flex justify-content-end py-6" >
         <a @click="gerarAplicacao" type="button" class="btn btn-success" style="margin-right: 20px;">Gerar Aplicação</a>
         <a
            v-if="application.downloadUrl"
            :href="application.downloadUrl"
            type="button"
            class="btn btn-info"
            style="margin-right: 20px;"
            target="_blank"
            rel="noopener"
            download
         >
           <i class="fa-solid fa-download me-2"></i>Baixar Aplicação (.zip)
         </a>
         <a
            v-else
            type="button"
            class="btn btn-secondary disabled"
            style="margin-right: 20px; pointer-events: none; opacity: 0.6;"
            :title="aguardandoDownload ? 'Geração em andamento — aguarde…' : 'Gere a aplicação para liberar o download'"
         >
           <i class="fa-solid fa-download me-2"></i>
           {{ aguardandoDownload ? 'Gerando aplicação…' : 'Baixar Aplicação (.zip)' }}
         </a>
         <a @click="atualizarAplicacao" type="button" class="btn btn-primary" >
           <div  class="spinner-grow text-light" role="status" style="--bs-spinner-width: 1rem; --bs-spinner-height: 1rem;"></div>
           Atualizar
         </a>
      </div>


      <div class="separator"></div>

      <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
        <li class="nav-item">
          <a class="nav-link btn-tab-info text-active-primary py-5 me-6 active" @click="changeTab(1)" href="javascript:void(0)">Informações da Aplicação</a>
          <a class="nav-link btn-tab-export text-active-primary py-5 me-6 " @click="changeTab(2)" href="javascript:void(0)">Acessos</a>
        </li>

      </ul>

    </div>
  </div>


  <TabInfoAplicacao :application="application"/>



  <TabExportacaoAplicacao :application="application"/>


</div>
</template>


<script>
import {mapActions, mapState} from 'vuex'
import $ from "jquery";
import {URI_BASE_API} from "../../../configs/api";
import CriarAplicacaoModal from "../../../components/dashboard/aplicacao/modal/CriarAplicacaoModal.vue";
import TabExportacaoAplicacao from "../../../components/dashboard/aplicacao/TabExportacaoAplicacao.vue";
import TabInfoAplicacao from "../../../components/dashboard/aplicacao/TabInfoAplicacao.vue";

export default {
  components: {TabInfoAplicacao, TabExportacaoAplicacao, CriarAplicacaoModal   },
  data() {
    return {
      data: null,
      URI_BASE_API: URI_BASE_API,
      aguardandoDownload: false,
      pollTimer: null,
    }
  },
  beforeUnmount() {
    this.stopPolling();
  },
  computed: {
    ...mapState({
      application: state => state.applicationStore.items.application
    }),
  },
  mounted() {
    /** ‘ID’ do diagrama Atual */
    this.atualizarAplicacao()
  },
  methods: {
    ...mapActions([
      'getApplication',
      'getApplications',
      'removeApplication',
      'generateApplication',
    ]),
    changeTab(goTab){
      let tabInfo = $('.tab-app-info')
      let btnTabInfo = $('.btn-tab-info')

      let tabExport = $('.tab-app-export')
      let btnTabExport = $('.btn-tab-export')


      if (goTab === 1){
        tabExport.css('display', 'none')
        tabInfo.css('display', 'block')

        btnTabInfo.addClass('active')
        btnTabExport.removeClass('active')
      }

      if (goTab === 2){
        tabExport.css('display', 'block')
        tabInfo.css('display', 'none')

        btnTabInfo.removeClass('active')
        btnTabExport.addClass('active')
      }

    },
    atualizarAplicacao(){
      let appId = this.$route.params.id

      this.$functions.alerts.notification('info', "Aguarde", 'Consultando Informações!')

      this.getApplication(appId)
          .then( response => {
            this.$functions.alerts.notification('success', "Sucesso", 'Sucesso ao carregar Aplicação')
            // console.log(this.application)
          })
          .catch( response => {
            this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Aplicação')
            this.$router.push({ name: 'app_list' })

          })
    },
    gerarAplicacao(){

      this.$functions.alerts.modalConfirm('Gerar uma nova Aplicação', `Em alguns minutos sua aplicação estará
       disponível e voce recebera os acessos para utilização`, ()=>{

        this.generateApplication(this.application.id)
            .then( (response) => {


              if(response.data.status){
                this.$functions.alerts.modalAlert('success', "Sucesso", response.data.message)
                this.startPollingDownload()

              }else{
                this.$functions.alerts.notification('error', "Falha ao Gerar Aplicação", response.data.message)
              }


            })
            .catch( (response) => {
              this.$functions.alerts.notification('error', "Falha ao Gerar Aplicação", response.response.data.message)
            })

      })

    },
    /**
     * Após disparar /generate, o back ainda aguarda o callback do code-generator com a
     * downloadUrl. Aqui fazemos polling leve refazendo o GET da aplicação até o link
     * aparecer (ou desistimos após ~5min, prazo confortável para um zip grande).
     */
    startPollingDownload(){
      this.stopPolling()
      this.aguardandoDownload = true
      const appId = this.application.id
      const startedAt = Date.now()
      const maxMs = 5 * 60 * 1000

      this.pollTimer = setInterval(() => {
        this.getApplication(appId)
            .then(() => {
              if (this.application && this.application.downloadUrl) {
                this.stopPolling()
                this.$functions.alerts.notification('success', 'Aplicação Pronta',
                    'Seu .zip está disponível para download.')
              } else if (Date.now() - startedAt > maxMs) {
                this.stopPolling()
              }
            })
            .catch(() => { /* polling silencioso; usuário pode clicar Atualizar */ })
      }, 4000)
    },
    stopPolling(){
      if (this.pollTimer) {
        clearInterval(this.pollTimer)
        this.pollTimer = null
      }
      this.aguardandoDownload = false
    },




  }

}
</script>

<style>


</style>