import {v4 as uuidv4} from "uuid";

/**
 * Classe Responsavel por representar os {RELACIONAMENTOS}.
 */
class Relationship {

    constructor(from, to, typeRelationship, typeAssociation, attributeOwningSide = '', attributeInverseSide = '',  ) {
        /** Atributes Canvas */
        this.key = uuidv4();

        /**
         * Este é o lado inverso.
         * ex: Autor um-para-muitos Documento
         * Autor
         */
        this.from = from;

        /**
         * Este é o lado proprietário.
         * ex: Autor um-para-muitos Documento
         * Documento
         */
        this.to = to;

        /**
         * one-to-one
         * one-to-many
         * many-to-many
         */
        this.typeRelationship = typeRelationship

        /**
         * self-referencing
         * unidirectional
         * bidirectional
         */
        this.typeAssociation = typeAssociation

        /** Atributo gerado no lado proprietario */
        this.attributeOwningSide = attributeOwningSide

        /** Atributo gerado no lado inverso */
        this.attributeinverseSide = attributeInverseSide





    }



}

export default Relationship