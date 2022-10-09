import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state(){
        return {
            updatingItem:null,
            pageLoading:false,
            userSettings:null,
            snackConfig:{
                active:false,
                message:"",
                color:"black",
                timeout:2000
            }
        }
    },

    getters: {
        getUpdatingItem(state) {
            return state.updatingItem
        },
    
        loading(state){
            return state.pageLoading
        },
    
        updating(state){
            return !!state.updatingItem && !!state.updatingItem.id 
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
    },

    mutations: {
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
            state.snackConfig.active = false;
            setTimeout(() => {
                state.snackConfig = value;                    
            }, 750)
        },
    
        hiddenSnackBar(state){
            state.snackConfig.active = false;
        }
    }

})

  


export default store