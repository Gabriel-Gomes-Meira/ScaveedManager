<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Model Tasks'"
  :ViewCreate="'/model_tasks/create'"  
  :MainAtt="'file_name'"
  :ModelApi="'/task/'"
  :Agroupment="'listend_id'"></table-model>
</template>

<script>
import TableModel from '../table_model.vue'
import {mapMutations} from "vuex"

export default {
    
    data () {
        return {
            Headers:[{
                text: "Listen",
                value: "listen"
            },{
                text: "File Name",
                value: "file_name"
            },{
                text: "Ações",
                value: "_id"
            }],
            Data:[]
        }
    },

    components:{
        TableModel
    },

    methods:{
        ...mapMutations({
            stopLoading: "stopLoading",
            startLoading: "startLoading"
        })
    },

    created(){
        this.startLoading()
        this.$axios.get('/task/').then(response => {
            this.Data = response.data            
            this.$axios.get('/listens/').then(resp => {
                this.Data.forEach(ele => {
                    let match = resp.data.find(r => r._id.$oid == ele.listen_id.$oid)
                    ele["listen"] = match.name                    
                })
                setTimeout(this.stopLoading, 750)            
            })  
        })
    }

}
</script>

<style>

</style>