<template>
  <ModalFullScreen ref="modal" id="modal_criar_diagrama">

    <template v-slot:title>
      Novo Diagrama
    </template>

    <template v-slot:titleDescription>
      Crie diagramas e comece a modelar!
    </template>

    <template v-slot:body>
      <div class="stepper stepper-links d-flex flex-column" id="kt_create_account_stepper">

        <div class="stepper-nav py-5">
          <div class="stepper-item d-menu d-menu-1 current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Diagramas</h3>
          </div>
          <div class="stepper-item d-menu d-menu-2" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Informações Gerais</h3>
          </div>
        </div>


        <div class="mx-auto mw-600px w-100 py-10"  id="kt_create_account_form">


          <div class="current d-tab-1 d-tab" data-kt-stepper-element="content">

            <div class="w-100">
              <div class="pb-10 pb-lg-15">
                <h2 class="fw-bold d-flex align-items-center text-dark">Iniciar com Diagrama!
                  <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Tipo de diagrama a ser implementado"></i>
                </h2>
                <div class="text-muted fw-semibold fs-6">
                  Começe a modelar a partir de um template ou crie um diagrama do zero!
                </div>
              </div>






              <!-- ##################################################################################### -->
              <!-- ##################################################################################### -->
              <div class="mb-8">

                <div class="fs-6 fw-semibold mb-2" style="padding-bottom: 10px;">

                  <label class="fs-6 fw-semibold mb-2">Diagramas: </label>
                  <input type="text" v-model="diagramsSearch" class="form-control form-control-solid" placeholder="Pesquisar por diagramas..">

                </div>

                <div class="mh-300px scroll-y me-n7 pe-7">

                  <div>
                    <div class="" v-if="'Diagrama Em Branco' && 'Diagrama Em Branco'.toLowerCase().includes( diagramsSearch.toLowerCase() )">

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
																<span class="fw-bold fs-6" style="color: rgba(0,2,3,0.87);">Diagrama Em Branco</span>
																<span class="fs-7 text-muted">Começar com um diagrama em branco.</span>
															</span>
														</span>
                        <span class="form-check form-check-custom form-check-solid">
                          <input class="form-check-input" v-model="diagrama.diagrama" type="radio" name="app_diagram" value="0">
                        </span>
                      </label>
                    </div>
                  </div>


                  <div v-for="(diagram, index) in diagramasTemplate">
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
                          <input class="form-check-input" v-model="diagrama.diagrama" type="radio" name="app_diagram" :value="diagram.id">
                        </span>
                      </label>

                    </div>

                  </div>

                  <div v-if="!existDiagramFilter" style="color: red">
                    <div class="fs-7 fw-bold text-muted">Não foi possível localizar o diagrama por: {{ diagramsSearch }}</div>
                  </div>
                </div>

              </div>
              <!-- ##################################################################################### -->
              <!-- ##################################################################################### -->










              <button @click="changeTab(2)" type="button" class="btn btn-lg btn-primary " style="float: right" data-kt-stepper-action="next">
                Continuar
                <span class="svg-icon svg-icon-4 ms-1 me-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor" />
                          <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor" />
                        </svg>
                      </span>
              </button>


            </div>
          </div>



          <div class="d-tab-2 d-tab" data-kt-stepper-element="content">
            <div class="w-100">

              <div class="pb-10 pb-lg-15">
                <h2 class="fw-bold text-dark">Informações Gerais</h2>
                <div class="text-muted fw-semibold fs-6">Se precisar de mais informações, consulte a
                  <a href="javascript:void(0)" class="link-primary fw-bold">Página de Ajuda</a>.
                </div>
              </div>

              <div class="mb-10 fv-row">
                <label class="form-label mb-3">Nome do Diagrama <span style="color: red">*</span></label>
                <input v-model="this.diagrama.nome" type="text" class="form-control form-control-lg form-control-solid" />
              </div>

              <div class="mb-10 fv-row">
                <label class="form-label mb-3">Descrição <span style="color: red">*</span></label>
                <textarea v-model="this.diagrama.descricao" type="text" class="form-control form-control-lg form-control-solid" />
              </div>

              <div style=" margin-top: 40px;">

                <button @click="changeTab(1)" type="button" class="btn btn-lg btn-primary " style="float: left; " data-kt-stepper-action="next">
                        <span class="svg-icon svg-icon-4 ms-1 me-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="currentColor" />
                            <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="currentColor" />
                          </svg>
                        </span>
                  Voltar
                </button>

                <button @click="create" type="button" class="btn btn-lg btn-primary " style="float: right;" data-kt-stepper-action="next">
                  Cadastrar
                  <span class="svg-icon svg-icon-4 ms-1 me-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor" />
                            <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor" />
                          </svg>
                        </span>
                </button>

              </div>

            </div>
          </div>


        </div>
      </div>
    </template>


  </ModalFullScreen>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import $ from 'jquery'
import ModalFullScreen from "../../global/ModalFullScreen.vue";
import store from "../../../store";

export default {
  name: 'ModalCriarDiagrama',
  components: {ModalFullScreen},
  data() {
    return {
      diagrama: {
        nome: '',
        descricao: '',
        diagrama: '0',
      },
      diagramsSearch: '',

    }
  },
  computed:{
    ...mapState({
      diagramasTemplate: state => state.diagramaStore.items.diagramasTemplate
      //diagramas: state => state.diagramaStore.items.diagramas
    }),
    existDiagramFilter(){
      let exist = 0
      this.diagramasTemplate.forEach((diagram)=>{
        if(diagram && diagram.name.toLowerCase().includes( this.diagramsSearch.toLowerCase() ))
          exist += 1
      })
      return exist !== 0
    }
  },
  methods: {
    ...mapActions([
      'getDiagramasTemplate',
      'createDiagrama',
      'getDiagramas'
    ]),
    create(){
      if(!this.diagrama.nome || !this.diagrama.descricao || !this.diagrama.diagrama){
        this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
        return
      }

      this.$functions.alerts.notification('info', "Aguarde!", 'Cadastrando Informações!')
      this.close()

      this.createDiagrama({
        name: this.diagrama.nome,
        description: this.diagrama.descricao,
        diagram: this.diagrama.diagrama ,
        structure: '{"class":[],"relationships":[]}'
      }).then( (response) =>{
            this.$functions.alerts.notification('success', "Sucesso", 'Diagrama criado com successo!')
            this.$router.push({ name: 'diagramas_list' })
            this.getDiagramas()
            this.resetModal()
          })
          /*.catch((response)=>{
            this.$functions.alerts.notification('error', "Erro", 'Não foi possivel cadastrar o diagrama no momento!')
          })*/

    },
    resetModal(){
      this.diagrama.nome = ''
      this.diagrama.descricao = ''
      this.diagrama.diagrama = '0'
      this.changeTab(1)
    },
    changeTab(tab){
        $('.d-tab').removeClass('current')
        $('.d-menu').removeClass('current')

        $(`.d-menu-${tab}`).addClass('current')
        $(`.d-tab-${tab}`).addClass('current')
    },
    diagramaDesativado(){
      this.$functions.alerts.notification('info', 'Diagrama não está disponivel no momento!')
    },
    show(){
      this.$refs.modal.show()
      this.resetModal()
      store.dispatch("getDiagramasTemplate")
      console.log()

    },
    close(){
      this.$refs.modal.close()
    },
  }
}
</script>
