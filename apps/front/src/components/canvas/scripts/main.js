/** Import Components Canvas */


import DiagramDefinition from './components/_diagramStructure'

import {Project, Model, Attributes, Methods, Relationships, AssociativeModel} from './model/object'






let attributeId = new Attributes('id', 'integer', 'pk')
let attribute1 = new Attributes('nome', 'string', '')
attributeId.pk = true;

let attributeId2 = new Attributes('id', 'integer', 'pk')
let attribute2 = new Attributes('titulo', 'string', '')
attributeId2.pk = true;

// let defaultAttributes = [attributeId];

let model1 = new Model('Autor', 'Cursos', 'curso', "-891.238576250846 -255.95561447143552", [attributeId, attribute1], [], []);
model1.key = 1
model1.addTimeStamp();


let model2 = new Model('Documento', 'Documentos', 'documento', "-898.238576250846 300.0443855285645", [attributeId2, attribute2], [], []);
model2.key = 2
model2.addTimeStamp();




let foreignKeyClass1 = new Attributes(model1.name+'_id', 'integer', 'fk', true)
foreignKeyClass1.fk = true

let foreignKeyClass2 = new Attributes(model2.name+'_id', 'integer', 'fk', true)
foreignKeyClass2.fk = true

let associativeModel = new AssociativeModel(model1.name+"_"+model2.name, model1.name+"_"+model2.name, model1.name+"_"+model2.name, "-154.022847498307954 6.059765881722328" );
associativeModel.attributes.push(foreignKeyClass1)
associativeModel.attributes.push(foreignKeyClass2)

let relationClass1 = new Relationships(model1.key, associativeModel.key, '','', 'many-to-many')
let relationClass2 = new Relationships(model2.key, associativeModel.key, '','', 'many-to-many')


let linksModels = [
    /** one-to-one | one-to-many | many-to-many */
    /** one | many | one-and-only-one | zero-or-one | one-or-many | zero-or-many */
    //{ from: 1, to: 2, text: "", toText: "", relationship: "one-to-many" },
    //{ from: 1, to: 2, text: "", toText: "", relationship: "teste" },
    //{ from: 3, to: 4, text: "", toText: "", relationship: "generalization" }
];

linksModels = [relationClass1, relationClass2]



export { diagramDefinition }