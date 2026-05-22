import {v4 as uuidv4} from "uuid";

/**
 * Classe Responsavel por representar os {ATRIBUTOS} da classe e {CAMPOS} da tabela.
 */
class Attribute {

    constructor(attributeName = '', fieldName ='', type ='', primaryKey = false, foreingKey=false, typeForeingKey = false, relationshipId ) {

        /** Atributes Canvas */
        this.key = uuidv4()
        this.ico = ""

        /** Atributes Model */
        this.attributeName = attributeName
        this.fieldName = fieldName
        this.type = type

        this.primaryKey = primaryKey

        this.foreingKey = foreingKey
        this.typeForeingKey = typeForeingKey
        //this.relationshipId = relationshipId

        this.attributeSearch = false
        this.autoGenerate = false
        this.nullable = false
        this.unique = false
        this.precision = false
        this.scale = false
        this.length = false
        this.lengthMax = false
        this.lengthMin = false

        this.setIco()
    }

    setIco(){
        this.ico = ""

        if(this.nullable === true)
            this.ico = "nulo"

        if(this.foreingKey === true)
            this.ico = "fk"

        if(this.typeForeingKey === "owningSide")
            this.ico = "fkOwning"

        if(this.primaryKey === true)
            this.ico = "pk"
    }

}



export default Attribute