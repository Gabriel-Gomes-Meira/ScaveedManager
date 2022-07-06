<template>
    <v-container>
        
        <v-card v-if="tasks.length>0"
        color="">
            <p class="text-subtitle">
                Queue
            </p>
            <v-row >
                <v-list-item
                v-for="task in tasks"
                :key="task._id.$oid"
                >
                    <v-list-item-avatar>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                :color="status[task.state].color"
                                dark v-text="status[task.state].icon"
                                v-bind="attrs"
                                v-on="on"                        
                                />
                            </template>

                            <span> 
                                {{status[task.state].description}} 
                            </span>
                        </v-tooltip>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="task.file_name"></v-list-item-title>

                        <v-list-item-subtitle >
                            Atualizado em {{new Date(task.updated_at).getDate()}}/{{new Date(task.updated_at).getMonth()}}/{{new Date(task.updated_at).getUTCFullYear()}} {{new Date(task.updated_at).getHours()}}:{{new Date(task.updated_at).getMinutes()}}:{{new Date(task.updated_at).getSeconds()}} 
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon
                                v-bind="attrs"
                                v-on="on"
                                @click="dequeue(task)">
                                    <v-icon color="orange lighten-1">mdi-close-octagon-outline</v-icon>
                                </v-btn>
                            </template>

                            <span>
                                Desfileirar
                            </span>
                        </v-tooltip>
                    </v-list-item-action>
                </v-list-item>
            </v-row>
        </v-card>
        <v-row v-else>
            <v-alert type="warning" class="col-12">
                Não há tarefas na fila!
            </v-alert>
        </v-row>
    </v-container>
</template>

<script>
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
        ]
    }),    

    created(){
        this.$axios.get('/queued_tasks/').then(response => {
            this.tasks = response.data
        })
    },

    methods:{
        dequeue(task){
            this.$axios.delete(`/queued_tasks/${task._id.$oid}`).then(() => {
                let index = this.tasks.findIndex(ele => ele == task);
                this.tasks.splice(index,1);
            })
        }
    }
}
</script>

<style>

</style>