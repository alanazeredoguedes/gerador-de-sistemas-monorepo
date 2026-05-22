import { v4 as uuidv4 } from 'uuid';

class Project {

    constructor(name, description, models =[], relationships =[]) {
        /** Atributes Canvas */
        this.key = uuidv4();
        this.name = name;
        this.description = description;
        this.models = models;
        this.relationships = relationships;
    }

}


class Model {

    constructor(name, collection, table, location, attributes = [], methods = [], relationships = []) {

        /** Atributes Canvas */
        this.key = uuidv4();
        this.location = location;

        /** Atributes Model */
        this.name = name
        this.collection = collection
        this.table = table

        this.attributes = attributes;
        this.methods = methods;
        this.relationship = relationships
    }

    name = '';
    collection = '';
    table = '';

    description = '';
    hasTimeStamp = false
    usesSoftDeletes = false
    attributes = []
    methods = []


    addTimeStamp(){
        let created_at = new Attributes('created_at', 'datetime','', true )
        let updated_at = new Attributes('updated_at', 'datetime','',true )

        created_at.dontShow = true;
        updated_at.dontShow = true;

        this.attributes.push(created_at)
        this.attributes.push(updated_at)
        this.hasTimeStamp = true;
    }

    removeTimeStamp = () => {

        this.attributes.map( (attribute, index) => {
            if( ( (attribute.name === 'updated_at' || attribute.name === 'created_at') && attribute.dontShow === true) ){
                this.attributes.splice(index, 1)
            }
        })

        this.hasTimeStamp = false;
    }

    removeAttributeByName = (name) => {
        this.attributes.map( (attribute, index) => {
            (attribute.name === name) ? this.attributes.splice(index, 1) : '';
        })
    }

    removeAttributeById = (id) => {
        this.attributes.map( (attribute, index) => {
            (attribute.key === id) ? this.attributes.splice(index, 1) : '';
        })
    }

    findAttributeById = (id) => {
        return this.attributes.findIndex( (attribute) => {  return attribute.key === id })
    }

    findAttributeByName = (name) => {
        return this.attributes.findIndex( (attribute) => {  return attribute.name === name })
    }

    findAttributesByName = (name) => {

        return this.attributes.reduce(function(list, attribute, index) {
            (attribute.name === name) ? list.push(index) : null

            return list;
        }, []);

    }
}

class AssociativeModel {

    constructor(name, collection, table, location, attributes = [], methods = [], relationships = []) {

        /** Atributes Canvas */
        this.key = uuidv4();
        this.location = location;

        /** Atributes Model */
        this.name = name
        this.collection = collection
        this.table = table

        this.attributes = attributes;
        this.methods = methods;
        this.relationship = relationships
    }

    name = '';
    collection = '';
    table = '';

    description = '';
    hasTimeStamp = false
    usesSoftDeletes = false
    attributes = []
    methods = []

}

class Attributes {

    constructor(name  = '', type = '', ico = '', nullable = false ) {

        /** Atributes Canvas */
        this.key = uuidv4();
        this.type = type;
        this.ico = ico;

        /** Atributes Model */
        this.name = name;
        this.nullable = nullable
    }

    name = ''
    type = ''
    unique = false
    index = false
    hidden = false
    fillable = false
    defaultValue = ''
    length = ''
    pk = ''
    fk = ''
    precision = ''
    scale = ''
    dontShow = false
}

class Methods {

    constructor(name, description ='') {
        /** Atributes Canvas */
        this.key = uuidv4();

        /** Atributes Model */
        this.name = name
        this.description = description
    }


}

class Relationships {

    constructor(from, to, text ='', toText='', relationship='') {
        /** Atributes Canvas */
        this.key = uuidv4();
        this.from = from;
        this.to = to;
        this.text = text;
        this.toText = toText;
        this.relationship = relationship;
    }

}




export { Project, Model, AssociativeModel, Attributes, Methods, Relationships}

