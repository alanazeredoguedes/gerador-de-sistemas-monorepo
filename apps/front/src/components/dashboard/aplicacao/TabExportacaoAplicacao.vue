<template>
  <div class="tab-app-export" style="display: none">

    <div class="card">
      <div class="card-header">
        <div class="card-title fs-3 fw-bold">Gerar Aplicação</div>
      </div>
      <div class="card-body">








        <div class="row" >
          <div class="col-xl-3">
            <div class="fs-6 fw-semibold mt-2 mb-3">Link do Repositório</div>
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
                              <a :href="application.repository" target="_blank">
                                <i class="fa-brands fa-github" style="font-size: 30px; color: #009ef7;"></i>
                              </a>
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                          <input type="text" class="form-control form-control-solid"
                                 v-model="application.repository"
                                 disabled
                          >
                      </span>
                    </span>

                </label>
              </div>

            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-xl-3">
            <div class="fs-6 fw-semibold mt-2 mb-3">Link de Acesso</div>
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
                                 <a :href="'http://'+application.url" target="_blank">
                                  <i class="fa-brands fa-aws" style="font-size: 30px; color: #009ef7;"></i>
                                 </a>
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                          <input type="text" class="form-control form-control-solid"
                                 v-model="application.url"
                                 disabled
                          >
                      </span>
                    </span>

                </label>
              </div>

            </div>
          </div>
        </div>



        <div class="row">
          <div class="col-xl-3">
            <div class="fs-6 fw-semibold mt-2 mb-3">Email de Acesso</div>
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
                                <i class="fa-solid fa-user" style="font-size: 30px; color: #009ef7;"></i>
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                          <input type="text" class="form-control form-control-solid"
                                 v-model="application.accessEmail"
                                 disabled
                          >
                      </span>
                    </span>

                </label>
              </div>

            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-xl-3">
            <div class="fs-6 fw-semibold mt-2 mb-3">Senha de acesso</div>
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
                              <a @click="showPassword">
                              <i class="fa-solid fa-key" style="font-size: 30px; color: #009ef7;"></i>
                                </a>
                            </div>
                          </span>
                        </span>
                      </span>
                      <span class="d-flex flex-column">
                          <input type="password" class="input-password form-control form-control-solid"
                                 v-model="application.accessPassword"
                                 disabled
                          >
                      </span>
                    </span>

                </label>
              </div>

            </div>
          </div>
        </div>






      </div>



<!--
      <div class="card-footer d-flex justify-content-end py-6">
        <button type="submit" @click="gerarAplicacao" class="btn btn-primary" >Gerar Aplicação</button>
      </div>-->
    </div>

  </div>
</template>

<script>
import {URI_BASE_API} from "../../../configs/api";
import {mapActions} from "vuex";

export default {
  name: 'TabExportacaoAplicacao',
  props: ['application'],
  data() {
    return {
      data: null,
    }
  },
  methods:{
    ...mapActions([
      'generateApplication',
      'getApplication',
    ]),

    showPassword(){
      let input = $('.input-password ');
      if(input.prop('type') === 'password'){
        input.prop('type', 'text')
      }else{
        input.prop('type', 'password')
      }
    },
    gerarAplicacao(){

      this.$functions.alerts.modalConfirm('Gerar uma nova Aplicação', `Em alguns minutos sua aplicação estará
       disponível e voce recebera os acessos para utilização`, ()=>{

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
    mounted() {
      /** ‘ID’ do diagrama Atual */
      let appId = this.$route.params.id

      this.getApplication(appId)
          .then( response => {
            //this.$functions.alerts.notification('success', "Sucesso", 'Sucesso ao carregar Aplicação')
            console.log(this.application)
          })
          .catch( response => {
            this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Aplicação')
            this.$router.push({ name: 'app_list' })

          })

    },
  }


}
</script>
