<template>
  <div class="modal fade" tabindex="-1" id="kt_modal_3" >
    <div class="modal-dialog modal-dialog-centered" style="width: 40%;">
      <div class="modal-content position-absolute bg-modal">
        <div class="modal-body" style="color: white;" >

          <br>



          <div class="pb-5">
            <div class="d-flex flex-stack border rounded px-7 py-3">
              <a href="javascript:void(0)" class="fs-5 text-white text-hover-success fw-semibold w-375px text-center">{{ diagramaData.name }}</a>
            </div>
          </div>



          <div class="pb-5">



            <div class="d-flex flex-stack border rounded p-4 mb-5">
              <div class="d-flex align-items-center me-2">
                <i class="fa-solid fa-plus w-30px me-3" style="font-size: 25px"></i>
                <div class="d-flex flex-stack">
                  <div class="d-flex flex-column me-2">
                    <a href="javascript:void(0)" class="fs-7 text-white text-hover-success fw-bold">Adicionar Classe</a>
                    <div class="text-white opacity-75">Adicione novas classes ao diagrama</div>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0)" @click="adicionarClasse" class="btn btn-sm btn-hover-rise text-white bg-white bg-opacity-10">Adicionar</a>
            </div>


            <div class="d-flex flex-stack border rounded p-4 mb-5">
              <div class="d-flex align-items-center me-2">
                <i class="fa-solid fa-link w-30px me-3" style="font-size: 25px"></i>
                <div class="d-flex flex-stack">
                  <div class="d-flex flex-column me-2">
                    <a href="javascript:void(0)" class="fs-7 text-white text-hover-success fw-bold">Adicionar Relacionamento</a>
                    <div class="text-white opacity-75">Gere relacionamentos entre as classes.</div>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0)" @click="adicionarRelacionamento" class="btn btn-sm btn-hover-rise text-white bg-white bg-opacity-10">Adicionar</a>
            </div>



            <div class="d-flex flex-stack border rounded p-4 mb-5">
              <div class="d-flex align-items-center me-2">
                <i class="fa-solid fa-plus w-30px me-3" style="font-size: 25px"></i>
                <div class="d-flex flex-stack">
                  <div class="d-flex flex-column me-2">
                    <a href="javascript:void(0)" class="fs-7 text-white text-hover-success fw-bold">Adicionar Classes de Media</a>
                    <div class="text-white opacity-75">Conjunto de classes para gerenciamento de arquivos.</div>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0)" @click="adicionarMedia" class="btn btn-sm btn-hover-rise text-white bg-white bg-opacity-10">Adicionar</a>
            </div>



            <div class="d-flex flex-stack border rounded p-4 mb-5">
              <div class="d-flex align-items-center me-2">
                <i class="fa-solid fa-floppy-disk w-30px me-3" style="font-size: 25px"></i>
                <div class="d-flex flex-stack">
                  <div class="d-flex flex-column me-2">
                    <a href="javascript:void(0)" class="fs-7 text-white text-hover-success fw-bold">Salvar Diagrama</a>
                    <div class="text-white opacity-75">Salve as modificações realizadas no diagrama.</div>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0)" @click="salvarDiagrama" class="btn btn-sm btn-hover-rise text-white bg-white bg-opacity-10">&nbsp;&nbsp;Salvar&nbsp;&nbsp;&nbsp;</a>
            </div>


<!--            <div class="d-flex flex-stack border rounded p-4 mb-5">
              <div class="d-flex align-items-center me-2">
                <i class="fa-solid fa-file-export w-30px me-3" style="font-size: 25px"></i>
                <div class="d-flex flex-stack">
                  <div class="d-flex flex-column me-2">
                    <a href="javascript:void(0)" class="fs-7 text-white text-hover-success fw-bold">Exporta Metadados</a>
                    <div class="text-white opacity-75">Exporte os metadados das classes e relacionamentos do diagrama.</div>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0)" @click="exportarDiagrama" class="btn btn-sm btn-hover-rise text-white bg-white bg-opacity-10">Exportar</a>
            </div>-->

            <div class="d-flex flex-stack border rounded p-4 mb-5">
              <div class="d-flex align-items-center me-2">
                <i class="fa-solid fa-file-export w-30px me-3" style="font-size: 25px"></i>
                <div class="d-flex flex-stack">
                  <div class="d-flex flex-column me-2">
                    <a href="javascript:void(0)" class="fs-7 text-white text-hover-success fw-bold">Exporta Imagem</a>
                    <div class="text-white opacity-75">Exporte o diagrama no formato de imagem SVG.</div>
                  </div>
                </div>
              </div>
              <a href="javascript:void(0)" @click="exportarImagem" class="btn btn-sm btn-hover-rise text-white bg-white bg-opacity-10">Exportar</a>
            </div>


          </div>


          <br>

        </div>
      </div>
    </div>
  </div>
</template>


<script>


import {mapActions} from "vuex";
import Class from "../../../models/schema/Class";
import Attribute from "../../../models/schema/Attribute";
import Relationship from "../../../models/schema/Relationship";

