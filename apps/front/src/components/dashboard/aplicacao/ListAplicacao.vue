<template>
  <div class="col-md-12 col-lg-12 col-xl-4"  v-if="application && application.name.toLowerCase().includes( applicationSearch.toLowerCase() )">
    <router-link :to="{ name: 'app_edit', params: { id: application.id } }" >
      <div class="card mb-6 mb-xl-9">
        <div class="card-body" >

          <div class="mb-2 fs-4 fw-bold mb-1 text-gray-900 ">

              {{ application.name.substring(0,40) + ( (application.name.length > 40) ? ".." : "" ) }}


          </div>

          <div class="fs-6 fw-semibold text-gray-600 mb-5" style="min-height: 70px;">
            {{ application.description.substring(0,70) + ( (application.description.length > 70) ? ".." : "" ) }}
          </div>



          <div class="d-flex flex-stack flex-wrapr">

            <div class="symbol-group symbol-hover my-1">
              <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                <img :src="URI_BASE_API + application.framework.logo.url.reference">
              </div>

              <div class="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-kt-initialized="1">
                <img :src="URI_BASE_API + application.framework.programmingLanguage.logo.url.reference">
              </div>
            </div>

            <div class="d-flex my-1">
              <div class="border border-dashed border-gray-300 rounded py-2 px-3">
                Diagrama:
                <span class="svg-icon svg-icon-3">
                  {{ application.diagram.name.substring(0,20) + ( (application.diagram.name.length > 20) ? ".." : "" ) }}
                  </span>
              </div>

            </div>

          </div>




        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import $ from "jquery";
import {mapActions} from "vuex";
import ModalEditarDiagrama from "../modal/ModalEditarDiagrama.vue";
import {URI_BASE_API} from "../../../configs/api";



export default {
  components: {  },
  props: [ 'application', 'applicationSearch' ],
  name: 'ListApplication',
  data() {
    return {
      data: null,
      URI_BASE_API: URI_BASE_API,
    }
  },
  methods:{
    ...mapActions([
      'getDiagramas',
      'createDiagrama',
      'removeDiagrama'
    ]),


  }
}
</script>
