<template>
  <div>

    <h5 style="margin-top: 10px; margin-bottom: 30px; color: white">
      <b>Campos</b>
    </h5>


      <ul class="sortable sortable-attributes" :class="'sakey-'+classEdit.key" style="padding-left: 0;">
        <li :id="atributo.key" v-for="(atributo, index) in classEdit.attributes"  style="display: block; margin-bottom: 5px;">

          <TableField  :index="index" :atributo="atributo" :diagrama="diagrama" :classEdit="classEdit" v-if="atributo.foreingKey" />

        </li>
      </ul>


<!--    <div style="padding-top: 10px;">
      <a class="text-white" @click="adicionarAtributo" href="javascript:void(0)" style="text-decoration: none;">
        <i class="fa-solid fa-circle-plus"></i>
        Adicionar Atributo
      </a>
    </div>-->



  </div>
</template>


<script>
import Attribute from "../../../../models/schema/Attribute";
import TableField from "./TableField.vue";

export default {
  name: 'TableFields',
  components: {TableField},
  props: [
    'classEdit',
    'diagrama',
  ],
  methods: {
    adicionarAtributo(){
        let atributo = new Attribute();
        this.classEdit.attributes.push(atributo)
        this.diagrama[0].updateDiagram();
        //console.log(this.classEdit)
    },
  }

}
</script>
