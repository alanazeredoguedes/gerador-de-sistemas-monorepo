<template>
  <div class="row" style="margin-bottom: 2px;">

    <!-- ###################################################################### -->
    <div class="col-1">
      <div class="row">

        <div class="col-6">
          <a class="handle" href="javascript:void(0)" style="color: white;">
            <Icon :name="'fas fa-arrows-alt'" :color="'white'" />
          </a>
        </div>

        <div class="col-6">
          <span v-if="atributo.primaryKey === true">
            <Icon :name="'fa-solid fa-key'" :size="'11px'" :color="'#e0bc32'" />
          </span>

          <span v-else-if="atributo.foreingKey === true">
            <Icon :name="'fas fa-key'" :size="'11px'" :color="'rgb(55, 232, 184)'" />
          </span>
        </div>

      </div>
    </div>
    <!-- ###################################################################### -->



    <!-- ###################################################################### -->
    <div class="col-6 input-group-sm">
      <input type="text" class="form-control input" v-model="fieldName" @change="changeAttributeName" placeholder="Nome do Atributo">
    </div>

    <div class="col-5">
      <v-select placeholder="Tipo" :clearable="false" :options="fieldsTypes" v-model="type" @option:selected="changeType" class="vue-select" />
    </div>
    <!-- ###################################################################### -->



    <!-- ###################################################################### -->
<!--    <div class="col-1">
      <div class="row">

        <div class="col-6">

          <a href="javascript:void(0)" @click="changeNullable" v-bind:style="{ color: (atributo.nullable === true ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.5)'), }">
            <b>N</b>
          </a>

        </div>

        <div class="col-6">
          <a href="javascript:void(0)" style="color: white; font-size: 15px;" @click="changeFieldOption">
            <i class="fa-solid fa-gear"></i>
          </a>
        </div>

      </div>

    </div>

    <div class="col-1 text-center">
      <a class="delete-field" href="javascript:void(0)" @click="removerAtributo" style="color: red; font-size: 15px;">
        <i class="fa-solid fa-trash-can" style="color: red"></i>
      </a>
    </div>-->
    <!-- ###################################################################### -->




    <!-- ###################################################################### -->
    <div class="field-options" :id="'field-options-'+atributo.key" style="margin-top: 20px; display: none;" >

      <div class="row" style="color: white; ">

        <div class="col-md-8" style="text-align: start;" >
          <div class="row" style="margin-left: 5px;">


            <div class="form-check form-check-custom form-check-solid  form-check-sm text-left col-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="nullable"
                    @change="changeNullable2"
                    :disabled="atributo.primaryKey === true"
                    :id="'nullable' + atributo.key"
                />
                <label class="form-check-label" :for="'nullable' + atributo.key">
                  Nulo
                </label>
            </div>


            <div class="form-check form-check-custom form-check-solid  form-check-sm text-left col-2">
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="atributo.unique"
                  :id="'unique' + atributo.key"
              />
              <label class="form-check-label" :for="'unique' + atributo.key">
                Unico
              </label>
            </div>

            <div class="form-check form-check-custom form-check-solid  form-check-sm text-left col-2">
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="atributo.index"
                  :id="'index' + atributo.key"
              />
              <label class="form-check-label" :for="'index' + atributo.key">
                Index
              </label>
            </div>


          </div>
        </div>

        <div class="col-md-4" style="text-align: right;">
          <span style="color: white; font-size: 12px;">
            Mais Opções
            <i class="fa-solid fa-gear"></i>
          </span>
        </div>



        <div class="col-md-12 input-group-sm" style="margin-top: 10px">
          <label class="form-check-label">Valor Padrão</label>
          <input type="text" class="form-control input" v-model="atributo.defaultValue" placeholder="Valor Padrão">
        </div>

        <div class="col-12 input-group-sm" style="margin-top: 10px;" v-bind:style="showSize">
          <label class="form-check-label">Tamanho</label>
          <input type="number" min="0"  class="form-control input"
                 v-model="atributo.size"
                 @change=""
                 placeholder="Tamanho">
        </div>

        <div class="col-6 input-group-sm" style="margin-top: 10px;" v-bind:style="showPrecisionScale">
          <label class="form-check-label">Precisão</label>
          <input type="number" min="0"  class="form-control input "
                 v-model="atributo.precision"
                 @change=""
                 placeholder="Precisão">
        </div>

        <div class="col-6 input-group-sm" style="margin-top: 10px;" v-bind:style="showPrecisionScale">
          <label class="form-check-label">Scala</label>
          <input type="number" min="0" class="form-control input"
                 v-model="atributo.scale"
                 @change=""
                 placeholder="Scala">
        </div>



        <div class="col-12" style="margin-top: 15px; margin-left: 10px">
          <div class="row">


            <div class="form-check form-check-custom form-check-solid form-check-sm text-left col-6" >
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="primaryKey"
                  :disabled="atributo.nullable === true || atributo.foreingKey === true || existPkInClass"
                  :id="'primaryKey' + atributo.key"
              />
              <label class="form-check-label" :for="'primaryKey' + atributo.key">
                Chave Primaria
              </label>
            </div>


            <div class="form-check form-check-custom form-check-solid form-check-sm text-left col-6" >
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="atributo.foreingKey"
                  @change="changeForeingKey"
                  :disabled="atributo.primaryKey === true"
                  :id="'foreingKey' + atributo.key"
              />
              <label class="form-check-label" :for="'foreingKey' + atributo.key">
                Chave Estrangeira
              </label>
            </div>



