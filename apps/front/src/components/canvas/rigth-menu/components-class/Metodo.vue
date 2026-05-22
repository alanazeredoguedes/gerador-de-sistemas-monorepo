<template>
  <div>
    <div class="row d-flex align-items-center" style="margin-bottom: 2px;">

      <div class="col-10 input-group-sm" style="">
        <input type="text" class="form-control input pov" v-model="name" @change="" placeholder="Nome do Método"
               data-bs-toggle="popover"
               data-bs-placement="top"
               title="Nome do Método"
        >
      </div>


      <div class="col-1">
        <div class="row d-flex align-items-center">

<!--          <div class="col-6 text-center"></div>-->

          <div class="col-12 text-center">
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
        <a class="delete-field" href="javascript:void(0)" @click="remover">
          <i class="fa-solid fa-trash-can" style="color: red; font-size: 16px"></i>
        </a>
      </div>


      <div class="field-options" :id="'field-options-'+metodo.key" style="margin-top: 15px; display: none;" >
        <div class="row" style="color: white; margin-top: 10px;">

          <div class="col-12">
            <label class="form-label"  style="color: white">Descrição</label>
            <textarea class="form-control" v-model="description" placeholder="Descrição" style="height: 100px;">
          </textarea>
          </div>



          <hr style="margin-top: 20px;">

        </div>
      </div>





    </div>
  </div>
</template>


<script>
import $ from "jquery";

export default {
  name: 'Metodo',
  props: [ 'index', 'metodo', 'classEdit', 'diagrama', ],
  data(){
    return {
      name: this.metodo.name,
      description: this.metodo.description,
    }
  },
  watch:{
    name(val){
      val = this.$functions.string_validation.normalizeString( val )
      val = this.$functions.string_validation.capitalize( val )
      val = this.$functions.string_validation.removeSpace( val )

      this.name = val.charAt(0).toLowerCase() + val.slice(1)
      this.metodo.name = this.name

      // if( !this.diagrama[0].attributeNameAvailable(this.classEdit, this.atributo) ){
      //   this.$functions.alerts.notification('error', `Já existe um atributo na classe chamado ${this.attributeName}!`)
      // }

      this.diagrama[0].updateDiagram()
    },
    description(val){
      this.metodo.description = this.description

      this.diagrama[0].updateDiagram()
    }

  },
  methods:{
    remover(){

      this.diagrama[0].removeMethod(this.classEdit, this.metodo)
      this.$functions.alerts.notification('success','Sucesso',`<b>Método</b> removido com sucesso!`)

    },
    changeFieldOption(){

      let actualFieldOption = $(`#field-options-` + this.metodo.key);

      if(actualFieldOption.css('display') === 'none'){
        $('.field-options').css('display', 'none')
        actualFieldOption.css('display', 'block')
      }else{
        $('.field-options').css('display', 'none')
        //actualFieldOption.css('display', 'block')
      }
    },

  },
  updated() {
    this.name = this.metodo.name
    this.description = this.metodo.description


    /** Inicializa o Jquery Sortable */
    $(".sortable").sortable({
      scroll: false,
      handle: ".handle",
      opacity: 0.7,
      scrollSensitivity: 2,
      scrollSpeed: 5,
    });

    $(function () {
      $('.pov').popover({
        container: 'body',
        trigger: 'hover'
      })
    })

  }
}
</script>
