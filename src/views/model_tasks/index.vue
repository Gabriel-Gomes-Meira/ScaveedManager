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
import TableModel from '@/components/table_model.vue'
import {mapMutations} from "vuex"

export default {
    
    data () {
        return {
            Headers:[{
                text: "Listen",
                value: "listen_name"
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
            setTimeout(this.stopLoading, 750)            
        })
    }

}
</script>

<style>

</style>