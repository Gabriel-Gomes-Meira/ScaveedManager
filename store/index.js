export const state = () => ({
    updatingItem:null,
    pageLoading:false,
    userSettings:null,
})

export const getters = {
    getUpdatingItem(state) {
        return state.updatingItem
    },

    loading(state){
        return state.pageLoading
    },

    userSetted(state){
        return !!state.userSettings
    },

    getUserSettings(state){
        return state.userSettings
    }
}
  
export const mutations = {
    setUpdatingItem(state, value) {                
        // console.log(value)
        state.updatingItem = value
    },

    startLoading(state) {
        state.pageLoading = true
    },

    stopLoading(state) {
        state.pageLoading = false
    },

    setUserSetting(state, value){
        console.log(value)
        state.userSettings = value
    }
}
  
// export const actions = {
    
// }
