<template>
  <div>
    <div id="kt_header" class="header header-bg header-bg2">
      <div class="container-fluid">


        <!-- mobile dont show: d-none -->

        <div class="header-brand me-5" >
          <router-link :to="{ name: 'diagramas_list' }" @click="salvarDiagrama" style="font-size: 20px; text-decoration: none; color: white">
            <h1 style="color: white">
              <i class="fa-solid fa-diagram-project" style="font-size: 30px; color: rgb(255,255,255);"></i>
              Gerador de Sistemas
            </h1>
          </router-link>
        </div>


        <div class="topbar d-flex align-items-stretch">








          <!-- Adicionar Classe -->
          <div class="d-flex align-items-center me-2 me-lg-4">

            <a @click="$refs.ModalAdicionarClasse.show()" href="javascript:void(0)" class="btn btn-icon btn-borderless btn-color-white btn-active-primary bg-white btnModalAdicionarClasse bg-opacity-10 position-relative">
              <i class="fa-solid fa-plus"></i>
              <span class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
            </a>

<!--            <a data-bs-toggle="modal" data-bs-target="#modalAdicionarClasse" href="javascript:void(0)" class="btn btn-icon btn-borderless btn-color-white btn-active-primary bg-white bg-opacity-10 position-relative">
              <i class="fa-solid fa-plus"></i>
              <span class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
            </a>-->
          </div>

          <!-- Adicionar Relacionamento -->
          <div class="d-flex align-items-center me-2 me-lg-4">

            <a @click="$refs.ModalAdicionarRelacionamento.show()" href="javascript:void(0)" class="btn btn-icon btn-borderless btn-color-white btn-active-primary btnModalAdicionarRelacionamento bg-white bg-opacity-10 position-relative">
              <i class="fa-solid fa-link"></i>
              <span class="bullet bullet-dot bg-warning h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
            </a>

          </div>







          <!-- Pesquisa -->
          <div class="d-flex align-items-stretch me-2 me-lg-4">

            <div id="kt_header_search" class="header-search d-flex align-items-center header-search w-lg-250px" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-search-responsive="lg" data-kt-menu-trigger="auto" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end">

              <div data-kt-search-element="toggle" class="d-flex d-lg-none align-items-center">
                <div class="btn btn-icon btn-borderless btn-color-white btn-active-primary bg-white bg-opacity-10">
                        <span class="svg-icon svg-icon-1 svg-icon-white">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
														<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
													</svg>
												</span>
                </div>
              </div>

              <form data-kt-search-element="form" class="d-none d-lg-block w-100 position-relative mb-2 mb-lg-0" autocomplete="off">
                <input type="hidden" />
                <span class="svg-icon svg-icon-3 position-absolute top-50 translate-middle-y ms-0 ms-lg-4">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z" fill="currentColor" />
													<path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z" fill="currentColor" />
												</svg>
											</span>
                <input type="text" class="form-control form-control-flush ps-8 ps-lg-12" name="search" value="" placeholder="Search" data-kt-search-element="input" />
                <span class="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-lg-5" data-kt-search-element="spinner">
												<span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
											</span>
                <span class="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-lg-4" data-kt-search-element="clear">
												<span class="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
														<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
													</svg>
												</span>
											</span>
              </form>

            </div>
          </div>





          <div class="d-flex align-items-center">
            <router-link :to="{ name: 'diagramas_list' }" @click="salvarDiagrama" class="btn btn-icon btn-color-white btn-active-color-primary border-0 me-n3" data-bs-toggle="tooltip" data-bs-placement="left" title="Return to launcher">
               <span class="svg-icon svg-icon-2x">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
												<rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor" />
												<rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor" />
											</svg>
										</span>
            </router-link>
          </div>



        </div>



      </div>
    </div>
  </div>

  <ModalAdicionarClasse ref="ModalAdicionarClasse" :diagrama="diagrama" v-if="diagrama"/>
  <ModalAdicionarRelacionamento  ref="ModalAdicionarRelacionamento" :diagrama="diagrama" v-if="diagrama" />

</template>


<script>
import {mapActions, mapState} from "vuex";
import ModalAdicionarClasse from "../modal/ModalAdicionarClasse.vue";
import ModalAdicionarRelacionamento from "../modal/ModalAdicionarRelacionamento.vue";

import $ from 'jquery'

export default {
  name: 'TopMenu',
  components: {ModalAdicionarRelacionamento, ModalAdicionarClasse},
  props: [ 'diagrama', 'diagramaData' ],
  data: function() {
    return {
    }
  },
  computed:{
    ...mapState({
      diagramaData: state => state.diagramaStore.items.diagrama,
    })
  },
  methods:{
    ...mapActions([
      'getDiagramas',
      'updateDiagrama'
    ]),
    salvarDiagrama(){

      let diagram = {
        //nome: this.diagramaData.nome,
        //descricao: this.diagramaData.descricao,
        structure: JSON.stringify({
          class: this.diagrama[0].models,
          relationships: this.diagrama[0].linksModels,
        })
      }

      this.updateDiagrama({ id: this.diagramaData.id, data: diagram })
          .then((response)=>{
            this.$functions.alerts.notification('success', "Sucesso", 'Diagrama salvo com sucesso!')
          })
          .catch((response)=>{
            this.$functions.alerts.notification('error', "Erro", 'Não foi possível salvar o diagrama no momento!')
          })
          /*.finally(()=>{

          })*/

      //this.close()
    },
  }
}
</script>
