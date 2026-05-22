<template>

  <div class="d-flex flex-column flex-root">
    <div class="page d-flex flex-row flex-column-fluid">
      <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

        <TopMenu :diagrama="diagrama" :diagramaData="diagramaData" />

      </div>
    </div>
  </div>

  <div id="canvas" class="CanvasComponent cavasDiagram"></div>

  <ModalActionsCanvas ref="ModalActionsCanvas" :diagrama="diagrama" :diagramaData="diagramaData" />

  <ModalEditClass ref="ModalEditClass" :class-edit="classEdit" :diagrama="diagrama" />

</template>

<script>

/** ************************************************************ */
/** Dependencias CANVAS GO JS */

import '../../assets/plugins/goJs/go.js'
//import '../../assets/plugins/goJs/go-debug'

import '@/assets/plugins/goJs/extensions/Figures'
import '@/assets/plugins/goJs/extensions/Arrowheads'
import '@/assets/plugins/goJs/extensions/LightBoxContextMenu'


/** ************************************************************ */
/** Componetes VUE  */

import ModalAdicionarClasse from "./modal/ModalAdicionarClasse.vue";
import ModalAdicionarRelacionamento from "./modal/ModalAdicionarRelacionamento.vue";
import TopMenu from "./top-menu/TopMenu.vue";
import ModalEditClass from "./rigth-menu/EditClass.vue";
import ModalActionsCanvas from "./modal/ModalActionsCanvas.vue";


/** ************************************************************ */
/** Imports Geral  */

import { mapActions, mapState } from 'vuex'
import Diagrama from "../../models/schema/Diagrama";
import Relationship from "../../models/schema/Relationship";
import Method from "../../models/schema/Method";
import Attribute from "../../models/schema/Attribute";
import Class from "../../models/schema/Class";










/** Vue Script */
export default {
  name: 'Canvas',
  components: {ModalActionsCanvas, ModalEditClass, TopMenu, ModalAdicionarRelacionamento, ModalAdicionarClasse },
  props: {  },
  data(){
    return {
      diagrama: null,
      classEdit: null,
    }
  },
  computed:{
    ...mapState({
      diagramaData: state => state.diagramaStore.items.diagrama
    })

  },
  methods: {
    ...mapActions([
      'getDiagrama',
    ]),
    /** INICIO Criação de novos eventos para o diagrama. */
    eventClick(){
      return (e, obj) => {

        if(obj.part.data.systemModel)
          return

        let menuRight = this.$refs.ModalEditClass

        if(!menuRight)
          return

        if(!menuRight.isOpen()){

          menuRight.show();
          this.classEdit = obj.part.data

        }else if( menuRight.isOpen() && this.classEdit.key !== obj.part.data.key){

          menuRight.close();

          setTimeout(()=>{
            this.classEdit = obj.part.data
            menuRight.show();

          }, 400)

        }else if( menuRight.isOpen() && this.classEdit.key === obj.part.data.key){
          menuRight.close();
        }

        //this.classEdit = null

      }
    },
    eventDoubleClick(){
      return (e, obj) => {
        //console.log('Double Click')
      }
    },
    eventRightClick(){
      return (e, obj) => {

        let classs = obj.part.data

        /** Se for uma Classe do sistema! */
        if(obj.part.data.systemModel){


          this.$functions.alerts.modalConfirm('Remover Classe',
              `As classes de Media e Galeria e todos os <b>relacionamentos</b> e <b>chaves estrangeiras</b> vinculados serão removidos!`,
              ()=>{
                //this.diagrama[0].removeClass(this.classEdit)
                this.diagrama[0].removeClassByKey("1")
                this.diagrama[0].removeClassByKey("2")
                this.diagrama[0].removeClassByKey("3")
                this.diagrama[0].removeRelationshipByKey("1")
                this.diagrama[0].removeRelationshipByKey("2")

                this.$functions.alerts.notification('success','Sucesso',`<b>Classes</b> removidas com sucesso!`)
              })


          /** Se for uma Classe Criada pelo cliente! */
        }else{

          this.$functions.alerts.modalConfirm('Remover Classe',
              `Os <b>relacionamentos</b> e <b>chaves estrangeiras</b> vinculados serão removidos!`,
              ()=>{
                //this.diagrama[0].removeClass(this.classEdit)
                this.diagrama[0].removeClassByKey(classs.key)
                this.$functions.alerts.notification('success','Sucesso',`<b>Classe</b> removida com sucesso!`)
              })

        }

        //console.log(obj.part.data)

      }
    },
    eventMouseEnter(){
      return (e, obj) => {
        //console.log('Mouse Enter')
      }
    },
    eventMouseLeave(){
      return (e, obj) => {
          //console.log('Mouse Leave')
      }
    },
    eventClickDiagram(e, obj){
      return (e, obj) => {

        let menuRight = this.$refs.ModalEditClass

        if(menuRight.isOpen()){
          this.classEdit = null
          menuRight.close();
        }

        //console.log('Click Diagram')
        //let menuRight = this.$refs.ModalEditClass
        //menuRight.close()
      }
    },
    eventRightClickDiagram(e, obj){
      return (e, obj) => {
        let modalActionsCanvas = this.$refs.ModalActionsCanvas
        modalActionsCanvas.show();

        //console.log('Right Click Diagram')

      }
    },
    eventChangeLocation(){
      return (e, obj) => {
        //console.log(e)

        if (e.af === 'location'){
          //console.log(e.object.location)
          //console.log(e.object)
        }
        //console.log(this.diagrama.models)
      }
    },
    /** FIM Criação de novos eventos para o diagrama. */

    initDiagrama(models, relationships){
      const diagrama = new Diagrama(models, relationships)
      this.diagrama = Object.freeze([diagrama])
    },
    initEventos(){

      /** Redefinição dos Eventos do Diagrama */
      this.diagrama[0].eventClick = this.eventClick();
      this.diagrama[0].eventDoubleClick = this.eventDoubleClick();
      this.diagrama[0].eventRightClick = this.eventRightClick();
      this.diagrama[0].eventMouseEnter = this.eventMouseEnter();
      this.diagrama[0].eventMouseLeave = this.eventMouseLeave();
      this.diagrama[0].eventChangeLocation = this.eventChangeLocation();
      this.diagrama[0].eventClickDiagram = this.eventClickDiagram();
      this.diagrama[0].eventRightClickDiagram = this.eventRightClickDiagram();
      this.diagrama[0].initEvents()
    }

  },
  mounted() {


    //this.initDiagramData()
    this.initDiagrama()
    this.initEventos()

    /** ‘ID’ do diagrama Atual */
    let diagramaId = this.$route.params.id

    this.getDiagrama(diagramaId)
        .then( response => {

          let estrutura = JSON.parse(this.diagramaData.structure);

          /** Adiciona as classes ao canvas */
          estrutura.class.forEach((data)=>{ this.diagrama[0].addClass( data ) })

          /** Adiciona os relacionamentos ao canvas */
          estrutura.relationships.forEach((data)=>{ this.diagrama[0].addRelationship(data) })

          this.$functions.alerts.notification('success', "Sucesso", 'Sucesso ao carregar Diagrama')

        })
        .catch( response => this.$functions.alerts.notification('error', "Erro", 'Falha ao carregar Diagramas') )


  },


}
</script>


<style scoped>


.cavasDiagram {
  width: 200vw;
  height: 152vh;
  /*margin-top: -0.2vh;*/
/*  width: 200vw;
  height: 200vh;*/
  /*;*/
  /*background-color: black;*/
  background-image: url('@/assets/images/canvas/background/background-1.png');
}


</style>