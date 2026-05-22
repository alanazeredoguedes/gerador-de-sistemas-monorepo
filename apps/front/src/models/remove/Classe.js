import {v4 as uuidv4} from "uuid";
import Atributo from "./Atributo";

class Classe {

    constructor(nome, tabela, descricao = "", attributes = [], methods = [], posicao = "-891.238576250846 -255.95561447143552") {

        /** Atributes Canvas */
        this.key = uuidv4();
        this.posicao = posicao

        /** Atributes Model */
        this.nome = nome
        this.tabela = tabela
        this.descricao = descricao
        this.timeStamp = true
        this.attributes = attributes;
        this.methods = methods;
    }
}

export default Classe