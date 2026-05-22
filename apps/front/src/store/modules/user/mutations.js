import sessionStorage from "../../../services/session-storage";
import {TOKEN_NAME} from "../../../configs/api";



const mutations = {
    SET_USER(state, user){
        //sessionStorage.setObject('user', user)
        state.items.user = user
    },
    SET_AUTHENTICATED(state){
        state.items.authenticated = true
    },
    SET_UNAUTHENTICATED(state){
        state.items.authenticated = false
        state.items.user = false
        sessionStorage.remove(TOKEN_NAME)
    }

}

export default mutations