import { createStore } from "vuex";

import defaultStore from './modules/default'
import diagramaStore from './modules/diagramas'
import userStore from  './modules/user'
import programmingLanguageStore from "./modules/programmingLanguage";
import frameworkStore from "./modules/framework";
import applicationStore from "./modules/application";

const store = createStore({
    modules: {
        defaultStore: defaultStore,
        diagramaStore: diagramaStore,
        userStore: userStore,
        programmingLanguageStore: programmingLanguageStore,
        frameworkStore: frameworkStore,
        applicationStore: applicationStore,
    }
})

export default store
