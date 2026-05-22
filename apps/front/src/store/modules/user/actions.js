import axios from "axios";
import { TOKEN_NAME } from "../../../configs/api";
import sessionStorage from "../../../services/session-storage";

const RESOURCE = '/user'

const actions = {
    login({commit, dispatch }, {email, password}){
        return axios.post(`${RESOURCE}/login`, {email, password})
            .then( (response) => {
                sessionStorage.set(TOKEN_NAME, response.data.token)

                commit('SET_AUTHENTICATED')
                dispatch('getUserAuthenticated')
            })
    },
    getUserAuthenticated({commit}){
        axios.get(`${RESOURCE}/authenticated`)
            .then( response => commit('SET_USER', response.data) )
            .catch( error => commit('SET_UNAUTHENTICATED') )
    },
    createUser({commit}, { username, email, password }){
        return axios.post(`${RESOURCE}`, { username, email, password })
            //.then( response => commit('SET_USER', response.data) )
            //.catch( error => commit('SET_UNAUTHENTICATED') )
    },



}

export default actions
