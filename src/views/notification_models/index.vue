<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Models Notifications'"
  :ViewCreate="'/notification_models/create'"
  :LongItems="['message']"
  :MainAtt="'message'"
  :ModelApi="'/notification_models/'"
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
                text: "Listen",
                value: "listen_name"
            },{
                text: "Mensagem",
                value: "message"
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
            this.$axios.get('/notification_models/').then(response => {
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