<template>
  <table-model 
  :Data="Data"
  :Headers="Headers"
  :Model="'Site'"
  :ViewCreate="'/sites/create'"
  :LongItems="['url']"></table-model>
</template>

<script>
import TableModel from '../table_model.vue'


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

    created(){
        // TODO
        // loading init
        this.$axios.get('/sites/').then(response => {
            this.Data = response.data
            // TODO
            // loading end
        })
    }

}
</script>

<style>

</style>