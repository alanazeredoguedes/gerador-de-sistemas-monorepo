<template>
  <div>

    <h5 style="margin-top: 30px; margin-bottom: 20px; color: white">
      <b>Métodos</b>
    </h5>


      <ul class="sortable sortable-attributes" :class="'sakey2-'+classEdit.key" style="padding-left: 0;">
        <li :id="metodo.key" v-for="(metodo, index) in classEdit.methods"  style="display: block; margin-bottom: 5px;">

          <Metodo :index="index" :metodo="metodo" :diagrama="diagrama" :classEdit="classEdit" />

        </li>
      </ul>


    <div style="padding-top: 10px;">
      <a class="text-white" @click="adicionarMetodo" href="javascript:void(0)" style="text-decoration: none;">
        <i class="fa-solid fa-circle-plus"></i>
        Adicionar Método
      </a>
    </div>



  </div>
</template>


<script>
import Method from "../../../../models/schema/Method";
import Metodo from "./Metodo.vue";

// import Attribute from "../../../../models/schema/Attribute";
// import Atributo from "./Atributo.vue";

export default {
  name: 'Metodos',
  components: { Metodo  },
  props: [
    'classEdit',
    'diagrama',
  ],
  methods: {
    adicionarMetodo(){
        let metodo = new Method();
        this.diagrama[0].addMethod(this.classEdit, metodo)

        //console.log(this.classEdit)
    },
  }

}
</script>
