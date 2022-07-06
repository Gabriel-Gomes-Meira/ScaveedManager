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
import TableModel from '../table_model.vue'
import {mapMutations} from "vuex"

export default {
    
    data () {
        return {
            Headers:[{
                text: "Listen",
                value: "listen"
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
            this.$axios.get('/listens/').then(resp => {
                this.Data.forEach(ele => {
                    let match = resp.data.find(r => r._id.$oid == ele.listen_id.$oid)
                    ele["listen"] = match?match.name:""                   
                })
                setTimeout(this.stopLoading, 750)            
            })  
        })
    }

}
</script>

<style>

</style>