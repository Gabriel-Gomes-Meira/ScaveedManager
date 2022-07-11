<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Listen'"
  :ViewCreate="'/listens/create'"
  :LongItems="['url']"
  :MainAtt="'name'"
  :ModelApi="'/listens/'"
  @remove="cutSource"></table-model>
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
            this.Data.splice(index,1);
        }
    },

    created(){
        this.startLoading()
        this.$axios.get('/listens/').then(response => {
            this.Data = response.data            
            this.stopLoading()            
        })
    }

}
</script>

<style>

</style>