import sessionStorage from "../../../services/session-storage";
import {TOKEN_NAME} from "../../../configs/api";
const state =  {
    items: {
        user: null,
        //user: sessionStorage.getObject('user'),
        authenticated: sessionStorage.get(TOKEN_NAME, null) !== null,
    }
}

export default state
