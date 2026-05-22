<template>
  <div class="d-flex flex-wrap flex-stack mb-6" >
    <h1 class="fw-bold my-2" style="color: white">
      Diagramas
      <span class="fs-6 text-gray-400 fw-semibold ms-1"></span>
    </h1>

    <div class="d-flex flex-wrap my-2">

      <a href="javascript:void(0)" class="btn btn-primary btn-sm" @click="$refs.ModalCriarDiagrama.show();" >
        Novo Diagrama
      </a>

    </div>
  </div>


  <div class="content d-flex flex-column flex-column-fluid" style="margin-top: -20px">

      <div class="post d-flex flex-column-fluid" id="kt_post">
        <div id="kt_content_container" class="container-xxl" style="padding: 0">
          <div class="card card-flush">


            <div class="card-header align-items-center py-5 gap-2 gap-md-5">

              <div class="card-title">
                <div class="d-flex align-items-center position-relative my-1">
                  <span class="svg-icon svg-icon-1 position-absolute ms-4">
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
														<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
													</svg>
												</span>
                  <input type="text" v-model="diagramsSearch" class="form-control form-control-solid w-250px ps-14" placeholder="Pesquisar Diagrama" />
                </div>
              </div>

            </div>


            <div class="card-body pt-0">
              <table class="table align-middle table-row-dashed fs-6 gy-5" id="kt_ecommerce_products_table">
                <thead>
                  <tr class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                    <th class="w-10px pe-2">
                      <div class="form-check form-check-sm form-check-custom form-check-solid me-3">
                        <input class="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_ecommerce_products_table .form-check-input" value="1" />
                      </div>
                    </th>
                    <th class="min-w-100px">Diagrama</th>
                    <th class="min-w-100px">Descricao</th>
                    <th class="text-end min-w-70px">Ações</th>
                  </tr>
                </thead>
                <tbody class="fw-semibold text-gray-600">


                  <ListDiagrama v-for="(diagrama, index) in diagramas" :key="diagrama.id" :diagrama="diagrama" :diagramsSearch="diagramsSearch"/>




                </tbody>
              </table>

              <div v-if="!existDiagramFilter" class="text-center" style="padding-top: 20px;">
                <div class="fs-7 fw-bold text-muted">Não foi possivel localizar o diagrama por: <b>{{ diagramsSearch }}</b></div>
              </div>

              <div class="d-flex flex-stack flex-wrap pt-10" v-if="diagramas.length !== 0">
                <div class="fs-6 fw-semibold text-gray-700">Exibindo de 1 a {{ diagramas.length }} de {{ diagramas.length }} diagramas</div>
                <ul class="pagination">
                  <li class="page-item previous">
                    <a href="javascript:void(0)" class="page-link">
                      <i class="previous"></i>
                    </a>
                  </li>
                  <li class="page-item active">
                    <a href="javascript:void(0)" class="page-link">1</a>
                  </li>
<!--                  <li class="page-item">
                    <a href="javascript:void(0)" class="page-link">2</a>
                  </li>
                  <li class="page-item">
                    <a href="javascript:void(0)" class="page-link">3</a>
                  </li>
                  <li class="page-item">
                    <a href="javascript:void(0)" class="page-link">4</a>
                  </li>
                  <li class="page-item">
                    <a href="javascript:void(0)" class="page-link">5</a>
                  </li>
                  <li class="page-item">
                    <a href="javascript:void(0)" class="page-link">6</a>
                  </li>-->
                  <li class="page-item next">
                    <a href="javascript:void(0)" class="page-link">
                      <i class="next"></i>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>

  <ModalCriarDiagrama ref="ModalCriarDiagrama" />

</template>
<script>
import { mapActions, mapState } from 'vuex'
import ModalCriarDiagrama from "../../../components/dashboard/modal/ModalCriarDiagrama.vue";
import $ from "jquery";
import ListDiagrama from "../../../components/dashboard/diagramas/ListDiagrama.vue";

export default {
  components: { ListDiagrama, ModalCriarDiagrama },
  data() {
    return {
      data: null,
      diagramsSearch: '',
    }
  },
  mounted() {
    this.updateListDiagramas()
  },
  updated() {
    //this.updateListDiagramas()
  },
  computed: {
    ...mapState({
      diagramas: state => state.diagramaStore.items.diagramas
    }),
    existDiagramFilter(){
        let exist = 0
        this.diagramas.forEach((diagram)=>{
          if(diagram && diagram.name.toLowerCase().includes( this.diagramsSearch.toLowerCase() ))
            exist += 1
        })
        return exist !== 0
    },

  },
  methods: {
    ...mapActions([
        'getDiagramas',
    ]),
    updateListDiagramas(){

      this.$functions.alerts.notification('info', "Aguarde!", 'Consultando Informações!')

      this.getDiagramas()
          .then( response => {
            this.$functions.alerts.notification('success', "Sucesso", 'Sucesso ao carregar Diagramas')
            // console.log(this.application)
          })
          .catch( response => {
            this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Aplicação')
            this.$router.push({ name: 'app_list' })

          })

      //this.getDiagramas()
          /*.catch( (response)=>{
            console.log(response)
            if(response.response.status !== 403)
              this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Diagramas')

          })*/
    }

  }

}
</script>