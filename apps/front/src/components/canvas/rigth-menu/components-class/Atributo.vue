<template>
  <div class="row d-flex align-items-center" style="margin-bottom: 2px;" v-if="attributeExist">

    <!-- ###################################################################### -->
    <div class="col-1 ">
      <div class="row">

        <div class="col-6">
          <a class="handle" href="javascript:void(0)" style="color: white;">
            <Icon :name="'fas fa-arrows-alt'" :color="'white'" :size="'17px'"  />
          </a>
        </div>

        <div class="col-6">

          <span v-if="atributo.primaryKey === true">
            <Icon :name="'fa-solid fa-key'" :size="'13px'" :color="'#e0bc32'"
                  class="pov"
                  data-bs-toggle="popover"
                  data-bs-dismiss="true"
                  data-bs-placement="top"
                  data-bs-content="Chave Primaria"
            />
          </span>

          <span v-else-if="atributo.foreingKey === true && atributo.typeForeingKey === 'owningSide' ">
            <Icon :name="'fa-solid fa-fingerprint'" :size="'13px'" :color="'rgb(55, 232, 184)'"
                  class="pov"
                  data-bs-toggle="popover"
                  data-bs-dismiss="true"
                  data-bs-placement="top"
                  data-bs-content="Chave Estrangeira e lado proprietário do relacionamento"
            />
          </span>

          <span v-else-if="atributo.foreingKey === true && atributo.typeForeingKey === 'inverseSide' ">
            <Icon :name="'fas fa-key'" :size="'13px'" :color="'rgb(55, 232, 184)'"
                  class="pov"
                  data-bs-toggle="popover"
                  data-bs-dismiss="true"
                  data-bs-placement="top"
                  data-bs-content="Chave Estrangeira e lado inverso do relacionamento"
            />
          </span>

          <span v-else-if="atributo.foreingKey === true">
            <Icon :name="'fas fa-key'" :size="'13px'" :color="'rgb(55, 232, 184)'"
                  class="pov"
                  data-bs-toggle="popover"
                  data-bs-dismiss="true"
                  data-bs-placement="top"
                  data-bs-content="Chave Estrangeira"
            />
          </span>

          <span v-else-if="atributo.nullable === true"
                class="pov"
                data-bs-toggle="popover"
                data-bs-dismiss="true"
                data-bs-placement="top"
                data-bs-content="Atributo Nulo">
            <b style="">N</b>
          </span>

          <span v-else
                data-bs-toggle="popover"
                data-bs-dismiss="true"
                data-bs-placement="top"
                data-bs-content="Não Nulo">
            <b style="color: rgba(255,255,255,0.32);">N</b>
          </span>

        </div>

      </div>
    </div>
    <!-- ###################################################################### -->



    <!-- ###################################################################### -->
    <div class="col-5 input-group-sm">
      <input type="text" class="form-control input pov" v-model="attributeName" placeholder="Nome do Atributo"
             data-bs-toggle="popover"
             data-bs-placement="top"
             title="Nome do Atributo"
      >
    </div>


    <div class="col-4">
      <v-select placeholder="Tipo" :clearable="false" :options="fieldsTypes" v-model="type" @option:selected="changeType" class="vue-select pov"
                data-bs-toggle="popover"
                data-bs-placement="top"
                title="Tipo de dado"
      />
    </div>
    <!-- ###################################################################### -->



    <!-- ###################################################################### -->
    <div class="col-1">
      <div class="row d-flex align-items-center">

        <div class="col-6">
          <a href="javascript:void(0)" @click="changeNullable" v-bind:style="{ color: (atributo.nullable === true ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.5)'), }" >
            <b class="pov" style="font-size: 17px;"
               data-bs-toggle="popover"
               data-bs-placement="top"
               title="Atributo pode ser nulo?"
            >N</b>
          </a>
        </div>

        <div class="col-6">
          <a href="javascript:void(0)" style="color: white;" @click="changeFieldOption">
            <i class="fa-solid fa-gear pov" style="font-size: 16px"
               data-bs-toggle="popover"
               data-bs-placement="top"
               title="Mais Opções"
            ></i>
          </a>
        </div>

      </div>

    </div>

    <div class="col-1 text-center">
      <a class="delete-field" href="javascript:void(0)" @click="removerAtributo">
        <i class="fa-solid fa-trash-can" style="color: red; font-size: 16px"></i>
      </a>
    </div>

    <div class="col-1"></div>
    <div class="col-10" style="color: rgb(255,0,0); margin-bottom: 2px;" v-if="attributeNameAvailable">
      <b>Existem mais de um atributo com o mesmo nome!</b>
    </div>


    <!-- ###################################################################### -->


    <!-- ###################################################################### -->
    <div class="field-options" :id="'field-options-'+atributo.key" style="margin-top: 15px; display: none;" >
      <div class="row" style="color: white; ">


        <div class="col-12" style="margin-top: 10px; margin-left: 10px">
          <div class="row">

            <div v-if="!atributo.foreingKey &&( (existPkInClass && atributo.primaryKey) || !existPkInClass )" class="form-check form-check-custom form-check-solid form-check-sm text-left col-auto" >
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="primaryKey"
                  :id="'primaryKey' + atributo.key"
              />
