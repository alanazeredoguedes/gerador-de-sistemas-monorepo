<template>
  <ModalFullScreen ref="modal" id="modal_criar_aplicacao">

    <template v-slot:title>
      Nova Aplicação
    </template>

    <template v-slot:titleDescription>
      Crie aplicações e exporte um sistema!
    </template>

    <template v-slot:body>
      <div class="stepper stepper-links d-flex flex-column" >


        <div class="stepper-nav py-5">

          <div class="stepper-item d-menu d-menu-1 current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Informações da Aplicação</h3>
          </div>

          <div class="stepper-item d-menu d-menu-2" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Diagrama</h3>
          </div>

          <div class="stepper-item d-menu d-menu-3" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Tecnologias</h3>
          </div>

        </div>




        <!-- ##################################################################### -->
        <!-- ##################################################################### -->
        <div class="mx-auto mw-600px w-100 py-10"  id="kt_create_account_form">


          <!-- ##################################################################### -->
          <div class="current d-tab-1 d-tab" data-kt-stepper-element="content">
            <div class="w-100">

                <div class="pb-10 pb-lg-15">

                  <h2 class="fw-bold d-flex align-items-center text-dark">
                    Informações Gerais da Aplicação
                  </h2>

                  <div class="text-muted fw-semibold fs-6">Se precisar de mais informações, consulte a
                    <a href="javascript:void(0)" class="link-primary fw-bold">Página de Ajuda</a>.
                  </div>

                </div>

                <div class="fv-row mb-10">
                  <label class="d-flex align-items-center fs-5 fw-semibold mb-2 required">
                    Nome da Aplicação
                  </label>
                  <input type="text" v-model="application.name" class="form-control form-control-lg form-control-solid"  />
                </div>

                <div class="fv-row mb-10">
                  <label class="d-flex align-items-center fs-5 fw-semibold mb-2 required">
                    Breve Descrição
                  </label>
                  <textarea v-model="application.description" type="text" class="form-control form-control-lg form-control-solid" />
                </div>


                <div class=" flex-stack" style="padding-top: 40px;">
                  <button @click="changeTab()" type="button" class="btn btn-lg btn-light " style="float: left; display: none">
                    <i class="fa-solid fa-arrow-left"></i>Voltar
                  </button>


                  <button @click="changeTab(2)"  type="button" class="btn btn-lg btn-primary" style="float: right;">
                    Continuar <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

            </div>
          </div>
          <!-- ##################################################################### -->



          <!-- ##################################################################### -->
          <div class="d-tab-2 d-tab" data-kt-stepper-element="content">
            <div class="w-100">


              <div class="pb-10 pb-lg-15">

                <h1 class="fw-bold d-flex align-items-center text-dark">
                  Diagrama a ser implementado
                </h1>

                <div class="text-muted fw-semibold fs-6">Escolha o diagrama que será utilizado como base para
                  gerar sua aplicação
                </div>

              </div>



              <div class="mb-8">

                <div class="fs-6 fw-semibold mb-2" style="padding-bottom: 10px;">

                  <label class="fs-6 fw-semibold mb-2">Diagramas: </label>
                  <input type="text" v-model="diagramsSearch" class="form-control form-control-solid" placeholder="Busque pelo seu diagrama aqui..">

                </div>

                <div class="mh-300px scroll-y me-n7 pe-7">



                      <div v-for="(diagram, index) in diagrams">
                        <div class="" v-if="diagram && diagram.name.toLowerCase().includes( diagramsSearch.toLowerCase() )">


                          <label class="d-flex flex-stack mb-5 cursor-pointer">
                            <span class="d-flex align-items-center me-2">
															<span class="symbol symbol-50px me-6">
																<span class="symbol-label bg-light-primary">
																	<span class="svg-icon svg-icon-1 svg-icon-primary">
                                    <i class="fa-solid fa-diagram-project" style="font-size: 25px; color: #009ef7;"></i>
																	</span>
																</span>
															</span>
															<span class="d-flex flex-column">
																<span class="fw-bold fs-6" style="color: rgba(0,2,3,0.87);">{{ diagram.name }}</span>
																<span class="fs-7 text-muted">{{ diagram.description }}</span>
															</span>
														</span>
                            <span class="form-check form-check-custom form-check-solid">
															<input class="form-check-input" v-model="application.diagram" type="radio" name="app_diagram" :value="diagram.id">
														</span>
                          </label>

                        </div>

                      </div>

                      <div v-if="!existDiagramFilter" style="color: red">
                        <div class="fs-7 fw-bold text-muted">Não foi possivel localizar o diagrama por: {{diagramsSearch}}</div>
                      </div>
                </div>

              </div>



