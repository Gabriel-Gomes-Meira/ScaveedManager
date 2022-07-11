<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Models Notifications'"
  :ViewCreate="'/notification_models/create'"
  :LongItems="['message']"
  :MainAtt="'message'"
  :ModelApi="'/notification_model/'"
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
                text: "Mensagem",
                value: "message"
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
        this.$axios.get('/notification_model/').then(response => {
            this.Data = response.data
            setTimeout(this.stopLoading, 750)                        
        })
    }

}
</script>

<style>

</style>