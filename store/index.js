export const state = () => ({
    updatingItem:null,
    pageLoading:false,
    userSettings:null,
    snackConfig:{
        active:false,
        message:"",
        color:"black",
        timeout:2000
    }
})

export const getters = {
    getUpdatingItem(state) {
        return state.updatingItem
    },

    loading(state){
        return state.pageLoading
    },

    updating(state){
        return !!state.updatingItem && !!state.updatingItem._id 
    },

    userSetted(state){
        return !!state.userSettings
    },

    getUserSettings(state){
        return state.userSettings
    },

    getSnackBar(state){
        return state.snackConfig
    }
}
  
export const mutations = {
    setUpdatingItem(state, value) {                        
        state.updatingItem = value
    },

    startLoading(state) {
        state.pageLoading = true
    },

    stopLoading(state) {
        state.pageLoading = false
    },

    setUserSetting(state, value){        
        state.userSettings = value
    },

    setSnackBar(state, value){
        state.snackConfig = value
    },

    hiddenSnackBar(state){
        state.snackConfig.active = false;
    }
}

