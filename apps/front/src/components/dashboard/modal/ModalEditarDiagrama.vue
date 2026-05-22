<template>
  <ModalFullScreen ref="modal" id="modal_editar_diagrama">

    <template v-slot:title>
      Editar Diagrama
    </template>

    <template v-slot:titleDescription>
      Atualize as informações do diagrama e comece a modelar!
    </template>

    <template v-slot:body>
      <div class="stepper stepper-links d-flex flex-column" id="kt_create_account_stepper">

        <div class="stepper-nav py-5">
          <div class="stepper-item d-menu d-menu-2 current" data-kt-stepper-element="nav">
            <h3 class="stepper-title">Informações Gerais</h3>
          </div>
        </div>


        <div class="mx-auto mw-600px w-100 py-10">






          <div class="d-tab-2 d-tab current" data-kt-stepper-element="content">
            <div class="w-100">

              <div class="pb-10 pb-lg-15">
                <h2 class="fw-bold text-dark">Informações Gerais</h2>
                <div class="text-muted fw-semibold fs-6">Se precisar de mais informações, consulte a
                  <a href="javascript:void(0)" class="link-primary fw-bold">Página de Ajuda</a>.
                </div>
              </div>

              <div class="mb-10 fv-row">
                <label class="form-label mb-3">Nome do Diagrama <span style="color: red">*</span></label>
                <input v-model="nome" type="text" class="form-control form-control-lg form-control-solid" />
              </div>

              <div class="mb-10 fv-row">
                <label class="form-label mb-3">Descrição <span style="color: red">*</span></label>
                <textarea v-model="descricao" type="text" class="form-control form-control-lg form-control-solid" />
              </div>

              <div style=" margin-top: 40px;">

                <button @click="edit" type="button" class="btn btn-lg btn-primary " style="float: right;" >
                  Editar
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

export default {
  name: 'ModalEditarDiagrama',
  components: {ModalFullScreen},
  props: [ 'diagrama', ],
  data() {
    return {
      nome: '',
      descricao: '',
      tipoDiagrama: '',
    }
  },
  computed:{
    ...mapState({
      //diagramas: state => state.diagramaStore.items.diagramas
    })
  },
  methods: {
    ...mapActions([
      'getDiagramas',
      'updateDiagrama'
    ]),
    edit(){
      if(!this.nome || !this.descricao){
        this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
        return
      }

      this.$functions.alerts.notification('info', "Aguarde!", 'Atualizando Informações!')
      this.close()

      this.updateDiagrama({ id: this.diagrama.id, data: {name: this.nome, description: this.descricao} } )
          .then((response)=>{
            this.$functions.alerts.notification('success', "Sucesso", 'Diagrama Atualizado com successo!')
            this.getDiagramas().catch( response => this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Diagramas') )
            this.$router.push({ name: 'diagramas_list' })
            //this.resetModal()
          })
          .catch((response)=>{
            this.$functions.alerts.notification('error', "Erro", 'Não foi possivel cadastrar o diagrama no momento!')
          })
    },
    resetModal(){
      this.nome = ''
      this.descricao = ''
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
      this.changeTab(2)
    },
    close(){
      this.$refs.modal.close()
    },
  },
  mounted() {
    this.nome = this.diagrama.name
    this.descricao = this.diagrama.description
  }
}
</script>
