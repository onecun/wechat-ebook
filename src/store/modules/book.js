const book = {
    state: {
        fileName: '',
    },
    mutations: {
        SET_FILENAME(state, newName) {
            state.fileName = newName
        },
    },
    actions: {
        setFileName({ commit, state }, newName) {
            return commit('SET_FILENAME', newName)
        },
    },
}

export default book