<!--                           :disabled="atributo.nullable === true || atributo.foreingKey === true || existPkInClass"     -->
              <label class="form-check-label" :for="'primaryKey' + atributo.key">
                Chave Primaria
              </label>
            </div>


            <div v-if="atributo.primaryKey && !atributo.foreingKey &&( (existPkInClass && atributo.primaryKey) || !existPkInClass )" class="form-check form-check-custom form-check-solid  form-check-sm text-left col-auto">
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="atributo.autoGenerate"
                  :id="'autoGenerate' + atributo.key"
              />
              <label class="form-check-label" :for="'autoGenerate' + atributo.key">
                Geração Automatica
              </label>
            </div>

            <div class="form-check form-check-custom form-check-solid  form-check-sm text-left col-auto">
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="nullable"
                  @change="changeNullable"
                  :disabled="atributo.primaryKey === true"
                  :id="'nullable' + atributo.key"
              />
              <label class="form-check-label" :for="'nullable' + atributo.key">
                Nulo
              </label>
            </div>


            <div class="form-check form-check-custom form-check-solid  form-check-sm text-left col-auto">
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="atributo.unique"
                  :id="'unique' + atributo.key"
                  :disabled="atributo.primaryKey === true"
              />
              <label class="form-check-label" :for="'unique' + atributo.key">
                Unico
              </label>
            </div>

            <div class="form-check form-check-custom form-check-solid form-check-sm text-left col-auto" v-if="foreingKey">
              <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="foreingKey"
                  :disabled="true"
                  :id="'foreingKey' + atributo.key"
              />
              <label class="form-check-label" :for="'foreingKey' + atributo.key">
                Chave Estrangeira
              </label>
            </div>

          </div>
        </div>



<!--        <div class="col-12 input-group-sm" style="margin-top: 10px;" v-bind:style="showSize">
          <label class="form-check-label">Tamanho</label>
          <input type="number" min="0"  class="form-control input"
                 v-model="atributo.length"
                 @change=""
                 placeholder="Tamanho">
        </div>-->

        <div class="col-6 input-group-sm" style="margin-top: 10px;" v-bind:style="showSize">
          <label class="form-check-label">Tamanho Minimo</label>
          <input type="number" min="0"  class="form-control input"
                 v-model="atributo.lengthMin"
                 @change=""
                 placeholder="Tamanho Minimo">
        </div>

        <div class="col-6 input-group-sm" style="margin-top: 10px;" v-bind:style="showSize">
          <label class="form-check-label">Tamanho Máximo</label>
          <input type="number" min="0"  class="form-control input"
                 v-model="atributo.lengthMax"
                 @change=""
                 placeholder="Tamanho Máximo">
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

      </div>
      <hr style="margin-top: 20px;">
    </div>
    <!-- ###################################################################### -->




  </div>
</template>

<script>

import $ from "jquery";
import '../../../../assets/plugins/custom/jquery-ui/jquery-ui'
import Icon from "../../../global/icons/Icon.vue";



