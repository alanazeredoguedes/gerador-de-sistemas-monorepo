import {v4 as uuidv4} from "uuid";

class Assinatura {

    constructor(tipo = "", parametro = "") {
        /** Atributes Canvas */
        this.key = uuidv4();

        /** Assinatura Model */
        this.tipo = tipo
        this.parametro = parametro
    }

}

export default Assinatura