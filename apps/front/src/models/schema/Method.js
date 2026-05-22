import {v4 as uuidv4} from "uuid";

class Method {

    constructor(name = "", description = "", assinatura = []) {
        /** Atributes Canvas */
        this.key = uuidv4()

        /** Atributes Model */
        this.name = name
        this.description = description
        this.assinatura = assinatura
    }

}

export default Method