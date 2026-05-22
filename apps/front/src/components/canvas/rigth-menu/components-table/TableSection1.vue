<template>
  <div class="row Section1" style="margin-top: 0;">

       <div class="col-12">

        <span style="font-size: 23px;">
          <b>
            {{ classEdit.tableName }}
          </b>

        </span>

         <a href="javascript:void(0)" @click="removeClass" style="float: right;">
           <i aria-hidden="true" class="far fa-trash-alt" style="color: white; font-size: 20px;"></i>
         </a>

<!--          <a type="button" data-bs-dismiss="offcanvas" aria-label="Close" class="text-reset closeRightMenu" style="float: right;">
            <i aria-hidden="true" class="fas fa-times" style="font-size: 25px; color: white;"></i>
          </a>-->

      </div>


    <div class="col-12">

      <span><b>Tabela: </b></span>
      <span>{{ classEdit.tableName }}</span>

    </div>

  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: 'TableSection1',
  props: [
    'classEdit',
    'diagrama',
  ],

  data(){
    return { }
  },

  methods: {
    removeClass(){

      this.$functions.alerts.modalConfirm('Remover Tabela Associativa?',
          `Os <b>relacionamentos</b> e <b>chaves estrangeiras</b> vinculados serão removidos!`,
          ()=>{
            this.diagrama[0].removeTableByKey(this.classEdit.key)
            this.$functions.alerts.notification('success','Sucesso',`<b>Tabela</b> removida com sucesso!`)
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