<template>
  <div class="modal fade" tabindex="-1" :class="id">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header header-modal header-bg">

          <h3 class="modal-title">
            <slot name="title">

            </slot>
          </h3>

          <div class="btn btn-icon btn-sm btn-active-danger ms-2" @click="close" data-bs-dismiss="modal" aria-label="Close">
            <span class="svg-icon svg-icon-1" style="color: white; font-size: 15px"><b>x</b></span>
          </div>

        </div>

        <div class="modal-body ">

          <slot name="body">
            Body
          </slot>


          <div class="" style="float: right; margin-top: 20px;">

            <slot name="footer">

              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary">Adicionar</button>

            </slot>

          </div>

        </div>


      </div>
    </div>
  </div>

</template>

<script>

//import $ from "jquery";


export default {


  name: 'Modal',

  components: {  },

  props: [ 'definition', 'id', ],

  data(){
    return {

    }
  },

  methods: {
    show(){
      $(this.$el).modal('show')
    },
    close(){
      $(this.$el).modal('hide')
    }

  }

}
</script>

<style>
.header-modal{
  /*background-image: url('@/assets/themes/10/media/header-bg.png');*/
  height: 7vh;
}
.header-modal h3, span{
  color: white;
}
</style>