function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  let exportFileDefaultName = 'data.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export default {
  name: 'ModalActionsCanvas',
  props: [ 'diagrama', 'diagramaData' ],
  components: {  },
  data(){
    return {

    }
  },
  methods: {
    ...mapActions([
      'getDiagramas',
      'updateDiagrama'
    ]),
    show(){
      $(this.$el).modal('show')
    },
    close(){
      $(this.$el).modal('hide')
    },
    adicionarClasse(){
      this.close()
      $('.btnModalAdicionarClasse')[0].click()
    },
    adicionarRelacionamento(){
      this.close()
      $('.btnModalAdicionarRelacionamento')[0].click()
    },
    salvarDiagrama(){

      let diagram = {
         //nome: this.diagramaData.nome,
         //descricao: this.diagramaData.descricao,
          structure: JSON.stringify({
           class: this.diagrama[0].models,
           relationships: this.diagrama[0].linksModels,
        })
      }

      this.updateDiagrama({ id: this.diagramaData.id, data: diagram })
          .then((response)=>{
            this.$functions.alerts.notification('success', "Sucesso", 'Diagrama salvo com sucesso!')
          })
          .catch((response)=>{
            this.$functions.alerts.notification('error', "Erro", 'Não foi possível salvar o diagrama no momento!')
          })
          .finally(()=>{
            this.close()
          })

    },
    exportarDiagrama(){

      let data = JSON.parse( this.diagrama[0].diagram.model.toJson() )
      let exportData = {}

      exportData.name = this.diagramaData.name
      exportData.description = this.diagramaData.description
      exportData.class = data.nodeDataArray
      exportData.relationships = data.linkDataArray



      /* data = data.replace("linkDataArray", "relationships");
       data = data.replace("class", "diagrama");
       data = data.replace("GraphLinksModel", this.diagramaData.nome);
       data = data.replace("nodeDataArray", "class");

       data.descricao = 'dasdsadsa'*/
/*
      let exportData = {
        'class': this.diagrama[0].models,
        'relationships': this.diagrama[0].linksModels,
      }*/


      //exportToJsonFile(exportData)
      exportToJsonFile(exportData)

      this.close()
    },

    exportarImagem(){

      let svg = this.diagrama[0].diagram.makeSvg({
        scale: 1.0,
        background: "white",
        shadowColor: "white",
        //size: new go.Size(100,100),
      });

      let svgstr = new XMLSerializer().serializeToString(svg);
      let blob = new Blob([svgstr], { type: "image/svg+xml" });


      let url = window.URL.createObjectURL(blob);
      let filename = this.diagramaData.name + '' + ".svg";
      let a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      requestAnimationFrame(function() {
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });

    },

    adicionarMedia(){

      let MediaFind = this.diagrama[0].findClassByName('Media')
      let GaleriaFind = this.diagrama[0].findClassByName('Galeria')
      let MediaGaleriaFind = this.diagrama[0].findClassByName('media_galeria')

      if(MediaFind || GaleriaFind || MediaGaleriaFind ){
        this.$functions.alerts.notification('error', "Classes já existentes", 'Não é possível adicionar no momento!')
        return;
      }


      /** Adiciona Classe de Media */
      let mediaAttribute1 = new Attribute('id','id','integer', true);
      let mediaAttribute2 = new Attribute('name','name','string', false);
      let mediaAttribute3 = new Attribute('description','description','text', false);
      let mediaAttribute4 = new Attribute('enabled','enabled','int', false);

      let media = new Class(
          'Media', 'media', 'Classe reponsavel pelo gerenciamento de media',
          [ mediaAttribute1, mediaAttribute2, mediaAttribute3, mediaAttribute4 ],
          [],
          '-693 -161'
      )
      media.systemModel = true;
      media.key = "1"
      this.diagrama[0].addClass(media)
      /** ################################################  */


      /** Adiciona Classe de Galeria */
      let galeriaAttribute1 = new Attribute('id','id','integer', true);
      let galeriaAttribute2 = new Attribute('name','name','string', false);
      let galeriaAttribute3 = new Attribute('enabled','enabled','int', false);

      let galeria = new Class(
          'Galeria', 'galeria', 'Classe reponsavel pelo gerenciamento de galeria de medias',
          [galeriaAttribute1, galeriaAttribute2, galeriaAttribute3 ], [],
          '-614 -421'
      )
      galeria.systemModel = true;
      galeria.key = "2"
      this.diagrama[0].addClass(galeria)
      /** ################################################  */


      /** Adiciona Tabela associativa de atributos de chave estrangeira!*/
      let fkMedia = new Attribute('media_id', 'media_id', 'integer',  false, true)
      fkMedia.setIco()

      let fkGaleria = new Attribute('galeria_id', 'galeria_id', 'integer',  false, true)
      fkGaleria.setIco()

      let mediaGaleria = new Class('media_galeria', 'media_galeria','', [fkMedia, fkGaleria], [],'-1004 -319' );
      mediaGaleria.associativeModel = true
      mediaGaleria.systemModel = true
      mediaGaleria.key = "3"
      this.diagrama[0].addClass(mediaGaleria);
      /** ################################################  */

      /** Adiciona Relacionamentos */

      let relationMedia = new Relationship(media.key, mediaGaleria.key,'many-to-many', 'one-to-many', mediaAttribute1.key, fkMedia.key)
      let relationGaleria = new Relationship(galeria.key, mediaGaleria.key,'many-to-many', 'one-to-many', galeriaAttribute1.key, fkGaleria.key )
      relationMedia.key = "1";
      relationGaleria.key = "2";
      this.diagrama[0].addRelationship(relationMedia)
      this.diagrama[0].addRelationship(relationGaleria)




    },



  },

  mounted() {
    var element = document.querySelector('#kt_modal_3');
    dragElement(element);

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (elmnt.querySelector('.modal-content')) {
        // if present, the header is where you move the DIV from:
        elmnt.querySelector('.modal-content').onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }


  }
}
</script>

<style>
.bg-modal{
  background-image: url('@/assets/themes/10/media/header-bg.png');
}
.actions-btn-link{
  background-color: #D5D83D;
  margin-top: 20px;
}

</style>