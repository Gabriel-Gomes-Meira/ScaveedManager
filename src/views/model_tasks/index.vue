<template>
  <table-model  
  :Data="Data"
  :Headers="Headers"
  :Model="'Model Tasks'"
  :ViewCreate="'/model_tasks/create'"  
  :MainAtt="'file_name'"
  :ModelApi="'/tasks/'"  
  @remove="cutSource"
  @refresh="apiGet">
    <template v-slot:extra-action="prop">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                small
                v-on="on"
                v-bind="attrs"
                text
                dark
                @click="dialogid = prop.item.id" 
                class="ml-1 blue-grey darken-3">                    
                    <v-icon
                        small                        
                    >
                        mdi-plus-box-multiple
                    </v-icon>
                </v-btn>   
            </template>
            
            <span> 
                Adicionar à fila
            </span>
        </v-tooltip>

        <confirmation-dialog 
        :active="dialogid == prop.item.id" 
        @Closethis="dialogid = ''"
        @SendRequest="pushQueue()"
        >
            <template>
                Você tem certeza de que deseja adicionar "<b>{{prop.item.file_name}}</b>" à fila de tarefas?!
                <br>
                Saiba que tentar realizar essa ação poderá implicar em duplicação e/ou redundãncia nas suas operações.
                <br>
                <v-text-field
                label="Parâmetros"
                v-model="params"                    
                required
                color="white"
                ></v-text-field>
            </template>
        </confirmation-dialog>
    </template>
  </table-model>
</template>

<script>
import TableModel from '@/components/table_model.vue'
import {mapMutations} from "vuex"
import ConfirmationDialog from '@/components/confirmationDialog.vue'

export default {
    
    data () {
        return {
            Headers:[{
                text: "Listen",
                value: "listen_name",
                align: 'center'
            },{
                text: "Crons",
                value: "crons_names",
                align: 'center'
            },{
                text: "File Name",
                value: "file_name",
                align: 'center'
            },{
                text: "Ações",
                value: "_id",
                align: 'center'
            }],
            Data:[],
            dialogid:"",
            params:""
        }
    },

    components:{
        TableModel,
        ConfirmationDialog
    },

    methods:{
        ...mapMutations({
            stopLoading: "stopLoading",
            startLoading: "startLoading",
            setSnackBar: "setSnackBar"
        }),
        cutSource(index){
            console.log(index)
            this.Data.splice(index,1);
        },
        pushQueue(){
            this.$axios.post(`/queued_tasks/${this.dialogid}`, {
                task:{
                    params: this.params
                }
            
            }).then(() => {
                this.setSnackBar({
                        active:true,
                        timeout:2000,
                        color:"cyan darken-3",
                        message:"Tarefa enfileirada com sucesso!"
                })
                this.dialogid = "";
            })
        },
        apiGet(){
            this.$axios.get('/tasks/').then(response => {
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