<!--              <div class="d-flex flex-stack mb-15" style="padding-top: 10px;">

                    <div class="me-5 fw-semibold">
                      <label class="fs-6">Receber Notificação</label>
                      <div class="fs-7 text-muted">Ao gerar o sistema, receber notificação por email.</div>
                    </div>

                    <label class="form-check form-switch form-check-custom form-check-solid">
                      <input class="form-check-input" type="checkbox" disabled value="" checked="checked">
                    </label>

              </div>-->

              <div class=" flex-stack" >
                <button @click="changeTab(1)" type="button" class="btn btn-lg btn-light " style="float: left; display: block">
                  <i class="fa-solid fa-arrow-left"></i>Voltar
                </button>


                <button @click="changeTab(3)"  type="button" class="btn btn-lg btn-primary" style="float: right;">
                  Continuar <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>


            </div>
          </div>
          <!-- ##################################################################### -->



          <!-- ##################################################################### -->
          <div class="d-tab-3 d-tab" data-kt-stepper-element="content">
            <div class="w-100">


              <div class="pb-10 pb-lg-15">

                <h2 class="fw-bold d-flex align-items-center text-dark">
                  Escolha as tecnologias a serem utilizadas
                </h2>

                <div class="text-muted fw-semibold fs-6">Se precisar de mais informações, consulte a
                  <a href="javascript:void(0)" class="link-primary fw-bold">Página de Ajuda</a>.
                </div>

              </div>



              <div class="fv-row">

                <label class="d-flex align-items-center fs-5 fw-semibold mb-4 required">
                  Linguagem de Programação
                </label>

                <div class="row row-cols-2 row-cols-md-4 g-5">

                  <div v-for="(pl, index) in programmingLanguage" class="col" >
                    <input type="radio" class="btn-check"
                           :value="pl.id"
                           v-model="application.programmingLanguage"
                           :id="'programmingLanguage'+pl.id"

                    >
                    <!--:disabled="!pl.active"-->

                    <label @click="changeProgrammingLanguage" :for="'programmingLanguage'+pl.id" class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex flex-column flex-center gap-5 h-100" >
                      <img
                          v-if="pl.logo"
                          :src="URI_BASE_API + pl.logo.url.reference"
                          alt=""
                          class="w-50px"
                      >
                      <div class="fs-5 fw-bold">{{ pl.name }}</div>
                    </label>

                  </div>

                </div>
              </div>


              <div class="fv-row" style="margin-top: 50px">

                <label class="d-flex align-items-center fs-5 fw-semibold mb-4 required">
                  Frameworks
                </label>

                <div class="row row-cols-2 row-cols-md-4 g-5">

                  <div  v-for="(fm, index) in frameworksFilter" class="col" >

                    <input type="radio" class="btn-check"
                           :value="fm.id"
                           v-model="application.framework"
                           :id="'framework'+fm.id"
                           :disabled="!fm.active"
                    >

                    <label :for="'framework'+fm.id" class="btn btn-outline btn-outline-dashed btn-active-light-primary p-7 d-flex flex-column flex-center gap-5 h-100" >
                      <img
                          v-if="fm.logo"
                          :src="URI_BASE_API + fm.logo.url.reference"
                          alt=""
                          class="w-50px"
                      >
                      <div class="fs-5 fw-bold">{{ fm.name }}</div>
                    </label>

                  </div>

                </div>
              </div>




              <div class=" flex-stack" style="padding-top: 60px;">
                <button @click="changeTab(2)" type="button" class="btn btn-lg btn-light " style="float: left; display: block">
                  <i class="fa-solid fa-arrow-left"></i>Voltar
                </button>


                <button @click="salvar()"  type="button" class="btn btn-lg btn-primary" style="float: right;">
                  Salvar
                </button>
              </div>



            </div>
          </div>
          <!-- ##################################################################### -->





        </div>
        <!-- ##################################################################### -->
        <!-- ##################################################################### -->













      </div>
    </template>


  </ModalFullScreen>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import $ from 'jquery'
import { URI_BASE_API } from "../../../../configs/api";
import ModalFullScreen from "../../../global/ModalFullScreen.vue";
import store from "../../../../store";