<!--
<div class="col-6">
<div class="custom-control custom-checkbox input-group-sm text-left" style="">
                <input class="custom-control-input" type="checkbox"
                       v-model="atributo.fk"
                       @change="changeFk"
                       :disabled="atributo.pk === true"
                       :id="'fk' + atributo.key">
                <label :for="'fk' + atributo.key" class="custom-control-label">Foreign Key</label>
              </div>

            </div>-->

          </div>
        </div>

      </div>
      <hr>
    </div>
    <!-- ###################################################################### -->




  </div>
</template>

<script>

import $ from "jquery";
import '../../../../assets/plugins/custom/jquery-ui/jquery-ui'
import Icon from "../../../global/icons/Icon.vue";

export default {
  name: 'TableField',
  components: {Icon  },
  props: [ 'index', 'atributo', 'classEdit', 'diagrama', ],
  data(){
    return {
      attributeName: this.atributo.attributeName,
      fieldName: this.atributo.fieldName,
      type: this.atributo.type,
      primaryKey: this.atributo.primaryKey,
      foreingKey: this.atributo.foreingKey,
      nullable: this.atributo.nullable,
      unique: this.atributo.unique,
      indexx: this.atributo.indexx,
      defaultValue: this.atributo.defaultValue,
      precision: this.atributo.precision,
      scale: this.atributo.scale,
      size: this.atributo.size,

      fieldsTypes: [
        // 'smallint',
        'integer',

      ],
    }
  },
  watch: {
    attributeName(val){
      this.attributeName = val
      this.atributo.attributeName = this.attributeName
      this.diagrama[0].updateDiagram()
    },
    fieldName(val){
      val = this.$functions.string_validation.normalizeStringExceptUnderscore( val )
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val )
      val = this.$functions.string_validation.removeSpace(val).toLowerCase()
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val ).toLowerCase()

      this.fieldName = val
      this.atributo.fieldName = val
      this.atributo.attributeName = val

      this.diagrama[0].updateDiagram();
    },
    type(){},
    primaryKey(val){
      this.primaryKey = val
      this.atributo.primaryKey = this.primaryKey
      this.atributo.setIco()
      this.diagrama[0].updateDiagram();
    },
    foreingKey(val){

    },
    nullable(){},
    unique(){},
    indexx(){},
    defaultValue(){},
    precision(){},
    scale(){},
    size(){},
  },
  type(val){
    this.type = val
    this.atributo.type = this.type
    this.diagrama[0].updateDiagram()
  },
  methods: {
    updateDiagramAtrribute(){
      //this.diagrama.diagram.model.updateTargetBindings(this.classEdit.attributes[this.index]);
    },
    changeAttributeName(){
      //this.diagrama.updateDiagram()
    },
    changeType(){
      this.atributo.type = this.type
      this.diagrama[0].updateDiagram()
    },
    changeNullable(){
      if(this.atributo.primaryKey === true){
        this.atributo.nullable = false;
        this.$functions.alerts.notification('error','Erro',`A <b>Chave Primaria</b> não pode ser nulo!`)
      }else{
        this.atributo.nullable = !this.nullable;
        this.diagrama[0].updateDiagram()
      }
    },
    changeNullable2(){
      if(this.atributo.primaryKey === true){
        this.atributo.nullable = false;
        this.$functions.alerts.notification('error','Erro',`A <b>Chave Primaria</b> não pode ser nulo!`)
      }else{
        this.atributo.nullable = this.nullable;
        this.diagrama[0].updateDiagram()
      }
    },
    changeForeingKey(){
      //this.atributo.foreingKey
      this.atributo.setIco()
      this.diagrama[0].updateDiagram()
    },
    removerAtributo(){
      this.$functions.alerts.notification('success','Sucesso',`<b>Atributo</b> removido com sucesso!`)
      this.diagrama[0].diagram.model.removeArrayItem(this.classEdit.attributes, this.index);
      this.diagrama[0].updateDiagram()
    },
    changeFieldOption(){

      let actualFieldOption = $(`#field-options-` + this.atributo.key);

      if(actualFieldOption.css('display') === 'none'){
        $('.field-options').css('display', 'none')
        actualFieldOption.css('display', 'block')
      }else{
        $('.field-options').css('display', 'none')
        //actualFieldOption.css('display', 'block')
      }
    },

  },
  computed: {
    showSize: function () {
      let typesShow = ['ascii_string', 'string'];
      return {
        display: ( typesShow.includes(this.atributo.type) ? 'block' : 'none' )
      }
    },
    showPrecisionScale: function () {
      let typesShow = ['decimal', 'double'];
      return {
        display: ( typesShow.includes(this.atributo.type) ? 'block' : 'none' )
      }
    },
    existPkInClass(){
      let atrributes = this.classEdit.attributes;

      for(let i=0; i < atrributes.length; i++){
        if(i !== this.index){
          if(atrributes[i].primaryKey === true){
            return true;
          }
        }
      }

    },


  },
  updated() {
    this.attributeName = this.atributo.attributeName
    this.fieldName = this.atributo.fieldName
    this.type = this.atributo.type
    this.primaryKey = this.atributo.primaryKey
    this.foreingKey = this.atributo.foreingKey
    this.nullable = this.atributo.nullable
    this.unique = this.atributo.unique
    this.indexx = this.atributo.index
    this.defaultValue = this.atributo.defaultValue
    this.precision = this.atributo.precision
    this.scale = this.atributo.scale
    this.size = this.atributo.size


    /** Inicializa o Jquery Sortable */
    $(".sortable").sortable({
      scroll: false,
      handle: ".handle",
      opacity: 0.7,
      scrollSensitivity: 2,
      scrollSpeed: 5,
    });

  }
}
</script>

<style scoped>
input[type="checkbox"]:disabled{
  background: rgba(255, 255, 255, 0.66);
}
.input{
  height: 35px;
}
</style>