const goStruct = go.GraphObject.make;
const $ = go.GraphObject.make;

const getStructure = () => {
    return $(go.Diagram, "canvas",  // create a Diagram for the DIV HTML element
        {
            "undoManager.isEnabled": true  // enable undo & redo
        });
}

const setData = () => {
    return new go.GraphLinksModel([],[]);
}


const getNodeTemplate = ()=>{
    return $(go.Node, "Auto",  // the Shape will go around the TextBlock
        $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
            // Shape.fill is bound to Node.data.color
            new go.Binding("fill", "color")),
        $(go.TextBlock,
            { margin: 8, font: "bold 14px sans-serif", stroke: '#333' }, // Specify a margin to add some room around the text
            // TextBlock.text is bound to Node.data.key
            new go.Binding("text", "key"))
    );
}


const _diagrama = getStructure
_diagrama.nodeTemplate = getNodeTemplate();
_diagrama.model = setData()
//_diagrama.linkTemplate = getLinkTemplate();


export default _diagrama