<template>

  <Modal ref="modal" id="modalAdicionarRelacionamento">

    <template v-slot:title>
      Adicionar Relacionamento
    </template>

    <template v-slot:body >

      <div class="row" >

        <div class="col-4">
          <div>
            <InfoInput ico="fa-solid fa-fingerprint" title="Este é o lado inverso do relacionamento!" content="Este é o lado inverso do relacionamento!"/>
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
            <InfoInput ico="fa-solid fa-fingerprint" title="Este é o lado proprietário do relacionamento!" content="Este é o lado proprietário do relacionamento!"/>
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


        <div class="col-12" style="margin-top: 20px;" v-if="class1 && class2">
          <div>
            <label>Tipo de Associação</label>
            <v-select placeholder="Escolha o tipo de Associação"
                      class="vue-select"
                      :clearable="false"
                      :options="typeAssociationOptions"
                      v-model="typeAssociation"
                      @option:selected="changeSelect"
                      :selectable="(option) => !option.label.includes('Escolha o tipo de Associação')"
            />
          </div>
        </div>

        <div class="col-12" style="margin-top: 20px;"></div>

        <!-- ################################################################################################# -->
        <!-- ################################################################################################# -->
        <div class="row" v-if="class1 && class2 && relationship && typeAssociation">



          <!-- ################################################################################################# -->
          <!-- ##### LADO INVERSO DO RELACIONAMENTO -->
          <div class="col-6" style="" v-if="typeAssociation.code === 'bidirectional' || typeAssociation.code === 'unidirectional'">
            <div class="row">



              <div class="col-12 text-center" style="margin-top: 10px;">
                <h4>Classe {{ class1.obj.className }}</h4>
                <span style="color: black;"> Este é o lado <b>inverso</b> do relacionamento </span>
              </div>


              <div class="col-md-12" style="margin-top: 20px;" v-bind:style="[ (typeAssociation.code === 'unidirectional') ? 'visibility:hidden' : '']" >

                <InfoInput ico="fa-solid fa-circle-info" title="Atributo responsável pelo mapeamento do relacionamento" />

                <label class="form-label">Nome do Atributo</label>
                <input class="form-control" v-model="attributeInverseSide">
              </div>


              <div class="col-md-12" v-if="relationship.code === 'many-to-many'" style="margin-top: 20px;">
                <InfoInput ico="fa-solid fa-circle-info" :title="'Chave estrangeira da classe' + class1.obj.className" />

                <label class="form-label">Chave Estrangeira {{ class1.obj.className }}</label>
                <input class="form-control" v-model="foreignKeyInverseSide" >
              </div>




  <!--            <div class="col-md-12" style="margin-top: 20px;"  >
                <InfoInput ico="fa-solid fa-circle-info" title="Atributo que será exibido no formulário para escolha do relacionamento!" />

                <label class="form-label">Atributo do {{ class2.obj.className }} a ser exibido.</label>
                <div>
                  <v-select placeholder="Escolha"
                            class="vue-select"
                            :clearable="false"
                            :options="optionsClass1ForeignKeyPK"
                            v-model="class1LabelFk"
                  />
                </div>
              </div>-->


            </div>
          </div>
          <!-- ##### FIM LADO INVERSO DO RELACIONAMENTO -->
          <!-- ################################################################################################# -->





          <!-- ################################################################################################# -->
          <!-- ##### LADO PROPRIETARIO DO RELACIONAMENTO -->
          <div v-bind:class="[ (typeAssociation.code === 'bidirectional' || typeAssociation.code === 'unidirectional') ? 'col-6' : 'col-12']" style="" v-if="class1 && class2 && relationship && typeAssociation">
            <div class="row">


              <div class="col-12 text-center"   style="margin-top: 10px;">
                <h4>Classe {{ class2.obj.className }}</h4>
                <span style="color: black;"> Este é o lado <b>proprietário</b> do relacionamento </span>
              </div>


              <div class="col-md-12" style="margin-top: 20px;">
                <InfoInput ico="fa-solid fa-circle-info" title="Atributo responsável pelo mapeamento do relacionamento" />

                <label class="form-label">Nome do Atributo</label>
                <input class="form-control" v-model="attributeOwningSide" >
              </div>


              <div class="col-md-12" v-if="relationship.code === 'many-to-many'" style="margin-top: 20px;">
                <InfoInput ico="fa-solid fa-circle-info" :title="'Chave estrangeira da classe ' + class2.obj.className" />

                <label class="form-label">Chave Estrangeira {{ class2.obj.className }}</label>
                <input class="form-control" v-model="foreignKeyOwningSide" >
              </div>


  <!--            <div class="col-md-12" style="margin-top: 20px;"  >
                <InfoInput ico="fa-solid fa-circle-info" title="Atributo que será exibido no formulário para escolha do relacionamento!" />

                <label class="form-label">Atributo do {{ class2.obj.className }} a ser exibido.</label>
                <div>
                  <v-select placeholder="Escolha"
                            class="vue-select"
                            :clearable="false"
                            :options="optionsClass1ForeignKeyPK"
                            v-model="class1LabelFk"
                  />
                </div>
              </div>-->


            </div>
          </div>
          <!-- ##### FIM LADO PROPRIETARIO DO RELACIONAMENTO -->
          <!-- ################################################################################################# -->



          <div class="col-12" v-if="relationship.code === 'many-to-many'" style="margin-top: 20px;">
            <div class="row">

              <div class="col-md-12" >
                <InfoInput ico="fa-solid fa-circle-info" title="Nome da tabela associativa que será gerada entre as classes" />

                <label class="form-label">Nome da Tabela Associativa</label>
                <input class="form-control" v-model="associativeTableName">
              </div>

            </div>

          </div>
        </div>
        <!-- ################################################################################################# -->
        <!-- ################################################################################################# -->





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
  name: 'ModalAdicionarRelacionamento',

  components: {InfoInput, Modal },

  props: [ 'diagrama', ],

  data(){
    return {
      class1: null,
      class2: null,
      relationship: null,
      typeAssociation: null,
      associativeTableName: null,


      attributeOwningSide: null,
      attributeInverseSide: null,


      foreignKeyOwningSide: null,
      foreignKeyInverseSide: null,



      class1ForeignKeyPK: null,
      class1ForeignKeyName: null,
      optionsClass1ForeignKeyPK: [],
      class1LabelFk: null,


      class2ForeignKeyPK: null,
      class2ForeignKeyName: null,
      optionsClass2ForeignKeyPK: [],



      optionsSelectClass1: [],
      optionsSelectClass2: [],
      optionsRelationship: [
        { label: 'Um-para-Um', code: 'one-to-one'},
        { label: 'Um-para-Muitos', code: 'one-to-many'},
        { label: 'Muitos-para-Muitos', code: 'many-to-many'},
      ],
    }
  },

  watch: {
    class1(){

      //if(this.class1.obj.key === "1" || this.class1.obj.key === "2")
        //this.relationship = "one-to-many"

      this.changeRelationship()
      this.updateOptionsRelationShip();
    },
    class2(){
      this.changeRelationship()
    },
    relationship(){
      this.changeRelationship()
    },
    attributeOwningSide(val){
      if(!val)
        return

      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.capitalize( val )
      val = this.$functions.string_validation.removeSpace( val )

      this.attributeOwningSide = val.charAt(0).toLowerCase() + val.slice(1);

    },
    attributeInverseSide(val){
      if(!val)
        return

      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.capitalize( val )
      val = this.$functions.string_validation.removeSpace( val )

      this.attributeInverseSide = val.charAt(0).toLowerCase() + val.slice(1);

    },
    foreignKeyOwningSide(val){
      if(!val)
        return

      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val )
      val = this.$functions.string_validation.removeSpace(val).toLowerCase()
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val ).toLowerCase()

      this.foreignKeyOwningSide = val
    },
    foreignKeyInverseSide(val){
      if(!val)
        return

      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val )
      val = this.$functions.string_validation.removeSpace(val).toLowerCase()
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val ).toLowerCase()


      this.foreignKeyInverseSide = val
    },
    associativeTableName(val){
      if(!this.associativeTableName)
        return

      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = val.toLowerCase();
      val = this.$functions.string_validation.changeSpaceTo(val, '_')

      this.associativeTableName = val
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
      let classInverseSide = this.class1.obj
      let classOwningSide = this.class2.obj

      if(!this.class1 || !this.class2 || !this.relationship  || !this.typeAssociation ){
        this.$functions.alerts.notification('error', 'Preencha os campos corretamente antes de continuar!')
        return
      }

      if(!this.attributeOwningSide){
        this.$functions.alerts.notification('error', 'Informe o nome do atributo no lado proprietário antes de continuar!')
        return;
      }

      if( !this.diagrama[0].attributeNameAvailableByName(this.attributeOwningSide, classOwningSide) ){
        this.$functions.alerts.notification('error', `Já existe um atributo chamado ${this.attributeOwningSide} na classe ${classOwningSide.className}`)
        return
      }

      if(this.typeAssociation.code === 'bidirectional'){

        if(!this.attributeInverseSide){
          this.$functions.alerts.notification('error', 'Informe o nome do atributo no lado inverso antes de continuar!')
          return;
        }

        if( !this.diagrama[0].attributeNameAvailableByName(this.attributeInverseSide, classInverseSide) ){
          this.$functions.alerts.notification('error', `Já existe um atributo chamado ${this.attributeInverseSide} na classe ${classInverseSide.className}`)
          return
        }

      }


      switch (this.relationship.code) {
        case 'one-to-one':

          //alert('criando um para um')
          this.createOneToOne()

          break;
        case 'one-to-many':

          //alert('criando um para muitos')
          this.createOneToMany(this.class1.obj, this.class2.obj)

          break;
        case 'many-to-many':

          if(!this.associativeTableName){
            this.$functions.alerts.notification('error', 'Informe o nome da tabela associativa antes de continuar!')
            return;
          }

          //alert('criando muitos para muitos')
          this.createManyToMany()

          break;
        default:
          return;
      }

      this.diagrama[0].updateDiagram()
      //this.diagrama[0].updateDiagram()
      this.resetModalRelationship()
      this.close()

    },
    /** ADICIONA RELACIONAMENTO UM PARA UM */
    createOneToOne(){
      let classInverseSide = this.class1.obj
      let classOwningSide = this.class2.obj

      /** Atributo para o lado proprietario*/
      let attributeOwningSide = new Attribute(this.attributeOwningSide, '', 'integer',  false, true, "owningSide")
      attributeOwningSide.nullable = true
      this.diagrama[0].addAttribute(classOwningSide, attributeOwningSide)

      if(this.typeAssociation.code === 'self-referencing' || this.typeAssociation.code === 'unidirectional'){

        let relation = new Relationship(classInverseSide.key, classOwningSide.key, 'one-to-one', this.typeAssociation.code, attributeOwningSide.key)
        this.diagrama[0].addRelationship(relation)

      }

      if(this.typeAssociation.code === "bidirectional"){

        let attributeInverseSide = new Attribute(this.attributeInverseSide, '', 'integer',  false, true, "inverseSide")
        attributeInverseSide.nullable = true
        this.diagrama[0].addAttribute(classInverseSide, attributeInverseSide)

        let relation = new Relationship(classInverseSide.key, classOwningSide.key, 'one-to-one', this.typeAssociation.code, attributeOwningSide.key, attributeInverseSide.key)
        this.diagrama[0].addRelationship(relation)

      }
      // attributeOwningSide.typeForeingKey = "owningSide"
      // attributeInverseSide.typeForeingKey = "inverseSide"

      // console.log(this.diagrama[0].models)
      // console.log(this.diagrama[0].linksModels)
      //console.log(this.diagrama[0].diagram.model.nodeDataArray)
      //console.log(this.diagrama[0].diagram.model.linkDataArray)


    },
    /** ADICIONA RELACIONAMENTO UM PARA MUITOS */
    createOneToMany(){
      let classInverseSide = this.class1.obj
      let classOwningSide = this.class2.obj

      /** Atributo para o lado proprietario*/
      let attributeOwningSide = new Attribute(this.attributeOwningSide, '', 'integer',  false, true, "owningSide")
      attributeOwningSide.setIco()
      attributeOwningSide.nullable = true
      this.diagrama[0].addAttribute(classOwningSide, attributeOwningSide)

      if(this.typeAssociation.code === 'self-referencing' || this.typeAssociation.code === 'unidirectional'){

        let relation = new Relationship(classInverseSide.key, classOwningSide.key, 'one-to-many', this.typeAssociation.code, attributeOwningSide.key)
        this.diagrama[0].addRelationship(relation)

      }

      if(this.typeAssociation.code === "bidirectional"){

        let attributeInverseSide = new Attribute(this.attributeInverseSide, '', 'integer',  false, true, "inverseSide")
        //attributeInverseSide.setIco()
        attributeInverseSide.nullable = true
        this.diagrama[0].addAttribute(classInverseSide, attributeInverseSide)

        let relation = new Relationship(classInverseSide.key, classOwningSide.key, 'one-to-many', this.typeAssociation.code, attributeOwningSide.key, attributeInverseSide.key)
        this.diagrama[0].addRelationship(relation)

      }

    },
    /** ADICIONA RELACIONAMENTO MUITOS PARA MUITOS */
    createManyToMany(){
      let classInverseSide = this.class1.obj
      let classOwningSide = this.class2.obj

      /** ######################################################### */
      /** ####### Criação da Tabela Associativa e Atributos */

      /** Cria atributo/chave_estrangeira da classe 1 */
      let fkClassOwningSide = new Attribute(this.foreignKeyOwningSide, this.foreignKeyOwningSide, 'integer',  false, true)
      fkClassOwningSide.setIco()

      /** Cria atributo/chave_estrangeira da classe 2 */
      let fkClassInverseSide = new Attribute(this.foreignKeyInverseSide, this.foreignKeyInverseSide, 'integer',  false, true)
      fkClassInverseSide.setIco()

      /** Cria tabela associativa e Adiciona ao diagrama */
      let associativeClass = new Class(this.associativeTableName, this.associativeTableName,'', [fkClassInverseSide, fkClassOwningSide] );
      associativeClass.associativeModel = true
      associativeClass.location = classInverseSide.location
      this.diagrama[0].addClass(associativeClass);

      /** ######################################################### */


      /** Atributo para o lado proprietario*/
      let attributeOwningSide = new Attribute(this.attributeOwningSide, '', 'integer',  false, true, "owningSide")
      attributeOwningSide.setIco()
      attributeOwningSide.nullable = true
      this.diagrama[0].addAttribute(classOwningSide, attributeOwningSide)

      if(this.typeAssociation.code === 'self-referencing' || this.typeAssociation.code === 'unidirectional'){}

        let attributeInverseSide = null;

      if(this.typeAssociation.code === "bidirectional"){

        attributeInverseSide = new Attribute(this.attributeInverseSide, '', 'integer',  false, true, "inverseSide")
        attributeInverseSide.nullable = true
        attributeOwningSide.setIco()
        this.diagrama[0].addAttribute(classInverseSide, attributeInverseSide)
        attributeInverseSide = attributeInverseSide.key

      }

      /** Crias os relacionamentos entre a classe 1 e a classe 2 com a classe associativa */
      let relationOwningSide = new Relationship(classOwningSide.key, associativeClass.key,'many-to-many', this.typeAssociation.code, attributeOwningSide.key, fkClassOwningSide.key)
      let relationInverseSide = new Relationship(classInverseSide.key, associativeClass.key,'many-to-many', this.typeAssociation.code, attributeInverseSide, fkClassInverseSide.key )
      this.diagrama[0].addRelationship(relationOwningSide)
      this.diagrama[0].addRelationship(relationInverseSide)

    },
    formatFkName(val){
      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.removeSpace( val )
      val = this.$functions.string_validation.UpperCaseToScoreAndLower( val )
      return val + '_id'
    },

    changeRelationship(){

      if(!this.class1 || !this.class2 || !this.relationship )
        return

        if( this.class1.obj.key === "1" || this.class1.obj.key === "2" ){
          if( this.relationship === { label: 'Um-para-Muitos', code: 'one-to-many'} ){
             this.relationship = { label: 'Um-para-Muitos', code: 'one-to-many'}
          }
        }

      this.resetRelationshipInputs()

      let class1 = this.class1.obj
      let class2 = this.class2.obj

      switch (this.relationship.code) {
        case 'one-to-one':

          this.attributeOwningSide = class1.className
          this.attributeInverseSide = class2.className


          break;
        case 'one-to-many':
          this.attributeOwningSide = class1.className
          this.attributeInverseSide = class2.className + 's'


          break;
        case 'many-to-many':

          let primaryKeyOwningSide = this.diagrama[0].findPrimaryKeyInClass(class2.key)
          let primaryKeyInverseSide = this.diagrama[0].findPrimaryKeyInClass(class1.key)

          this.attributeOwningSide = class1.className
          this.foreignKeyOwningSide = class2.className + "_" + primaryKeyOwningSide.attributeName

          this.attributeInverseSide = class2.className + 's'
          this.foreignKeyInverseSide = class1.className + "_" + primaryKeyInverseSide.attributeName


          this.associativeTableName =  this.$functions.string_validation.UpperCaseToScoreAndLower(class1.className) +
              '_' + this.$functions.string_validation.UpperCaseToScoreAndLower(class2.className)

          break;
        default:
          //console.log('');
      }
    },

    resetRelationshipInputs(){
      this.attributeInverseSide = null
      this.attributeOwningSide = null
      this.associativeTableName = null
      this.foreignKeyOwningSide = null
      this.foreignKeyInverseSide = null
    },

    resetModalRelationship(){
      this.class1 = null
      this.class2 = null
      this.relationship = null
      this.resetRelationshipInputs()
    },

    changeSelect(){
      this.$functions.string_validation.resetEventsFront()
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
          .map( (value,index)=>{ return { label: value.className, code: value.id, obj: value }})
    },
    updateOpcoesClassesSelect2(){
      if(!this.diagrama[0].models)
        return

      return this.diagrama[0].models
          .filter((value,index)=>{ return !value.associativeModel; })
          .filter((value,index)=>{ return !value.systemModel; })
          .map( (value,index)=>{ return { label: value.className, code: value.id, obj: value}})
    },

  },
  computed: {
    typeAssociationOptions() {
      this.typeAssociation = null

      if(!this.class1 || !this.class2)
        return

      if( this.class1.obj.key === this.class2.obj.key ){
        this.typeAssociation = { label: 'Auto Referencia', code: 'self-referencing'}

        return [
          { label: 'Auto Referencia', code: 'self-referencing'},
        ];
      }

      if( this.class1.obj.key === "1" || this.class1.obj.key === "2" ){
        this.typeAssociation = { label: 'Unidirecional', code: 'unidirectional'}

        return [
          { label: 'Unidirecional', code: 'unidirectional'},
        ];
      }

      this.typeAssociation = { label: 'Bidirecional', code: 'bidirectional'}

      return [
        { label: 'Bidirecional', code: 'bidirectional'},
        { label: 'Unidirecional', code: 'unidirectional'},
      ];
    }


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


