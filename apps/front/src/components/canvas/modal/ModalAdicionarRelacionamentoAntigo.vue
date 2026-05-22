<template>

  <Modal ref="modal" id="modalAdicionarRelacionamento">

    <template v-slot:title>
      Adicionar Relacionamento
    </template>

    <template v-slot:body >

      <div class="row" >

      <div class="col-4">
        <div>
          <InfoInput v-if="class1 && class1.owner" ico="fa-solid fa-fingerprint" title="Este é o lado proprietário do relacionamento!" content="Este é o lado proprietário do relacionamento!"/>
          <label>Classe 1</label>
          <v-select placeholder="Escolha a Classe"
                    class="vue-select"
                    :clearable="false"
                    :options="optionsSelectClass1"
                    v-model="class1"
                    @option:selected="changeSelect"
                    :selectable="(option) => !option.label.includes('Escolha a Classe')"
          />
        </div>
      </div>

      <div class="col-4">
        <div>
          <label for="selectType" >Tipo do Relacionamento</label>
          <v-select placeholder="Escolha o Relacionamento"
                    class="vue-select"
                    :clearable="false"
                    :options="optionsRelationship"
                    v-model="relationship"
                    @option:selected="changeSelect"
                    :selectable="(option) => (option.code !== null)"
          />
        </div>
      </div>

      <div class="col-4">
        <div>
          <InfoInput v-if="class2 && class2.owner" ico="fa-solid fa-fingerprint" title="Este é o lado proprietário do relacionamento!" content="Este é o lado proprietário do relacionamento!"/>
          <label>Classe 2</label>
          <v-select placeholder="Escolha a Classe"
                    class="vue-select"
                    :clearable="false"
                    :options="optionsSelectClass2"
                    v-model="class2"
                    @option:selected="changeSelect"
                    :selectable="(option) => !option.label.includes('Escolha a Classe')"
          />
        </div>
      </div>

      <div class="col-12" style="margin-top: 1px;">
      </div>









      <!--      <div class="col-md-4" style="margin-top: 10px;">
                <label class="form-label">Relationship Name</label>
                <input name="" class="form-control" >
            </div>-->


        <div class="col-md-12" style="margin-top: 10px;"  v-if="class1 && class2 && relationship">
          <label class="form-label">Campo a ser exibido ao realizar relacionamento</label>
          <div>
            <v-select placeholder="Escolha"
                      class="vue-select"
                      :clearable="false"
                      :options="optionsClass1ForeignKeyPK"
                      v-model="class1LabelFk"
            />
          </div>
        </div>



      <div class="col-md-12" style="margin-top: 10px;"  v-if="class1 && class2 && relationship && relationship.code === 'many-to-many'">
        <label class="form-label">Nome da Tabela Associativa</label>
        <input v-model="associativeTableName" class="form-control" >
      </div>


      <div class="col-md-6" style="margin-top: 10px;"  v-if="class1 && class2 && relationship">
        <label class="form-label">Chave Primaria: {{ class1.label }}</label>
        <div>
          <v-select placeholder="Escolha"
                    class="vue-select"
                    :clearable="false"
                    :options="optionsClass1ForeignKeyPK"
                    v-model="class1ForeignKeyPK"
                    :selectable="(option) => (option.obj && option.obj.primaryKey === true)"
          />
        </div>
      </div>

      <div class="col-md-6" style="margin-top: 10px;"  v-if="class1 && class2 && relationship">
        <label class="form-label">Nome da chave Estrangeira</label>
        <input v-model="class1ForeignKeyName" class="form-control" >
      </div>



      <div class="col-md-6" style="margin-top: 10px;"  v-if="class1 && class2 && relationship && relationship.code === 'many-to-many'">
        <label class="form-label">Chave Primaria: {{ class2.label }}</label>
        <div>
          <v-select placeholder="Escolha"
                    class="vue-select"
                    :clearable="false"
                    :options="optionsClass2ForeignKeyPK"
                    v-model="class2ForeignKeyPK"
                    :selectable="(option) => (option.obj && option.obj.primaryKey === true)"
          />
        </div>
      </div>

      <div class="col-md-6" style="margin-top: 10px;"  v-if="class1 && class2 && relationship && relationship.code === 'many-to-many'">
        <label class="form-label">Nome da chave Estrangeira</label>
        <input v-model="class2ForeignKeyName" class="form-control" >
      </div>



      </div>
    </template>


    <template v-slot:footer >


      <button @click="createRelationship" type="button" class="btn btn-primary" style="background-color: rgb(3, 83, 171); margin-top: 20px;">
        Criar Relacionamento
      </button>

    </template>

  </Modal>