export default {
  name: 'CriarAplicacaoModal',
  components: {ModalFullScreen  },
  props: [ 'applicationEdit', ],

  data() {
    return {
      URI_BASE_API: URI_BASE_API,
      application: {
        id: '',
        name: '',
        description: '',
        programmingLanguage: '',
        framework: '',
        diagram: '',
      },
      diagramsSearch: '',

    }
  },
  watch:{

  },
  computed:{
    ...mapState({
      programmingLanguage: state => state.programmingLanguageStore.items.programmingLanguage,
      frameworks: state => state.frameworkStore.items.framework,
      diagrams: state => state.diagramaStore.items.diagramas
    }),
    /** Retorna frameworks conforme a linguagem de programacao selecionada */
    frameworksFilter() {
      if(!this.application.programmingLanguage)
        return null

      return this.frameworks.filter((value,index)=>{
        return value.programmingLanguage.id === this.application.programmingLanguage;

      })
    },
    existDiagramFilter(){
      let exist = 0
      this.diagrams.forEach((diagram)=>{
        if(diagram && diagram.name.toLowerCase().includes( this.diagramsSearch.toLowerCase() ))
          exist += 1
      })
      return exist !== 0
    }

  },
  methods: {
    ...mapActions([
      'getApplication',
      'getApplications',
      'createApplication',
      'updateApplication'
    ]),
    changeProgrammingLanguage(){
      this.application.framework = ''
    },
    salvar(){
      if(!this.application.name){
        this.$functions.alerts.notification('error', 'Defina um nome para a aplicação!')
        return
      }

      if(!this.application.programmingLanguage){
        this.$functions.alerts.notification('error', 'Escolha uma linguagem de programação antes de continuar!')
        return
      }

      if(!this.application.framework){
        this.$functions.alerts.notification('error', 'Escolha um framework antes de continuar!')
        return
      }

      if(this.applicationEdit){
        this.$functions.alerts.notification('info', "Aguarde!", 'Atualizando Informações!')
        this.updateApplication(this.application)
            .then((response)=>{
              this.$functions.alerts.notification('success', "Sucesso", 'Aplicação atualizada com sucesso!')
              this.getApplication(this.applicationEdit.id)
              this.resetComponent()
              this.close()
            })
            .catch((response)=>{
              this.$functions.alerts.notification('error', "Erro", 'Não foi possível atualizar a aplicação, tente novamente em outro momento!')
            })
      }else{

        this.$functions.alerts.notification('info', "Aguarde!", 'Cadastrando Informações!')
        this.createApplication(this.application)
            .then((response)=>{
              this.$functions.alerts.notification('success', "Sucesso", 'Aplicação criada com sucesso!')
              this.$router.push({ name: 'app_list' })
              this.getApplications().catch( response => this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar aplicações') )
              this.resetComponent()
              this.close()
            })
            .catch((response)=>{
              this.$functions.alerts.notification('error', "Erro", 'Não foi possível cadastrar a aplicação, tente novamente em outro momento!')
            })

      }


    },
    changeTab(tab = null){
      if(!tab)
        return;

      if(tab === 2)
        if(!this.application.name || !this.application.description){
          this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
          return
        }

      if(tab === 3)
        if(!this.application.diagram){
          this.$functions.alerts.notification('error', 'Escolha um diagrama antes de continuar!')
          return
        }

      $('.d-tab').removeClass('current')
      $('.d-menu').removeClass('current')

      $(`.d-menu-${tab}`).addClass('current')
      $(`.d-tab-${tab}`).addClass('current')
    },

    resetComponent(){
      this.application.name = ''
      this.application.description = ''
      this.application.programmingLanguage = ''
      this.application.framework = ''
      this.application.diagram = ''
      this.changeTab(1)
    },
    show(){
      store.dispatch("getProgrammingLanguage")
      store.dispatch("getFramework")
      store.dispatch("getDiagramas")

      this.$refs.modal.show()
      this.resetComponent()

      if(this.applicationEdit){
        this.application.id = this.applicationEdit.id
        this.application.name = this.applicationEdit.name
        this.application.description = this.applicationEdit.description
        this.application.programmingLanguage = this.applicationEdit.framework.programmingLanguage.id
        this.application.framework = this.applicationEdit.framework.id
        this.application.diagram = this.applicationEdit.diagram.id
      }

    },

    close(){
      this.$refs.modal.close()
      this.resetComponent()
    },





  },
  created() {


  },
  updated() {

  }
}
</script>
<style>
.nav-link.active h3{
  color: #009ef7 !important;
}
</style>
