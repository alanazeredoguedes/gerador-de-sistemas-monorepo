function initEventListener(Diagram, diagramDefinition){

    document.querySelector(".scaleCanvasUp").onclick = function (element) {
        document.querySelector('.scaleInfo').innerHTML =  diagramDefinition.scaleCanvas('up')
    }

    document.querySelector(".scaleCanvasDown").onclick = function (element) {
        document.querySelector('.scaleInfo').innerHTML =  diagramDefinition.scaleCanvas('down')
    }

}
