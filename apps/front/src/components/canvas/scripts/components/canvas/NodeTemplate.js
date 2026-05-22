/** @const Responsável por armazenar a estrutura utilizado na biblioteca. */
const goStruct = go.GraphObject.make;  // for conciseness in defining templates

export default function NodeTemplate() {
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
                doubleClick: this.callBackDoubleClick,
                //background: "rgb(51, 86, 119)",
            }
        ),
        goStruct(go.Panel, "Table",

            {
                stretch: go.GraphObject.Fill,
                defaultRowSeparatorStroke: "rgb(51, 86, 119)",
                doubleClick: this.callBackDoubleClick,
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


            // properties
            goStruct(go.TextBlock, "Atributos",
                {
                    row: 1,
                    //  alignment: go.Spot.LeftCenter,
                    font: "bold 12pt system-ui",
                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(5, 5, 5, 5),  // leave room for Button
                },
                new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")
            ),

            goStruct(go.Panel, "Vertical",
                {
                    name: "PROPERTIES"
                },
                new go.Binding("itemArray", "properties"),
                {
                    row: 1,
                    /** TOP - RIGHT - BOTTON - LEFT   */
                    margin: new go.Margin(20, 0, 10, 10),
                    stretch: go.GraphObject.Fill,
                    defaultAlignment: go.Spot.Left,
                    itemTemplate: this.getItemTemplate(),
                }
            ),
            goStruct("PanelExpanderButton", "PROPERTIES",
                {
                    row: 1,
                    column: 1,
                    alignment: go.Spot.TopRight,
                    visible: false,
                },
                new go.Binding("visible", "properties", function (arr) { return arr.length > 0; })
            ),
            // methods
            goStruct(go.TextBlock, "Relacionamentos",
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
                }
            ),

            goStruct("PanelExpanderButton", "METHODS",
                {
                    row: 2,
                    column: 1,
                    alignment: go.Spot.TopRight,
                    visible: false,
                },
                new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
        ));
}