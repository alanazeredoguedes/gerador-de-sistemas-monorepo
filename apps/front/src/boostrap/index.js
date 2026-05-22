import axios from 'axios'
import { URI_BASE_API, API_VERSION, TOKEN_NAME } from '../configs/api'
import interceptors from "../services/interceptors";
import sessionStorage from "../services/session-storage";
import router from "../router";
import store from "../store";
import {functions} from "../functions/import";

axios.defaults.baseURL = `${URI_BASE_API}/${API_VERSION}`

axios.interceptors.request.use((config) =>{
    const token = sessionStorage.get(TOKEN_NAME)
    if(token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
},(error)=>{
    return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
    // Qualquer código de status que esteja dentro de 2xx fará com que essa função seja acionada
    // Faça algo com os dados de resposta

    return response;
}, function (error) {
    const token = sessionStorage.get(TOKEN_NAME)

    if (error.response.status === 401 && token) {
        store.commit("SET_UNAUTHENTICATED")
        /*sessionStorage.remove(TOKEN_NAME)
        router.push({name: 'login'})*/
        //const response = await refreshToken(error);
        //return response;
    }
    if (error.response.status === 403) {
        let message = error.response.data.message
        functions.alerts.notification('error', "Erro", message)
    }

    return Promise.reject(error);
});



export { axios }


