<template>
  <div class="Section2" style="margin-top: 20px; color: white" >


      <div class="mb-3">

        <label class="form-label" style="color: white">Nome da Classe</label>
        <input class="form-control input" type="text" v-model="className" placeholder="Nome da Classe" >
        <div style="color: rgb(255,0,0)" v-if="classNameAvailable">
          <b>  Existem mais de uma classe com o mesmo nome!</b>
        </div>

      </div>


    <div class="row" align="left" style="">


<!--      <div class="custom-control custom-checkbox col-3">
          <input class="custom-control-input" type="checkbox" id="has-timestamp" @change="changeHasTimeStamp" v-model="classEdit.hasTimeStamp">
          <label for="has-timestamp" class="custom-control-label" style="margin-left: 5px;">Has TimeStamp</label>

      </div>-->

<!--      <div class="custom-control custom-checkbox col-5 text-left">
            <input class="custom-control-input" type="checkbox" id="use-soft-delete" @change="changeUsesSoftDeletes" v-model="classEdit.usesSoftDeletes">
            <label for="use-soft-delete" class="custom-control-label" style="float: start; text-align: left;">Uses Soft-Deletes</label>
      </div>-->

      <div class="mb-3 col-12 text-right" style="float: right; margin-top: 5px;">

        <a class="nav-link active text-white " aria-current="page" href="javascript:void(0)" @click="changeDivDisplay('other-options')" style="margin-top: -8px; text-align: right;">
          <b style="margin-right: 5px;">Mais Opções</b>
          <i class="ico-other-option fas fa-chevron-down" style="color: white"></i>
        </a>

      </div>

    </div>


    <div class="other-options" style="display: none;">

      <div class="row">

        <div class="mb-3 col-12">
          <label class="form-label"  style="color: white">Nomes da Tabela</label>
          <input type="text" v-model="tableName" class="form-control input" placeholder="Nome da Tabela">
          <div style="color: rgb(255,0,0)" v-if="tableNameAvailable">
            <b>  Existem mais de uma tabela com o mesmo nome!</b>
          </div>
        </div>

        <div class="col-12">
          <label class="form-label"  style="color: white">Atributo de Pesquisa</label>
          <v-select placeholder="" :clearable="false" :options="selectFieldSearch" v-model="fieldSearch" class="vue-select pov"
                    multiple
                    :selectable="() => fieldSearch.length < 2"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Atributo utilizado para consulta visual"
          />
        </div>


        <div class="col-12" style="margin-top: 10px;">
          <label class="form-label"  style="color: white">Descrição</label>
          <textarea class="form-control" v-model="description" placeholder="Descrição" style="height: 100px;">
          </textarea>
        </div>

      </div>

      <hr>

    </div>

  </div>
</template>

<script>
import $ from "jquery";
import {string_validation} from "../../../../functions/string_validation";

export default {
  name: 'Section2',
  props: [
    'classEdit',
    'diagrama',
  ],
  data(){
    return {
      className: this.classEdit.className,
      tableName: this.classEdit.tableName,
      description: this.classEdit.description,
      fieldSearch: this.filterFieldSearch(),
    }
  },
  watch: {
    fieldSearch(val) {
      let attributesSearch = []
      val.forEach( (element) => {
        attributesSearch.push(element.code)
      })
      this.diagrama[0].updateAttributeSearch(attributesSearch, this.classEdit.key)
    },
    className(val) {
      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.capitalize( val )
      val = this.$functions.string_validation.removeSpace( val )

      this.className = val
      //this.tableName = this.$functions.string_validation.capitalizeLetterToUnderline( val ).toLowerCase()

      if( !this.diagrama[0].classNameAvailable(this.className, this.classEdit) )
        this.$functions.alerts.notification('error', `Já existe uma classe chamada ${this.className}`)

      this.classEdit.className = this.className
      this.diagrama[0].updateDiagram()

      this.tableName = this.$functions.string_validation.ucwords( this.className )
      this.classEdit.tableName = this.tableName

    },
    tableName(val){
      val = this.$functions.string_validation.capitalizeLetterToUnderline( val )
      val = this.$functions.string_validation.removeSpace(val).toLowerCase()
      this.tableName = val

      if( !this.diagrama[0].tableNameAvailable(this.tableName, this.classEdit) )
        this.$functions.alerts.notification('error', `Já existe uma tabela chamada ${this.tableName}`)

      this.classEdit.tableName = this.tableName
      this.diagrama[0].updateDiagram()

    },
    description(val){

      this.description = val
      this.classEdit.description = this.description
      this.diagrama[0].updateDiagram()
    }

  },
  methods: {
    changeDivDisplay(divChange){
      divChange = $('.'+divChange);

      if( divChange.css('display') === 'block'){
        $('.ico-other-option').prop('class','ico-other-option fas fa-chevron-down')
        divChange.css("display", "none");
      }else{
        $('.ico-other-option').prop('class','ico-other-option fas fa-chevron-up')
        divChange.css("display", "block");
      }
    },
    filterFieldSearch(){
      let data = this.classEdit.attributes
          .filter((value,index)=>{ return !value.primaryKey; })
          .filter((value,index)=>{ return !value.foreingKey; })
          .filter((value,index)=>{ return value.attributeSearch; })
          .map( (value,index)=>{ return { label: value.attributeName, code: value.key }})
      return data;
    },
  },
  computed: {
    classNameAvailable(){
      return !this.diagrama[0].classNameAvailable(this.className, this.classEdit);
    },
    tableNameAvailable(){
      return !this.diagrama[0].tableNameAvailable(this.tableName, this.classEdit);
    },
    selectFieldSearch(){
      return this.classEdit.attributes
          .filter((value,index)=>{ return !value.primaryKey; })
          .filter((value,index)=>{ return !value.foreingKey; })
          .map( (value,index)=>{ return { label: value.attributeName, code: value.key }})
    }

  },
  updated() {
    this.className = this.classEdit.className
    this.tableName = this.classEdit.tableName
    this.description = this.classEdit.description
    //this.fieldSearch = this.filterFieldSearch()
  }
}
</script>

<style scoped>
.input{
  height: 40px;
}
/*.vue-select {
  border-radius: var(&#45;&#45;vs-border-radius);
  white-space: normal;
  background-color: white;
  color: black;
  height: 150px;
  width: 100%;
}*/

.vue-select {
  border-radius: 3px;
  white-space: normal;
  background-color: white;
  color: black;
  height: 40px;
  width: 100%;
}
</style>