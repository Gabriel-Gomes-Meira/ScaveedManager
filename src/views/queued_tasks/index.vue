<template>
    <v-container >
        <v-row>
            <v-toolbar
            color="blue-grey darken-3"
            class="pl-2 pr-4 rounded-t-lg elevation-1"
            >
                <v-toolbar-title>Queue</v-toolbar-title>
                <v-spacer></v-spacer>
                
                <v-checkbox
                v-model="syncronizing"
                label="Sincronizado"
                class="mt-5 mr-4"
                />                    
                

                <v-btn                   
                @click="feedData()"              
                icon
                :disabled="syncronizing">
                    <v-icon                
                    size="33">mdi-restore</v-icon>
                </v-btn>
            </v-toolbar>
        </v-row>
        
        <v-row v-if="tasks.length>0"
        class="mt-3 mb-0">
            <v-card tile
            color=""
            class="py-2 px-0 col-12">
                
                <v-row >
                    <v-list-item
                    v-for="task in tasks"
                    :key="task.id"
                    >
                        <v-list-item-avatar>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    
                                    <v-icon v-if="task.state =! 1"
                                    :color="status[task.state].color"
                                    dark v-text="status[task.state].icon"
                                    v-bind="attrs"
                                    v-on="on"                        
                                    /> 
                                    <v-progress-circular v-else
                                    indeterminate
                                    color="green"
                                    size="10"        
                                    v-show="true"
                                    ></v-progress-circular>
                                </template>

                                <span> 
                                    {{status[task.state].description}} 
                                </span>
                            </v-tooltip>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="task.file_name" />

                            <v-list-item-subtitle >
                                Atualizado em {{task.updated_at | formatedDate()}}                                
                            </v-list-item-subtitle>                            

                            <v-list-item-subtitle v-if="task.message_error">                                
                                <v-card
                                color="red darken-1">
                                Falhou {{task.count_erro}} veze(s) em executar!
                                <br>
                                Motivo do erro:
                                    {{task.message_error}}
                                </v-card>                                
                            </v-list-item-subtitle>

                            <v-list-item-subtitle v-if="task.state == 1">
                                <v-card
                                color="blue-grey darken-2">
                                    {{task.log}}
                                </v-card>                            
                            </v-list-item-subtitle>
                            
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="dialogid = task.id">
                                        <v-icon color="orange lighten-1">mdi-close-octagon-outline</v-icon>
                                    </v-btn>
                                </template>

                                <span>
                                    Desfileirar
                                </span>
                            </v-tooltip>
                        </v-list-item-action>

                        <v-list-item-action>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon
                                    v-bind="attrs"
                                    v-on="on"                                
                                    @click="fixup(task)">
                                        <v-icon color="lime accent-3">mdi-hammer-wrench</v-icon>
                                    </v-btn>
                                </template>

                                <span>
                                    Editar
                                </span>
                            </v-tooltip>
                        </v-list-item-action>

                        <confirmation-dialog
                        :active="dialogid == task.id"                
                        @Closethis="dialogid = ''"
                        @SendRequest="dequeue(task)">
                            <template>
                            Você tem certeza de que deseja remover a tarefa "<b>{{task.file_name}}</b>" da fila ?!                
                            <br>
                            Essa ação não poderá afetar a tarefa, se a mesma estiver em execução agora!
                        </template>
                        </confirmation-dialog>
                    </v-list-item>
                </v-row>
            </v-card>
        </v-row>

        <v-row v-else
        class="mb-0 ">
            <v-alert class="col-12
            my-0 blue-grey darken-2
            " tile>
                <v-icon> mdi-exclamation </v-icon> Não há tarefas na fila!
            </v-alert>
        </v-row>

        <v-row
        class="my-0"
        >
            <v-toolbar            
            dense
            color="blue-grey darken-3"
            class="pl-2 pr-4 rounded-b-lg elevation-1" />
        </v-row>
    </v-container>
</template>

<script>
import moment from "moment"
import confirmationDialog from "@/components/confirmationDialog.vue"
import {mapMutations, mapActions, mapGetters} from "vuex"
export default {
    data: () => ({
        tasks:[],
        status:[
            {
                icon:"mdi-progress-clock",
                color:"amber darken-1",
                description:"Waiting"
            },
            {
                icon:"mdi-progress-alert",
                color:"green darken-1",
                description:"Processing"
            },
            {
                icon:"mdi-check-bold",
                color:"light-blue darken-4",
                description:"Terminated"
            },
        ],
        dialogid: "",             
    }),    

    computed:{
        syncronizing: {
            get(){
                return this.getSyncronizing
            },
            set(value){
                this.setSyncronizing(value)
            }
        },
        ...mapGetters({
            getSyncronizing: "getSyncronizing",
        }),
    },

    created(){
        this.feedData()
        this.initSyncronizing()
        setInterval(() => {
            if (this.getSyncronizing) {
                this.feedData()
            }
        }, 1000);              
    },

    methods:{
        ...mapMutations({
          setSnackBar: "setSnackBar",
          setUpdatingItem: "setUpdatingItem",
        }),
        ...mapActions({
            setSyncronizing: "setSyncronizing",
            initSyncronizing: "initSyncronizing",
        }),
        dequeue(task){
            this.$axios.delete(`/queued_tasks/${this.dialogid}`).then(() => {
                let index = this.tasks.findIndex(ele => ele == task);
                this.tasks.splice(index,1);

                this.setSnackBar({
                        active:true,
                        timeout:2000,
                        color:"amber darken-1",
                        message:"Tarefa desfileirada com sucesso!"
                })

                this.dialogid = ""
            })
        },
        fixup(item){
            this.setUpdatingItem(item)
            this.$router.push("/model_tasks/create")
        },
        feedData(){
            this.$axios.get('/queued_tasks/').then(response => {
                this.tasks = response.data                
            })
        },        
    },

    components: { confirmationDialog },

    filters: {
        formatedDate(value){
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        }
    }
}
</script>

<style>

</style>