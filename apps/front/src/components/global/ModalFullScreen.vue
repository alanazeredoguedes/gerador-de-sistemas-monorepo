<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen p-9" style="padding: 5%">
      <div class="modal-content">

        <div class="modal-header header-bg">

          <h2 class="text-white">
            <slot name="title"> Title </slot>
            <small class="ms-2 fs-7 fw-normal text-white opacity-50">
              <slot name="titleDescription"> Title Description </slot>
            </small>
          </h2>

          <div class="btn btn-sm btn-icon btn-color-white btn-active-color-primary" data-bs-dismiss="modal">
              <span class="svg-icon svg-icon-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
                  <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
                </svg>
              </span>
          </div>

        </div>


        <div class="modal-body scroll-y m-5">

          <slot name="body">
            Body
          </slot>

        </div>


      </div>
    </div>
  </div>
</template>

<script>

//import $ from "jquery";


export default {

  name: 'ModalFullScreen',

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
/*.header-modal{*/
/*  !*background-image: url('@/assets/themes/10/media/header-bg.png');*!*/
/*  height: 7vh;*/
/*}*/
/*.header-modal h3, span{*/
/*  color: white;*/
/*}*/
</style>