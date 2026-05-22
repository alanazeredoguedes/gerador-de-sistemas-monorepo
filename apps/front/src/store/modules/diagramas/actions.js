import axios from "axios";
import { API_VERSION, URI_BASE_API } from "../../../configs/api";

const RESOURCE = '/diagram'

const actions = {
    getDiagramas({ commit }){
        return axios.get(`${RESOURCE}`)
            .then( response => commit('SET_DIAGRAMAS', response.data) )

    },
    getDiagramasTemplate({ commit }){
        return axios.get(`${RESOURCE}/listTemplates`)
            .then( response => commit('SET_DIAGRAMAS_TEMPLATE', response.data) )

    },
    getDiagrama({ commit },id){
        return axios.get(`${RESOURCE}/${id}`)
            .then( response => commit('SET_DIAGRAMA', response.data) )

    },
    createDiagrama({commit}, data){
        //console.log(data)
        return axios.post(`${RESOURCE}`, data)
            //.then( response => console.log(response.data) /*commit('SET_DIAGRAMA', response.data)*/ )
    },
    removeDiagrama({commit}, id){
        //console.log(data)
        return axios.delete(`${RESOURCE}/${id}`)
    },
    updateDiagrama({commit}, data){
        //console.log(data)
        return axios.put(`${RESOURCE}/${data.id}`, data.data)
            //.then( response => console.log(response.data) /*commit('SET_DIAGRAMA', response.data)*/ )
    }

}

export default actions
