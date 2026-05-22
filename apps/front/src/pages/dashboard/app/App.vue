<template>

  <div class="d-flex flex-wrap flex-stack mb-6" >
    <h1 class="fw-bold my-2" style="color: white">
      Aplicações
      <span class="fs-6 text-gray-400 fw-semibold ms-1"></span>
    </h1>

    <div class="d-flex flex-wrap my-2">

      <div class="me-4">
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-4">
            <i class="fa-solid fa-search" style="color: rgba(0,0,0,0.32); margin-right: 10px;"></i>
          </span>
          <input type="text" class="form-control form-control-solid w-250px ps-14" v-model="applicationSearch" placeholder="Pesquisar">

        </div>
      </div>

      <div class="me-4">
      <a href="javascript:void(0)" class="btn btn-primary btn-sm" @click="$refs.ModalCriarAplicacao.show();" >
        Nova Aplicação
      </a>
      </div>
    </div>
  </div>


  <div class="row" >




    <ListApplication v-for="( application, index ) in applications" :application="application" :application-search="applicationSearch" />





  </div>




















<CriarAplicacaoModal ref="ModalCriarAplicacao" />



</template>


<script>
import {mapActions, mapState} from 'vuex'
import $ from "jquery";
import {URI_BASE_API} from "../../../configs/api";
import CriarAplicacaoModal from "../../../components/dashboard/aplicacao/modal/CriarAplicacaoModal.vue";
import ListApplication from "../../../components/dashboard/aplicacao/ListAplicacao.vue";


export default {
  components: {ListApplication, CriarAplicacaoModal  },
  data() {
    return {
      data: null,
      URI_BASE_API: URI_BASE_API,
      applicationSearch: ''
    }
  },
  computed: {
    ...mapState({
      applications: state => state.applicationStore.items.applications
    }),

  },
  mounted() {
    this.updateListDiagramas()
    //console.log(this.applications)
  },
  methods: {
    ...mapActions([
      'getApplications',
    ]),
    updateListDiagramas(){
      this.getApplications()
          .catch( (response)=>{
            if(response.response.status !== 403)
              this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Aplicações')
          })
    }
  }

}
</script>

<style>


</style>