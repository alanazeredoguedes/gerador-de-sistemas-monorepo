import {v4 as uuidv4} from "uuid";
import Atributo from "./Atributo";

class Relacionamento {

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

export default Relacionamento