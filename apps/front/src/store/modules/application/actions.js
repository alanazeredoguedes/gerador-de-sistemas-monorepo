import axios from "axios";
import { API_VERSION, URI_BASE_API } from "../../../configs/api";

const RESOURCE = '/application'

const actions = {
    getApplications({ commit }){
        return axios.get(`${RESOURCE}`)
            .then( response => commit('SET_APPLICATIONS', response.data) )

    },
    getApplication({ commit },id){
        return axios.get(`${RESOURCE}/${id}`)
            .then( response => commit('SET_APPLICATION', response.data) )
    },
    createApplication({commit}, data){
        //console.log(data)
        return axios.post(`${RESOURCE}`, data)
            //.then( response => console.log(response.data) /*commit('SET_DIAGRAMA', response.data)*/ )
    },
    removeApplication({commit}, id){
        return axios.delete(`${RESOURCE}/${id}`)
    },
    updateApplication({commit}, data){
        //console.log(data)
        return axios.put(`${RESOURCE}/${data.id}`, data)
            //.then( response => console.log(response.data) /*commit('SET_DIAGRAMA', response.data)*/ )
    },
    generateApplication({ commit }, id){
        return axios.get(`${RESOURCE}/generate/${id}`)
    },
}

export default actions
