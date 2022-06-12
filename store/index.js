export const state = () => ({
    updatingItem:null,
    pageLoading:false,
})

export const getters = {
    getUpdatingItem(state) {
        return state.updatingItem
    },

    loading(state){
        return state.pageLoading
    }
}
  
export const mutations = {
    setUpdatingItem(state, value) {                
        console.log(value)
        state.updatingItem = value
    },

    startLoading(state) {
        state.pageLoading = true
    },

    stopLoading(state) {
        state.pageLoading = false
    }
}
  
// export const actions = {
    
// }
