<template>
  <table-model 
  :Data="Data"
  :Headers="Headers"
  :Model="'Site'"
  :ViewCreate="'/sites/create'"
  :LongItems="['url']"
  :MainAtt="'name'"
  :ModelApi="'/sites/'"
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
                text: "Açoes",
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
        this.$axios.get('/sites/').then(response => {
            this.Data = response.data
            setTimeout(this.stopLoading, 750)            
        })
    }

}
</script>

<style>

</style>