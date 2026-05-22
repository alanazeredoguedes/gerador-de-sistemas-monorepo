/** @var goStruct Responsável por armazenar o modelo da estrutura que será utilizado na biblioteca. */
const goStruct = go.GraphObject.make;  // for conciseness in defining templates


class DiagramDefinition
{
    constructor( models = [], linksModels = []) {
        this.models = models;
        this.linksModels = linksModels;
        this.diagram = this.getStructure();
        this.diagram.nodeTemplate = this.getNodeTemplate();
        this.diagram.linkTemplate = this.getLinkTemplate();
        this.diagram.model = this.setData(this.models, this.linksModels)
        //this.diagram.addModelChangedListener(this.onchangeModel)
        this.diagram.model.addChangedListener(this.onchangeModel)
        this.action = (e, obj)=>{}
        this.transAttributes = 'Atributos'
    }


    onchangeModel = (e)=>{

        if (e.af === 'location'){
            //console.log(e.object.location)
            //console.log(e.object)
        }

    }

    callBackDoubleClick = (e, obj)=>{
        this.action(e,obj);
    }


    addTable = (table)=>{
        this.diagram.model.addNodeData(table)
    }

    removeTable = (table)=>{
        this.diagram.model.removeNodeData(table)
    }


    setData(models, linksModels){
         return goStruct(go.GraphLinksModel,
            {
                copiesArrays: false,
                copiesArrayObjects: false,
                nodeDataArray: models,
                linkDataArray: linksModels
            });
    }

    convertIco(v) {
        switch (v) {
            //url('/img/background-1.png')
            case "pk": return "/img/pk.svg";
            case "fk": return "/img/fk.svg";
            case "private": return "-";
            case "protected": return "#";
            case "package": return "~";
            default: return '';
        }
    }

    convertIsTreeLink(r) {
        return r === "generalization";
    }

    /** http://localhost/outros/gojs/extensions/Arrowheads.js */
    /** LinePerson | LineBackwardPerson | LineCirclePerson | CircleLinePerson */
    /** one-to-one | one-to-many | many-to-many */
    /** one | many | one-and-only-one | zero-or-one | one-or-many | zero-or-many */
    convertFromArrow(r) {
        switch (r) {
            case "one-to-one": return "LinePerson";
            case "one-to-many": return "LinePerson";
            case "many-to-many": return "LinePerson";

            case "one": return "Line";
            case "many": return "BackwardFork";
            case "one-and-only-one": return "DoubleLine";
            case "zero-or-one": return "LineCircle";
            case "one-or-many": return "BackwardLineFork";
            case "zero-or-many": return "BackwardCircleFork";

            case "teste": return "LineCirclePerson";

            default: return "";
        }
    }

    /** http://localhost/outros/gojs/extensions/Arrowheads.js */
    /** one-to-one | one-to-many | many-to-many */
    /** one | many | one-and-only-one | zero-or-one | one-or-many | zero-or-many */
    convertToArrow(r) {
        switch (r) {

            case "one-to-one": return "LineBackwardPerson";
            case "one-to-many": return "Fork";
            case "many-to-many": return "Fork";

            case "one": return "Line";
            case "many": return "Fork";
            case "one-and-only-one": return "DoubleLine";
            case "zero-or-one": return "CircleLine";
            case "one-or-many": return "LineFork";
            case "zero-or-many": return "CircleFork";

            case "teste": return "CircleLinePerson";

            default: return "";
        }
    }

    /** ############################################################################################################################ */


    /** @var Diagram Responsável por armazenar a estrutura com as novas declarações. */
    getStructure(){
        return goStruct(go.Diagram, "canvas", {
            allowDelete: false,
            allowCopy: false,
            "undoManager.isEnabled": true,
            initialScale: 1.0,
            minScale: 0.5,

            /** Dimensiona o diagrama para caber uniformemente na viewport */
            /*autoScale: go.Diagram.Uniform,*/

            //layout: goStruct(go.ForceDirectedLayout),
            /*layout: goStruct(go.TreeLayout,
                { // this only lays out in trees nodes connected by "generalization" links
                    angle: 90,
                    path: go.TreeLayout.PathSource,  // links go from child to parent
                    setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                    setsChildPortSpot: false,  // keep Spot.AllSides
                    // nodes not connected by "generalization" links are laid out horizontally
                    arrangement: go.TreeLayout.ArrangementHorizontal,
                })*/
        })
    }

