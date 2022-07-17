<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Listen'"
  :ViewCreate="'/listens/create'"
  :LongItems="['url']"
  :MainAtt="'name'"
  :ModelApi="'/listens/'"
  @remove="cutSource"
  @refresh="apiGet"></table-model>
</template>

<script>
import TableModel from '@/components/table_model.vue'
import {mapMutations} from "vuex"

export default {
    
    data () {
        return {
            Headers:[{
                text: "Name",
                value: "name"
            },{
                text: "URL",
                value: "url"
            },{
                text: "Site",
                value: "site_name"
            },{
                text: "Ações",
                value: "_id",
                align: "end"
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
            this.Data.splice(index,1);
        },
        apiGet(){
            this.$axios.get('/listens/').then(response => {
                this.Data = response.data            
                this.stopLoading()            
            })
        }
    },

    created(){
        this.startLoading()
        this.apiGet()
    }

}
</script>

<style>

</style>