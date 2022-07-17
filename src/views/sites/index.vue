<template>
  <table-model 
  :Data="Data"
  :Headers="Headers"
  :Model="'Site'"
  :ViewCreate="'/sites/create'"
  :LongItems="['url']"
  :MainAtt="'name'"
  :ModelApi="'/sites/'"
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
            this.$axios.get('/sites/').then(response => {
                this.Data = response.data
                setTimeout(this.stopLoading, 750)            
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