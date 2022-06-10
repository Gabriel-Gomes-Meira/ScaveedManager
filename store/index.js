export const state = () => ({
    updatingItem:{}
})

export const getters = {
    getUpdatingItem(state) {
        return state.updatingItem
    }
}
  
export const mutations = {
    setUpdatingItem(state, value) {
        console.log(state, value)
        state.updatingItem = value
    }
}
  
// export const actions = {
    
// }
