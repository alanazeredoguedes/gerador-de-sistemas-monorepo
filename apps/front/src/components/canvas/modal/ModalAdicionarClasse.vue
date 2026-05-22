<template>

  <Modal ref="modal" id="modalAdicionarClasse">

    <template v-slot:title>
      Adicionar Classe
    </template>

    <template v-slot:body>

      <div class="row">

        <div class="mb-7 col-6">
          <label>Nome da Classe</label>
          <input type="text" class="form-control" v-model="nome" placeholder="Nome da Classe" />
        </div>

        <div class="mb-7 col-6">
          <label>Nome da Tabela</label>
          <input type="text" class="form-control" v-model="tabela" placeholder="Nome da Tabela" />
        </div>

        <div class="col-12">
          <label>Anotações</label>
          <textarea class="form-control" placeholder="Descrição" v-model="descricao" style="height: 100px"></textarea>
        </div>

      </div>

    </template>


    <template v-slot:footer>

<!--      <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>-->
      <button type="button" class="btn btn-primary" @click="createModel" style="background-color: rgb(3,83,171);">Adicionar</button>

    </template>


  </Modal>

</template>


<script>

import Class from "../../../models/schema/Class";
import Attribute from "../../../models/schema/Attribute";


import Modal from "../../global/Modal.vue";
import diagrama from "../../../models/schema/Diagrama";


export default {
  name: 'ModalAdicionarClasse',
  components: { Modal },
  props: [ 'diagrama', ],
  data(){
    return {
      type: 'class',
      nome: '',
      tabela: '',
      descricao: '',
    }
  },
  watch: {
    nome(val){
      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.capitalize( val )
      val = this.$functions.string_validation.removeSpace( val )

      this.nome = val
      this.tabela = this.$functions.string_validation.capitalizeLetterToUnderline( val ).toLowerCase()
    },
    tabela(val){
      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = val.toLowerCase();
      val = this.$functions.string_validation.changeSpaceTo(val, '_')

      this.tabela = val
    },
    descricao(){

    },
  },
  methods:{
    show(){
      this.$refs.modal.show()
      //$(this.$el).modal('show')
    },
    close(){
      this.$refs.modal.close()
      //$(this.$el).modal('hide')
    },
    createModel(){
        if(!this.nome || !this.tabela){
          this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
          return
        }

        if(!this.diagrama[0].classNameAvailable(this.nome)){
          this.$functions.alerts.notification('error', `Já existe uma classe chamada ${this.nome}`)
          return
        }

      if(!this.diagrama[0].tableNameAvailable(this.tabela)){
        this.$functions.alerts.notification('error', `Já existe uma tabela chamada ${this.tabela}`)
        return
      }

      let classs = new Class(this.nome, this.tabela, this.descricao)
      this.diagrama[0].addClass(classs)

      let attribute = new Attribute('id','id','integer', true);
      attribute.autoGenerate = true
      this.diagrama[0].addAttribute(classs, attribute)

      this.nome = this.tabela = this.descricao = ''
      this.close()
    },




  },
  mounted() {
    //console.log(diagrama)
  }
}
</script>