    getNodeTemplate(){
        return goStruct(go.Node, "Auto",
            {
                locationSpot: go.Spot.Center,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                shadowOffset: new go.Point(10, 10),
                shadowColor: "rgba(0,0,0,.15)",
                isShadowed: true,

                selectionAdorned: true,
                /*selectionAdornmentTemplate: new go.Adornment("Auto", {
                    margin: 10,
                    background: "red"
                })*/

            },
            new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),


            goStruct(go.Shape, 'RoundedRectangle',
                {
                    fill: "rgb(51, 86, 119)",
                    stroke: "rgb(51, 86, 119)",
                    strokeWidth: 1,
                    //doubleClick: this.callBackDoubleClick,
                    click: this.callBackDoubleClick,
                    //background: "rgb(51, 86, 119)",
                }
            ),
            goStruct(go.Panel, "Table",

                {
                    stretch: go.GraphObject.Fill,
                    defaultRowSeparatorStroke: "rgb(51, 86, 119)",
                    //doubleClick: this.callBackDoubleClick,
                    click: this.callBackDoubleClick,
                    background: "rgb(51, 86, 119)",
                },

                goStruct(go.RowColumnDefinition, {
                    row: 0,
                    background: 'rgb(51, 86, 119)',
                    separatorStrokeWidth: 0,
                }),

                goStruct(go.RowColumnDefinition, {
                    row: 1,
                    background: 'rgb(255,255,255)',
                    separatorStrokeWidth: 0,
                }),

                goStruct(go.RowColumnDefinition, {
                    row: 2,
                    background: 'rgb(255,255,255)',
                    separatorStrokeWidth: 0,
                }),
                goStruct(go.RowColumnDefinition, {
                    row: 3,
                    background: 'rgb(255,255,255)',
                    separatorStrokeWidth: 0,
                }),

                // header
                goStruct(go.TextBlock,
                    {
                        row: 0,
                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(7, 0, 7, 10),
                        alignment: go.Spot.LeftCenter,
                        font: "bold 11pt system-ui",
                        width: 250,
                        //minWidth: 100,
                        isMultiline: false,
                        editable: false,
                        stroke: "white",
                    },
                    new go.Binding("text", "name").makeTwoWay(),
                ),


                /***********************************
                 * Atributos
                 **********************************/
                goStruct(go.TextBlock, "Attributes",
                    {
                        row: 1,
                        //  alignment: go.Spot.LeftCenter,
                        font: "bold 12pt system-ui",
                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(5, 5, 5, 5),  // leave room for Button
                    },
                    new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("ATTRIBUTES")
                ),

                goStruct(go.Panel, "Vertical",
                    {
                        name: "ATTRIBUTES"
                    },
                    new go.Binding("itemArray", "attributes"),
                    {
                        row: 1,
                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(20, 0, 10, 10),
                        stretch: go.GraphObject.Fill,
                        defaultAlignment: go.Spot.Left,
                        itemTemplate: this.getAtrributeTemplate(),
                    }
                ),
                  goStruct("PanelExpanderButton", "ATTRIBUTES",
                      {
                          row: 1,
                          column: 1,
                          alignment: go.Spot.TopRight,
                          visible: false,
                      },
                      new go.Binding("visible", "attributes", function (arr) { return arr.length > 0; })
                  ),


                /***********************************
                 * Methods
                 **********************************/
                goStruct(go.TextBlock, "Methods",
                    {
                        row: 2,
                        //alignment: go.Spot.Center,
                        font: "bold 12pt system-ui",
                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(5, 5, 5, 5),  // leave room for Button

                    },
                    new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS")
                ),

                goStruct(go.Panel, "Vertical",
                    {
                        name: "METHODS",
                    },
                    new go.Binding("itemArray", "methods"),
                    {
                        row: 2,

                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(20, 0, 10, 10),
                        stretch: go.GraphObject.Fill,
                        defaultAlignment: go.Spot.Left,
                        itemTemplate: this.getMethodTemplate(),
                        visible: false,
                    }
                ),

                goStruct("PanelExpanderButton", "METHODS",
                    {
                        row: 2,
                        column: 1,
                        alignment: go.Spot.TopRight,
                        visible: false,
                    },
                    //new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
                    new go.Binding("visible", "methods")
                ),


                /***********************************
                 * Relationship
                 **********************************/
                goStruct(go.TextBlock, "Relationship",
                    {
                        row: 3,
                        //alignment: go.Spot.Center,
                        font: "bold 12pt system-ui",
                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(5, 5, 5, 5),  // leave room for Button

                    },
                    new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("RELATIONSHIP")
                ),

                goStruct(go.Panel, "Vertical",
                    {
                        name: "RELATIONSHIP",
                    },
                    new go.Binding("itemArray", "relationship"),
                    {
                        row: 3,

                        /** TOP - RIGHT - BOTTON - LEFT   */
                        margin: new go.Margin(20, 0, 10, 10),
                        stretch: go.GraphObject.Fill,
                        defaultAlignment: go.Spot.Left,
                        itemTemplate: this.getRelationshipTemplate(),
                        visible: false,

                    }
                ),

                goStruct("PanelExpanderButton", "RELATIONSHIP",
                    {
                        row: 3,
                        column: 1,
                        alignment: go.Spot.TopRight,
                        visible: false,
                    },
                    new go.Binding("visible", "relationship", function (arr) { return arr.length > 0; })
                    //new go.Binding("visible", "relationship")
                ),






            ));


    }


    /** the template for each attribute in a node's array of item data */
    getAtrributeTemplate(){
        return goStruct(go.Panel, "Table",
            // property ico/access
            goStruct(go.RowColumnDefinition, {
                row: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 1,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 2,
            }),
            goStruct(go.Picture,
                {
                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(0, 5, 5, 0),
                    column: 0,
                    width: 12,
                    height: 12,

                },
                new go.Binding("source", "ico", this.convertIco)
            ),

            goStruct(go.TextBlock,
                {
                    column: 1,
                    wrap: go.TextBlock.None,

                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(0, 20, 5, 0),
                    width: 120,
                    isMultiline: false,
                    editable: false,
                    //textAlign: 'leftCenter',
                    font: " 11pt system-ui",
                    stroke: '#212529'
                },
                new go.Binding("text", "name").makeTwoWay(),
                new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })
            ),

            goStruct(go.TextBlock,
                {
                    column: 2,
                    wrap: go.TextBlock.None,

                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(0, 0, 5, 0),
                    width: 100,
                    isMultiline: false,
                    editable: false,
                    textAlign: 'right',
                    font: " 11pt system-ui",
                    stroke: '#212529'
                },
                new go.Binding("text", "type").makeTwoWay()
            ),

        );
    }

    getMethodTemplate(){
        return goStruct(go.Panel, "Table",
            goStruct(go.RowColumnDefinition, {
                row: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 0,
            }),
            goStruct(go.TextBlock,
                {
                    column: 0,
                    wrap: go.TextBlock.None,
                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(0, 20, 5, 0),
                    isMultiline: false,
                    width: 240,
                    editable: false,
                    //textAlign: 'leftCenter',
                    font: "bold 11pt system-ui",
                    stroke: 'rgb(51, 86, 119)'
                },
                new go.Binding("text", "name", function (item) { return item + '()'; }).makeTwoWay(),
            ),

        );
    }


    getRelationshipTemplate(){
        return goStruct(go.Panel, "Table",
            goStruct(go.RowColumnDefinition, {
                row: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 1,
            }),

            goStruct(go.TextBlock,
                {
                    column: 0,
                    wrap: go.TextBlock.None,
                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(0, 20, 5, 0),
                    isMultiline: false,
                    width: 120,
                    editable: false,
                    //textAlign: 'leftCenter',
                    font: "bold 11pt system-ui",
                    stroke: 'rgb(51, 86, 119)'
                },
                new go.Binding("text", "name").makeTwoWay(),
            ),

            goStruct(go.TextBlock,
                {
                    column: 1,
                    wrap: go.TextBlock.None,
                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(0, 0, 5, 0),
                    isMultiline: false,
                    editable: false,
                    width: 120,
                    //textAlign: 'right',
                    font: "bold 11pt system-ui",
                    stroke: 'rgb(51, 86, 119)'
                },
                new go.Binding("text", "name").makeTwoWay(),
            ),


        );
    }

