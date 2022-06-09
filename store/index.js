export const state = () => ({
    updatingItem:{}
})

export const getter = {
    getUpdatingItem(state) {
        return state.updatingItem
    }
}
  
export const mutations = {
    setUpdatingItem(state, value) {
        state.updatingItem = value
    }
}
  
// export const actions = {
    
// }
