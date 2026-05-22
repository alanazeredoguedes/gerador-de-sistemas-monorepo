<template>
  <div>

    <h5 style="margin-top: 10px; margin-bottom: 20px; color: white">
      <b>Atributos</b>
    </h5>



      <ul class="sortable" :class="'sortable-'+classEdit.key" style="padding-left: 0;">
        <li :class="'sa-'+atributo.key" :id="atributo.key" v-for="(atributo, index) in classEdit.attributes" style="display: block; margin-bottom: 5px;">

          <Atributo :index="index" :atributo="atributo" :diagrama="diagrama" :classEdit="classEdit" />

        </li>
      </ul>


    <div style="padding-top: 10px;">
      <a class="text-white" @click="adicionarAtributo" href="javascript:void(0)" style="text-decoration: none;">
        <i class="fa-solid fa-circle-plus"></i>
        Adicionar Atributo
      </a>
    </div>



  </div>
</template>


<script>
import Attribute from "../../../../models/schema/Attribute";
import Atributo from "./Atributo.vue";
import $ from "jquery";

export default {
  name: 'Atributos',
  components: {Atributo},
  props: [
    'classEdit',
    'diagrama',
  ],
  methods: {
    adicionarAtributo(){
        let atributo = new Attribute();
        this.diagrama[0].addAttribute(this.classEdit, atributo)
    },
  },
  updated() {
    this.$functions.events_front.jquerySortable(this.diagrama[0])
    this.$functions.events_front.popover()

  }

}
</script>
