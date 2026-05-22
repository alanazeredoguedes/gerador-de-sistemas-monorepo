import {v4 as uuidv4} from "uuid";

class Metodo {

    constructor(nome = "", descricao = "", assinatura = []) {
        /** Atributes Canvas */
        this.key = uuidv4()

        /** Atributes Model */
        this.nome = nome
        this.descricao = descricao
        this.assinatura = assinatura
    }

}

export default Metodo