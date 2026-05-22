<template>
  <div>

    <Canvas/>

  </div>
</template>


<script>
import { mapActions } from 'vuex'


import Canvas from "../../components/canvas/Canvas.vue";


/*
document.body.style.backgroundImage = '';
document.body.style.backgroundColor = '#ffffff';
*/




export default {
  components: {Canvas},
  data() {
    return {
      data: null
    }
  },
  methods: {
    /*...mapActions([
        'getCursos',
    ])*/

  }

}
</script>