import {v4 as uuidv4} from "uuid";

/**
 * Classe Responsavel por representar as {CLASSES} e {TABELAS}
 */
class Class {

    constructor(className, tableName, description, attributes=[], methods=[], location = '' ) {

        /** Atributes Canvas */
        this.key = uuidv4()
        this.location = location //"-891.238576250846 -255.95561447143552"

        /** Atributes Model */
        this.associativeModel = false;
        this.associativeModel = false;
        this.systemModel = false

        this.className = className
        this.tableName = tableName
        this.description = description
        this.attributes = attributes
        this.methods = methods
    }

}

export default Class