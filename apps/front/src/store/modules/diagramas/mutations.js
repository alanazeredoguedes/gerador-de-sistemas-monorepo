const mutations = {
    SET_DIAGRAMAS(state, diagramas){
        state.items.diagramas = diagramas
    },
    SET_DIAGRAMA(state, diagrama){
        //console.log(diagrama)
        state.items.diagrama = diagrama
    },
    SET_DIAGRAMAS_TEMPLATE(state, diagrama){
        //console.log(diagrama)
        state.items.diagramasTemplate = diagrama
    },

}

export default mutations