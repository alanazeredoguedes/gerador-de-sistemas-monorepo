import {v4 as uuidv4} from "uuid";
import Atributo from "./Atributo";

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

export default AssociativeModel