export default {
  name: 'Atributo',
  components: { Icon  },
  props: [ 'index', 'atributo', 'classEdit', 'diagrama', ],
  data(){
    return {
      attributeName: this.atributo.attributeName,
      type: this.atributo.type,
      primaryKey: this.atributo.primaryKey,
      foreingKey: this.atributo.foreingKey,
      nullable: this.atributo.nullable,
      unique: this.atributo.unique,
      precision: this.atributo.precision,
      scale: this.atributo.scale,
      length: this.atributo.length,
      min: this.atributo.lengthMin,
      max: this.atributo.lengthMax,
      attributeExist: true,
      fieldsTypes: [
          'string',
          'text',
          'integer',
          'smallint',
          'bigint',
          'decimal',
          'float',
          'boolean',
          'date',
          'datetime',
          'datetimetz',
          'time',
          'json',
          'array',
          'simple_array',
          'object',
      ],
    }
  },
  watch: {
    attributeName(val){
      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.capitalize( val )
      val = this.$functions.string_validation.removeSpace( val )

      this.attributeName = val.charAt(0).toLowerCase() + val.slice(1);

      this.atributo.attributeName = this.attributeName
      this.diagrama[0].updateDiagram()

       if( !this.diagrama[0].attributeNameAvailable(this.atributo, this.classEdit) )
         this.$functions.alerts.notification('error', `Já existe um atributo chamado ${this.attributeName}`)

    },
    type(){},
    primaryKey(val){
      this.primaryKey = val
      this.atributo.primaryKey = this.primaryKey
      this.setIco()

      if(this.primaryKey){
        this.atributo.nullable = false
        this.atributo.unique = true
      }else{
        this.atributo.autoGenerate = false
        this.atributo.unique = false
      }

      this.diagrama[0].updateDiagram();
    },
    foreingKey(val){
      this.foreingKey = val
      this.atributo.foreingKey = this.foreingKey
      this.setIco()
      this.diagrama[0].updateDiagram();
    },
    nullable(val){
      this.setIco()
      this.diagrama[0].updateDiagram();

    },
    unique(){},
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
      this.diagrama[0].updateDiagram()
      //this.diagrama.diagram.model.updateTargetBindings(this.classEdit.attributes[this.index]);
    },
    setIco(){
      this.atributo.ico = ""

      if(this.atributo.nullable === true)
        this.atributo.ico = "nulo"

      if(this.atributo.foreingKey === true)
        this.atributo.ico = "fk"

      if(this.atributo.primaryKey === true)
        this.atributo.ico = "pk"

    },
    resetAttributeProperty(){
      this.precision = false
      this.scale = false
      this.length = false
      this.min = false
      this.max = false
    },
    changeType(){
      this.atributo.type = this.type
      this.diagrama[0].updateDiagram()
      this.resetAttributeProperty()
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
    changeForeingKey(){
      //this.atributo.foreingKey
      this.atributo.setIco()
      this.diagrama[0].updateDiagram()
    },
    removerAtributo(){

      if(this.atributo.foreingKey){

        this.$functions.alerts.modalConfirm('Remover Chave Estrangeira?',
            `O <b>relacionamento</b> vinculado será removido!`,
            ()=>{

              this.diagrama[0].removeForeingKey(this.atributo.key, this.classEdit.key)

              this.$functions.alerts.notification('success','Sucesso',`<b>Atributo</b> removido com sucesso!`)

              if(!this.diagrama[0].existAttributeInClass(this.atributo.key, this.classEdit.key))
                this.attributeExist = false;
            })
      }else{
        this.diagrama[0].removeAttribute(this.classEdit, this.atributo)

        this.$functions.alerts.notification('success','Sucesso',`<b>Atributo</b> removido com sucesso!`)

        if(!this.diagrama[0].existAttributeInClass(this.atributo.key, this.classEdit.key))
          this.attributeExist = false;
      }

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
    attributeNameAvailable(){
      return !this.diagrama[0].attributeNameAvailable(this.atributo, this.classEdit);
    },
    showSize: function () {
      let typesShow = ['ascii_string', 'string', 'text'];
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
        if(i !== this.index){ }
          if(atrributes[i].primaryKey === true){
            return true;
          }
      }

    },

  },
  updated() {
    this.attributeName = this.atributo.attributeName
    this.type = this.atributo.type
    this.primaryKey = this.atributo.primaryKey
    this.foreingKey = this.atributo.foreingKey
    this.nullable = this.atributo.nullable
    this.unique = this.atributo.unique
    this.precision = this.atributo.precision
    this.scale = this.atributo.scale
    this.length = this.atributo.length
    this.min = this.atributo.lengthMin
    this.max = this.atributo.lengthMax

    //console.log(this.atributo)
    //console.log(this.atributo.primaryKey)


    /** Inicializa o Jquery Sortable */
    this.$functions.events_front.jquerySortable(this.diagrama[0])
    this.$functions.events_front.popover()

  }
}
</script>

<style scoped>
input[type="checkbox"]:disabled{
  background: rgba(255, 255, 255, 0.66);
}
.input{
  height: 40px;
}
.vue-select {
  border-radius: 3px;
  white-space: normal;
  background-color: white;
  color: black;
  height: 40px;
  width: 100%;
}

</style>