<template>
  <div>
    <a data-bs-toggle="offcanvas" :href="'#'+id" :class="'btn'+id" style="display: none"></a>

<!--    <div :id="id" class="offcanvas offcanvas-end rightModal" v-bind:style="{ backgroundColor: (isTable ? 'rgb(119 51 51 / 95%)' : 'rgba(51, 86, 119, 0.95)'),  borderColor: (isTable ? 'rgb(119 51 51 / 95%)' : 'rgba(51, 86, 119, 0.95)') }"  data-bs-backdrop="false" tabindex="-1" >-->
    <div :id="id" class="offcanvas offcanvas-end " v-bind:class="[ isTable ? 'tableModel' : 'classModel']" data-bs-keyboard="false" data-bs-backdrop="false" data-bs-scroll="true" tabindex="-1" >

      <div class="offcanvas-body">

        <slot name="body">


        </slot>

      </div>
    </div>

  </div>
</template>

<script>

import $ from "jquery";

export default {

  name: 'ModalRight',

  components: {  },

  props: [ 'id', 'isTable'],

  data(){
    return {
      modalRight: false,
      modalRightBtn: false,
      modalRightOpen: false
    }
  },
  methods: {
    updateInfo(){
      this.modalRight     = $(`#${this.$props.id}`)
      this.modalRightBtn  = $(`.btn${this.$props.id}`)
      this.modalRightOpen = ( this.modalRight.length !== 0) ? this.modalRight.attr('class').includes('show') : false;
    },
    isOpen(){
      this.updateInfo();
      return this.modalRightOpen;
    },
    show(){
      this.updateInfo();
      ( this.isOpen() === false) ? this.modalRightBtn[0].click() : false;
    },
    close(){
      this.updateInfo();
      ( this.isOpen() === true) ? this.modalRightBtn[0].click() : false;
    },

  },
  computed: {

  },

}
</script>

<style>
.classModel {
  background-image: url(/img/modal/page-bg.jpg);
  background-position: top !important;
  /*width: 35% !important;*/
  width: 700px !important;
}

.tableModel {
  background-color: rgb(124,12,12);
  border-color: rgb(124,12,12);
  width: 700px !important;
}

.vue-select {
  border-radius: var(&#45;&#45;vs-border-radius);
  white-space: normal;
  background-color: white;
  color: black;
  height: 90%;
}

</style>
