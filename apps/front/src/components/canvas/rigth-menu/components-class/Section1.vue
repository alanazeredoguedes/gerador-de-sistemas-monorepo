<template>
  <div class="row Section1" style="margin-top: 0;">


       <div class="col-12">

        <span style="font-size: 23px;">
          <b>
            {{ classEdit.className }}
          </b>

        </span>

         <a href="javascript:void(0)" @click="removeClass" style="float: right">
           <i aria-hidden="true" class="far fa-trash-alt" style="color: red; font-size: 20px;"></i>
         </a>

<!--          <a type="button" class="text-reset" style="float: right;">
            <i aria-hidden="true" class="fas fa-times" style="font-size: 25px; color: white;"></i>
          </a>-->

      </div>


    <div class="col-12">

      <span> <b>Classe: </b></span>
      <span>{{ classEdit.className }}, </span>

      <span><b>Tabela: </b></span>
      <span>{{ classEdit.tableName }}</span>

    </div>

  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: 'Section1',
  props: [
    'classEdit',
    'diagrama',
  ],

  data(){
    return { }
  },

  methods: {
    removeClass(){

      this.$functions.alerts.modalConfirm('Remover Classe',
          `Os <b>relacionamentos</b> e <b>chaves estrangeiras</b> vinculados serão removidos!`,
          ()=>{
            //this.diagrama[0].removeClass(this.classEdit)
            this.diagrama[0].removeClassByKey(this.classEdit.key)
            this.$functions.alerts.notification('success','Sucesso',`<b>Classe</b> removida com sucesso!`)
            this.$parent.close()
          })

    },

  }
}
</script>

<style scoped>
.input{
  height: 35px;
}
</style>