<template>
  <div class="tab-app-info">

    <div class="card">
      <div class="card-header">

        <div class="card-title fs-3 fw-bold">

          Informações da Aplicação

        </div>

      </div>
        <div class="card-body p-9">


          <div class="row mb-8">
            <div class="col-xl-3">
              <div class="fs-6 fw-semibold mt-2 mb-3">Nome da Aplicação</div>
            </div>
            <div class="col-xl-9 fv-row fv-plugins-icon-container">
              <input type="text" class="form-control form-control-solid" v-model="application.name" disabled>
            </div>
          </div>



          <div class="row mb-8">
            <div class="col-xl-3">
              <div class="fs-6 fw-semibold mt-2 mb-3">Descrição da Aplicação:</div>
            </div>
            <div class="col-xl-9 fv-row fv-plugins-icon-container">
              <textarea name="description" class="form-control form-control-solid h-100px" v-model="application.description" disabled></textarea>
            </div>
          </div>

          <div class="row" v-if="application.diagram">
            <div class="col-xl-3">
              <div class="fs-6 fw-semibold mt-2 mb-3">Diagrama Vinculado</div>
            </div>
            <div class="col-xl-9">
              <div class="form-check form-switch form-check-custom form-check-solid">

                <div class="">
                  <label class="d-flex flex-stack mb-5 cursor-pointer">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-primary">
                          <span class="svg-icon svg-icon-1 svg-icon-primary">
                            <div  class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                                <i class="fa-solid fa-diagram-project" style="font-size: 30px; color: #009ef7;"></i>
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bold fs-6" style="color: rgba(0, 2, 3, 0.87);">
                         {{ application.diagram.name }}
                        </span>
                      </span>
                    </span>

                  </label>
                </div>

              </div>
            </div>
          </div>


          <div class="row" v-if="application.framework">
            <div class="col-xl-3">
              <div class="fs-6 fw-semibold mt-2 mb-3">Linguagem de Programação</div>
            </div>
            <div class="col-xl-9">
              <div class="form-check form-switch form-check-custom form-check-solid">

                <div class="">
                  <label class="d-flex flex-stack mb-5 cursor-pointer">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-primary">
                          <span class="svg-icon svg-icon-1 svg-icon-primary">
                            <div  class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                              <img :src="URI_BASE_API + application.framework.programmingLanguage.logo.url.reference">
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bold fs-6" style="color: rgba(0, 2, 3, 0.87);">
                         {{ application.framework.programmingLanguage.name }}
                        </span>
                      </span>
                    </span>

                  </label>
                </div>

              </div>
            </div>
          </div>

          <div class="row" v-if="application.framework">
            <div class="col-xl-3">
              <div class="fs-6 fw-semibold mt-2 mb-3">Framework</div>
            </div>
            <div class="col-xl-9">
              <div class="form-check form-switch form-check-custom form-check-solid">

                <div class="">
                  <label class="d-flex flex-stack mb-5 cursor-pointer">
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <span class="symbol-label bg-light-primary">
                          <span class="svg-icon svg-icon-1 svg-icon-primary">
                            <div v-if="application.framework" class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                              <img :src="URI_BASE_API + application.framework.logo.url.reference">
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                        <span class="fw-bold fs-6" style="color: rgba(0, 2, 3, 0.87);">
                         {{ application.framework.name }}
                        </span>
                      </span>
                    </span>

                  </label>
                </div>

              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-xl-3">
              <div class="fs-6 fw-semibold mt-2 mb-3">Notificações por Email</div>
            </div>
            <div class="col-xl-9">
              <div class="form-check form-switch form-check-custom form-check-solid">
                <input class="form-check-input" type="checkbox" value="" id="status" name="status" checked="checked" disabled>
                <label class="form-check-label fw-semibold text-gray-400 ms-3" for="status">Ativo</label>
              </div>
            </div>
          </div>

        </div>

        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <a href="#" class="btn btn-sm btn-bg-light btn-active-color-primary me-3" @click="$refs.ModalCriarAplicacao.show();" >Editar</a>
          <a href="#" class="btn btn-sm btn-danger me-3" @click="remove">Excluir</a>


        </div>

      <div>

      </div>

    </div>

    <CriarAplicacaoModal ref="ModalCriarAplicacao" :applicationEdit="application" />



  </div>
</template>


<script>
import {URI_BASE_API} from "../../../configs/api";
import {mapActions} from "vuex";
import axios from "axios";
import jQuery from "jquery";
import CriarAplicacaoModal from "./modal/CriarAplicacaoModal.vue";

export default {
  components: {CriarAplicacaoModal},
  props: ['application'],
  name: 'TabInfoAplicacao',
  data() {
    return {
      data: null,
      URI_BASE_API: URI_BASE_API,
    }
  },
  methods:{
    ...mapActions([
      'generateApplication',
      'getApplication',
      'getApplications',
      'removeApplication',
    ]),
    gerarAplicacao(){

      this.$functions.alerts.modalConfirm('Gerar uma nova Aplicação', `Em alguns minutos sua aplicação estará
       disponível e voce recebera os acessos para utilização`, ()=>{

        this.$functions.alerts.notification('info', "Aguarde", "Cadastrando Informações!")

        this.generateApplication(this.application.id)
                  .then( (response) => {

                    if(response.data.status){
                      this.$functions.alerts.modalAlert('success', "Sucesso", response.data.message)

                    }else{
                      this.$functions.alerts.notification('error', "Falha ao Gerar Aplicação", response.data.message)
                    }

                  })
                  .catch( (response) => {
                    this.$functions.alerts.notification('error', "Falha ao Gerar Aplicação", response.response.data.message)
                  })

          })

    },
    remove() {
      this.$functions.alerts.modalConfirm('Remover Aplicação', "Deseja realmente remover a Aplicação ?",
          ()=>{
            this.$functions.alerts.notification('info', "Aguarde", "Cadastrando Informações!")

            this.removeApplication(this.application.id)
                .then( (response) => {
                  //console.log(response)
                  this.$functions.alerts.notification('success', "Successo", response.data.message)
                  this.getApplications()
                  this.$router.push({ name: 'app_list' })
                })
                .catch( (response) => {
                  //console.log(response)
                  this.$functions.alerts.notification('error', "Falha ao Remover", response.response.data.message)
                })
          })
    },


  }
}
</script>
