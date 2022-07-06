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
import TableModel from '../table_model.vue'
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
                value: "site"
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
        this.$axios.get('/listens/').then(response => {
            this.Data = response.data
            this.$axios.get('/sites/').then(resp => {
                this.Data.forEach(ele => {
                    let match = resp.data.find(r => r._id.$oid == ele.site_id.$oid)
                    ele["site"] = match?match.name:""
                })
                setTimeout(this.stopLoading, 750)            
            })  
        })
    }

}
</script>

<style>

</style>