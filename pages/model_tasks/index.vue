<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Model Tasks'"
  :ViewCreate="'/model_tasks/create'"  
  :MainAtt="'file_name'"
  :ModelApi="'/task/'"
  :Agroupment="'listend_id'"
  @remove="cutSource"></table-model>
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
        }),
        cutSource(index){
            console.log(index)
            this.Data.splice(index,1);
        }
    },

    created(){
        this.startLoading()
        this.$axios.get('/task/').then(response => {
            this.Data = response.data            
            this.$axios.get('/listens/').then(resp => {
                this.Data.forEach(ele => {
                    let match = resp.data.find(r => r._id.$oid == ele.listen_id.$oid)
                    ele["listen"] = match?match.name:""         
                })
                setTimeout(this.stopLoading, 750)            
            })  
        })
    }

}
</script>

<style>

</style>