</template>

<script>


import Modal from "../../global/Modal.vue";
import Relationship from "../../../models/schema/Relationship";
import Attribute from "../../../models/schema/Attribute";
import {functions} from "../../../functions/import";
import InfoInput from "../../global/InfoInput.vue";
import jQuery from "jquery";
import $ from "jquery";
import Class from "../../../models/schema/Class";

export default {
  name: 'ModalAdicionarRelacionamentoAntigo',

  components: {InfoInput, Modal },

  props: [ 'diagrama', ],

  data(){
    return {
      class1: null,
      class2: null,
      relationship: null,

      associativeTableName: null,

      class1ForeignKeyPK: null,
      class1ForeignKeyName: null,
      optionsClass1ForeignKeyPK: [],
      class1LabelFk: null,


      class2ForeignKeyPK: null,
      class2ForeignKeyName: null,
      optionsClass2ForeignKeyPK: [],


      optionsSelectClass1: [],
      optionsSelectClass2: [],

      optionsRelationship: []/*[
        //{ label: 'Many-To-One', code: 'Many-To-One'},
        // { label: 'One-To-One', code: 'one-to-one'},
        // { label: 'One-To-Many', code: 'one-to-many'},
        // { label: 'Many-To-Many', code: 'many-to-many'},
        // { label: 'Um-para-Um', code: 'one-to-one'},
        // { label: 'Um-para-Muitos', code: 'one-to-many'},
        // { label: 'Muitos-para-Muitos', code: 'many-to-many'},
      ]*/,
    }
  },

  watch: {
    class1(){
      this.changeRelationship()
      this.updateOptionsRelationShip();
    },
    class2(){
      this.changeRelationship()
    },
    relationship(){
      this.changeRelationship()
    },
    class1ForeignKeyPK(){
      if(!this.class1ForeignKeyPK)
        return

      this.class1ForeignKeyName = this.$functions.string_validation.UpperCaseToScoreAndLower(this.class1.label) + '_' + this.class1ForeignKeyPK.label
    },
    class1ForeignKeyName(val){
      if(!this.class1ForeignKeyName)
        return

      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = val.toLowerCase();
      val = this.$functions.string_validation.changeSpaceTo(val, '_')

      this.class1ForeignKeyName = val
    },
    class2ForeignKeyPK(){
      if(!this.class2ForeignKeyPK)
        return

      this.class2ForeignKeyName = this.$functions.string_validation.UpperCaseToScoreAndLower(this.class2.label) + '_' + this.class2ForeignKeyPK.label
    },
    class2ForeignKeyName(val){
      if(!this.class2ForeignKeyName)
        return

      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = val.toLowerCase();
      val = this.$functions.string_validation.changeSpaceTo(val, '_')

      this.class2ForeignKeyName = val
    },

    associativeTableName(val){
      if(!this.associativeTableName)
        return

      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = val.toLowerCase();
      val = this.$functions.string_validation.changeSpaceTo(val, '_')

      this.associativeTableName = val
    }


  },
  methods:{
    show(){
      this.$refs.modal.show()
      this.optionsSelectClass1 = this.updateOpcoesClassesSelect1()
      this.optionsSelectClass2 = this.updateOpcoesClassesSelect2()
    },
    close(){
      this.$refs.modal.close()
    },
    createRelationship(){


      if(!this.class1 || !this.class2 || !this.relationship ){
        this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
        return
      }

      switch (this.relationship.code) {
        case 'one-to-one':

          if(!this.class1ForeignKeyPK || !this.class1ForeignKeyName ){
            this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
            return
          }

          this.createOneToOne(this.class1.obj, this.class2.obj)

          break;
        case 'one-to-many':

          if(!this.class1ForeignKeyPK || !this.class1ForeignKeyName ){
            this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
            return
          }
          this.createOneToMany(this.class1.obj, this.class2.obj)

          break;
        case 'many-to-many':
          if(!this.class1ForeignKeyPK || !this.class1ForeignKeyName || !this.class2ForeignKeyPK || !this.class2ForeignKeyName ){
            this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
            return
          }

          this.createManyToMany(this.class1.obj, this.class2.obj)

          break;
        default:
          //console.log('');
      }


      this.diagrama[0].updateDiagram()

      this.resetModalRelationship()
      this.close()
    },
    /**
     * ADICIONA RELACIONAMENTO UM PARA UM
     * @param fromClass
     * @param toClass
     */
    createOneToOne(fromClass, toClass){

      let foreignKey = new Attribute(this.class1ForeignKeyName, this.class1ForeignKeyName, 'integer',  false, true)
      foreignKey.setIco()

      this.diagrama[0].addAttribute(toClass, foreignKey)

       //this.class1LabelFk

      let relation = new Relationship(fromClass.key, toClass.key,'one-to-one', foreignKey.key, this.class1LabelFk.obj.key)
      //console.log(relation)

      this.diagrama[0].addRelationship(relation)

      // console.log(this.diagrama[0].models)
      // console.log(this.diagrama[0].linksModels)
      // console.log(this.diagrama[0].diagram.model.nodeDataArray)
      // console.log(this.diagrama[0].diagram.model.linkDataArray)
    },
    /**
     * ADICIONA RELACIONAMENTO UM PARA MUITOS
     * @param fromClass
     * @param toClass
     */
    createOneToMany(fromClass, toClass){

      let foreignKey = new Attribute(this.class1ForeignKeyName, this.class1ForeignKeyName, 'integer',  false, true)
      foreignKey.setIco()
      toClass.attributes.push(foreignKey)

      let relation = new Relationship(fromClass.key, toClass.key,'one-to-many', foreignKey.key)

      this.diagrama[0].addRelationship(relation)
    },
    /**
     * ADICIONA RELACIONAMENTO MUITOS PARA MUITOS
     * @param fromClass
     * @param toClass
     */
    createManyToMany(fromClass, toClass){

      let class1 = this.class1.obj
      let class2 = this.class2.obj

      /** Cria atributo/chave_estrangeira da classe 1 */
      let foreignKeyClass1 = new Attribute(this.class1ForeignKeyName, this.class1ForeignKeyName, 'integer',  false, true)
      foreignKeyClass1.setIco()

      /** Cria atributo/chave_estrangeira da classe 2 */
      let foreignKeyClass2 = new Attribute(this.class2ForeignKeyName, this.class2ForeignKeyName, 'integer',  false, true)
      foreignKeyClass2.setIco()

      /** Cria Classe/tabela associativa */
      let associativeClass = new Class(this.associativeTableName, this.associativeTableName,'', [foreignKeyClass1,foreignKeyClass2] );
      associativeClass.associativeModel = true

      /** Adiciona as chaves estrangeiras na tabela associativa */
      //associativeModel.attributes.push()
      //associativeModel.attributes.push(foreignKeyClass2)

      /** Crias os relacionamentos entre a classe 1 e a classe 2 com a classe/tabela associativa */
      let relationClass1 = new Relationship(class1.key, associativeClass.key,'many-to-many')
      let relationClass2 = new Relationship(class2.key, associativeClass.key,'many-to-many')


      /** Adiciona a Classe/tabela associativa ao modelo */
      this.diagrama[0].addClass(associativeClass);


      /** Adiciona os relacionamentos ao modelo */
      this.diagrama[0].addRelationship(relationClass1)
      this.diagrama[0].addRelationship(relationClass2)

    },


    changeRelationship(){

      if(!this.class1 || !this.class2 || !this.relationship )
        return

      this.resetRelationshipInputs()


      switch (this.relationship.code) {
        case 'one-to-one':
          this.class1.owner = false;
          this.class2.owner = true;
          this.changeOptionsClass1ForeignKeyPK(this.class1.obj.attributes)

          break;
        case 'one-to-many':
          this.class1.owner = false;
          this.class2.owner = true;
          this.changeOptionsClass1ForeignKeyPK(this.class1.obj.attributes)

          break;
        case 'many-to-many':
          this.class1.owner = false;
          this.class2.owner = true;

          let class1 = this.class1.obj
          let class2 = this.class2.obj

          this.associativeTableName =  this.$functions.string_validation.UpperCaseToScoreAndLower(class1.className) +
              '_' + this.$functions.string_validation.UpperCaseToScoreAndLower(class2.className)

          this.changeOptionsClass1ForeignKeyPK(this.class1.obj.attributes)
          this.changeOptionsClass2ForeignKeyPK(this.class2.obj.attributes)

          break;
        default:
          //console.log('');
      }
    },


    resetModalRelationship(){
      this.class1 = null
      this.class2 = null
      this.relationship = null
      this.resetRelationshipInputs()
    },


    resetRelationshipInputs(){
      this.associativeTableName = null

      this.class1ForeignKeyPK = null
      this.class1ForeignKeyName = null
      this.optionsClass1ForeignKeyPK = []
      this.class1LabelFk = null

      this.class2ForeignKeyPK = null
      this.class2ForeignKeyName = null
      this.optionsClass2ForeignKeyPK = []

    },

    changeSelect(){
      this.$functions.string_validation.resetEventsFront()
    },

    changeOptionsClass1ForeignKeyPK(attributes){

      this.optionsClass1ForeignKeyPK = attributes.map( (value,index)=>{
        return { label: value.attributeName, code: value.key, obj: value, owner: false, }
      })
    },
    changeOptionsClass2ForeignKeyPK(attributes){

      this.optionsClass2ForeignKeyPK = attributes.map( (value,index)=>{
        return { label: value.attributeName, code: value.key, obj: value, owner: false, }
      })
    },




    /** Atualiza a lista de classe no select */
    updateOptionsRelationShip(){
      //console.log(this.class1)
      if(!this.class1)
        return []

      /** Se a classe selecionada for a media ou mediaGaleria*/
      if(this.class1.obj.key === "1" || this.class1.obj.key === "2"){
        this.optionsRelationship = [
          { label: 'Um-para-Muitos', code: 'one-to-many'},
        ]
      }else{
        this.optionsRelationship = [
          { label: 'Um-para-Um', code: 'one-to-one'},
          { label: 'Um-para-Muitos', code: 'one-to-many'},
          //{ label: 'Muitos-para-Um', code: 'many-to-one'},
          { label: 'Muitos-para-Muitos', code: 'many-to-many'},
        ]
      }
    },

    updateOpcoesClassesSelect1(){
      if(!this.diagrama[0].models)
        return

      return this.diagrama[0].models
          .filter((value,index)=>{ return !value.associativeModel; })
          .map( (value,index)=>{ return { label: value.className, code: value.id, obj: value, owner: false, }})
    },
    updateOpcoesClassesSelect2(){
      if(!this.diagrama[0].models)
        return

      return this.diagrama[0].models
          .filter((value,index)=>{ return !value.associativeModel; })
          .filter((value,index)=>{ return !value.systemModel; })
          .map( (value,index)=>{ return { label: value.className, code: value.id, obj: value, owner: false, }})
    },

  },
  computed: {

  },

}
</script>


<style>
.vue-select {
  border-radius: var(&#45;&#45;vs-border-radius);
  white-space: normal;
  background-color: white;
  color: black;
  height: 150px;
  width: 100%;
}
.vs__dropdown-toggle{
  height: 40px;
}
</style>


