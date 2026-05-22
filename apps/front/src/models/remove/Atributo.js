import {v4 as uuidv4} from "uuid";

class Atributo {

    constructor(nome  = '', campo = '', tipo = '', chavePrimaria=false) {

        /** Atributes Canvas */
        this.key = uuidv4();
        this.ico = ""

        /** Atributes Model */
        this.nome = nome
        this.campo = campo
        this.tipo = tipo
        this._chavePrimaria = chavePrimaria;
        this.chaveEstrangeira = false

        this.nulo = false
        this.unico = false
        this.indice = false
        this.valorPadrao = ""
        this.precisao = 0.0
        this.escala = 0.0
        this.tamanho = 0
        this.setIco()
    }

    set chavePrimaria(value) {
        this._chavePrimaria = value;
        this.setIco()
    }

    get chavePrimaria() {
        return this._chavePrimaria;
    }

    setIco(){
        if(this.nulo === true)
            this.ico = "nulo"

        if(this.chaveEstrangeira === true)
            this.ico = "fk"

        if(this._chavePrimaria === true)
            this.ico = "pk"
    }
}

export default Atributo