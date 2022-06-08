<template>
  <table-model 
  :Data="Data"
  :Headers="Headers"
  :Model="'Site'"
  :ViewCreate="'/sites/create'"></table-model>
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
        this.$axios.get('/sites/').then(response => {
            this.Data = response.data
        })
    }

}
</script>

<style>

</style>