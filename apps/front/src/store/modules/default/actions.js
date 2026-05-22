import axios from "axios";
import { API_VERSION } from "@/configs/api";

const RESOURCE = '/cursos'

const actions = {
    getCursos({ commit }){
        //return axios.get(`${API_VERSION}/${RESOURCE}`)
        return axios.get(`https://provas.alanguedes.com.br/api/cursos`)
            .then( response => commit('SET_CURSO', response.data) )
    }
}

export default actions
