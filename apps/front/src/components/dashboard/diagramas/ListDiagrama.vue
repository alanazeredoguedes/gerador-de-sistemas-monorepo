<template>
  <tr v-if="diagrama && diagrama.name.toLowerCase().includes( diagramsSearch.toLowerCase() )">

    <td>
      <div class="form-check form-check-sm form-check-custom form-check-solid">
        <input class="form-check-input" type="checkbox" value="1" />
      </div>
    </td>

    <td>
      <div class="d-flex align-items-center">
        <div class="">
          <router-link :to="{ name: 'diagrama', params: { id: diagrama.id } }" class="text-gray-700 text-hover-primary fs-5 fw-bold">
            {{ diagrama.name }}
          </router-link>
        </div>
      </div>
    </td>

    <td class="pe-0">
      <router-link :to="{ name: 'diagrama', params: { id: diagrama.id } }" class="text-gray-700 text-hover-primary fs-5 fw-bold">
        <span class="fw-bold text-gray-700" >{{ diagrama.description }}</span>
      </router-link>
    </td>


    <td class="text-end">

      <button type="button" @click="openActions(diagrama.id)" class="btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary ms-auto show menu-dropdown">
                      <span class="svg-icon svg-icon-3">
																<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
																	<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																		<rect x="5" y="5" width="5" height="5" rx="1" fill="currentColor"></rect>
																		<rect x="14" y="5" width="5" height="5" rx="1" fill="currentColor" opacity="0.3"></rect>
																		<rect x="5" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3"></rect>
																		<rect x="14" y="14" width="5" height="5" rx="1" fill="currentColor" opacity="0.3"></rect>
																	</g>
																</svg>
                      </span>
      </button>

      <div style="position: fixed; margin-top: 0.5%; margin-left: -10%;" :class="'showActions-'+diagrama.id" class="showActions menu menu-sub menu-sub-dropdown w-250px w-md-300px ">
        <div class="px-7 py-5">
          <div class="fs-5 text-dark fw-bold" style="float: left;">Ações</div>
        </div>
        <div class="separator border-gray-200"></div>
        <div class="px-7 py-5">
          <div class="d-flex justify-content-end">
            <router-link :to="{ name: 'diagrama', params: { id: diagrama.id } }" class="btn btn-sm btn-light btn-active-light-dark me-2">Acessar</router-link>
            <button type="reset" @click="$refs.ModalEditarDiagrama.show(); openActions(diagrama.id)" class="btn btn-sm btn-light btn-active-light-primary me-2" data-kt-menu-dismiss="true">Editar</button>
            <button type="reset" @click="remove" class="btn btn-sm btn-light btn-active-light-danger me-2" data-kt-menu-dismiss="true">Excluir</button>
          </div>
        </div>
      </div>

    </td>

  </tr>
  <ModalEditarDiagrama ref="ModalEditarDiagrama" :diagrama="diagrama" />
</template>


<script>
import $ from "jquery";
import {mapActions} from "vuex";
import ModalEditarDiagrama from "../modal/ModalEditarDiagrama.vue";

export default {
  components: { ModalEditarDiagrama },
  props: [ 'diagrama', 'diagramsSearch' ],
  name: 'ListDiagrama',
  data() {
    return {
      data: null
    }
  },
  methods:{
    ...mapActions([
      'getDiagramas',
      'createDiagrama',
      'removeDiagrama'
    ]),
    exportar(){
      //alert('Exportar');
    },
    remove() {


      this.$functions.alerts.modalConfirm('Remover Diagrama', "Deseja realmente remover o diagrama ?",
          ()=>{
            this.$functions.alerts.notification('info', "Aguarde!", 'Excluindo Diagrama!')

            this.removeDiagrama(this.diagrama.id)
                .then( (response) => {
                  this.$functions.alerts.notification('success', "Successo", 'Succeso ao remover Diagrama!')
                  this.getDiagramas()
                })
                .catch( (response) => {
                  //console.log(response)
                    this.$functions.alerts.notification('error', "Falha ao remover", response.response.data.message)
                })
          }
      )
    },
    openActions(id){
        let showActions = $(`.showActions-` + id);
        let showActionsAll = $('.showActions');

        if(showActions.hasClass("show")){
          showActionsAll.removeClass('show')
        }else{
          showActionsAll.removeClass('show')
          showActions.addClass('show')
        }
    },
  }
}
</script>