/*    getRelationshipTemplate(){
        return goStruct(go.Panel, "Table",
            goStruct(go.RowColumnDefinition, {
                row: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 0,
            }),
            goStruct(go.RowColumnDefinition, {
                column: 1,
            }),
            goStruct(go.TextBlock,
                {
                    column: 0,
                    wrap: go.TextBlock.None,
                    /!** TOP - RIGHT - BOTTON - LEFT   *!/
                    isMultiline: false,
                    editable: false,
                    textAlign: 'leftCenter',
                    font: "bold 11pt system-ui",
                    stroke: 'rgb(51, 86, 119)'
                },
                new go.Binding("text", "from", function (item) { return item + ' '; }).makeTwoWay(),
            ),
            goStruct(go.TextBlock,
                {
                    column: 1,
                    wrap: go.TextBlock.None,
                    /!** TOP - RIGHT - BOTTON - LEFT   *!/
                    //margin: new go.Margin(0, 20, 5, 0),
                    isMultiline: false,
                    editable: false,
                    textAlign: 'leftCenter',
                    font: "bold 11pt system-ui",
                    stroke: 'rgb(51, 86, 119)'
                },
                new go.Binding("text", "to", function (item) { return item + ''; }).makeTwoWay(),
            ),




        );
    }*/


    getLinkTemplate(){
        return goStruct(go.Link,
            {
                // routing: go.Link.Orthogonal,
                selectionAdorned: true,
                layerName: "Foreground",
                reshapable: true,
                routing: go.Link.AvoidsNodes,
                corner: 5,
                curve: go.Link.JumpOver,
            },

            new go.Binding("isLayoutPositioned", "relationship", this.convertIsTreeLink),

            //.add(new go.Shape.defineArrowheadGeometry("xx", "m 0,4 l 8,0 m -8,0 l 8,-4 m -8,4 l 8,4")),
            //new go.Shape.defineArrowheadGeometry("xx", "m 0,4 l 8,0 m -8,0 l 8,-4 m -8,4 l 8,4"),

            goStruct(go.Shape,{
                stroke: "rgb(51, 86, 119)",
                strokeWidth: 2.5,
            }),

            goStruct(go.Shape,
                {
                    scale: 2.0,
                    fill: "white",
                    stroke: "rgb(51, 86, 119)",
                    segmentOffset: new go.Point(-2, 0),

                },
                new go.Binding("fromArrow", "relationship", this.convertFromArrow)
            ),

            goStruct(
                go.TextBlock, // Linha Label
                {
                    //textAlign: "centter",
                    font: "bold 14px sans-serif",
                    stroke: "rgb(51, 86, 119)",
                    segmentIndex: 0,
                    segmentOffset: new go.Point(30, -30),
                    segmentOrientation: go.Link.OrientUpright45,

                },
                new go.Binding("text", "text")
            ),


            goStruct(go.Shape,
                {
                    scale: 2.0,
                    fill: "white",
                    stroke: "rgb(51, 86, 119)",
                    segmentOffset: new go.Point(2, 0),
                },
                new go.Binding("toArrow", "relationship", this.convertToArrow),
            ),

            goStruct(
                go.TextBlock, // Linha To Label
                {
                    //textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "rgb(51, 86, 119)",
                    segmentIndex: -1,
                    segmentOffset: new go.Point(-30, -20),
                    segmentOrientation: go.Link.OrientUpright45,
                },
                new go.Binding("text", "toText")
            )



        );
    }



}

export default DiagramDefinition