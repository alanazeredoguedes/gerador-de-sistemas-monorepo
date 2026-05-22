<template>
  <ModalRight id="ModalEditTableClass" ref="modalRight" :is-table="isTable">
    <template v-slot:body >
      <div class="bodyModal"  v-if="classEdit">


        <!-- DIV TABELA -->
        <div v-if="classEdit.associativeModel">

          <TableSection1 :classEdit="classEdit" :diagrama="diagrama"/>

          <TableSection2 :classEdit="classEdit" :diagrama="diagrama"/>

          <table-fields :classEdit="classEdit" :diagrama="diagrama" />




        </div>



        <!-- DIV CLASSE -->
        <div v-if="!classEdit.associativeModel">

          <Section1 :classEdit="classEdit" :diagrama="diagrama" />

          <Section2 :classEdit="classEdit" :diagrama="diagrama" />

          <Atributos :classEdit="classEdit" :diagrama="diagrama" />

          <Metodos :classEdit="classEdit" :diagrama="diagrama" />

        </div>



      </div>
    </template>
  </ModalRight>
</template>


<script>

import ModalRight from "../../global/ModalRight.vue";
import Section1 from "./components-class/Section1.vue";
import Section2 from "./components-class/Section2.vue";
import Atributos from "./components-class/Atributos.vue";
import TableSection1 from "./components-table/TableSection1.vue";
import TableSection2 from "./components-table/TableSection2.vue";
import TableFields from "./components-table/TableFields.vue";
import Metodos from "./components-class/Metodos.vue";
import $ from "jquery";

export default {
  props: [ 'diagrama', 'classEdit' ],
  name: 'ModalEditClass',
  components: { Metodos, TableFields, TableSection2, TableSection1, Atributos, Section2, Section1, ModalRight },
  data(){
    return {
      initObject: true,
      //name: this.classEdit.name,
    }
  },
  computed:{
    isTable(){
      if(!this.classEdit)
        return false

      return this.classEdit.associativeModel
    },
  },
  methods: {
    isOpen(){
      return this.$refs.modalRight.isOpen()
    },
    show(){
      this.$refs.modalRight.show()
    },
    close(){
      this.$refs.modalRight.close()
      this.$parent.classEdit = null
    },
  },
  updated() {
    this.$functions.events_front.jquerySortable(this.diagrama[0])
    this.$functions.events_front.popover()


  },
}
</script>

<style scoped>


.bodyModal {
  color: white !important;
}


</style>