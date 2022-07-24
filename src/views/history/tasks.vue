<template>
  <v-data-iterator
      :items="Data"      
      :single-expand="true"
      hide-default-footer
    >
        <template v-slot:header>            
                <v-toolbar
                color="blue-grey darken-3"
                class="pl-2 pr-4 rounded-t-lg"
                elevation="0"
                >
                    <v-toolbar-title>Relatórios dos Listens</v-toolbar-title>
                    <v-spacer></v-spacer>
                    
                    <v-btn                   
                    @click="feedData()"              
                    icon
                    >
                        <v-icon                
                        size="30">mdi-restore</v-icon>
                    </v-btn>
                </v-toolbar>            
        </template>

        <template v-slot:footer>            
                <v-toolbar
                dense
                color="blue-grey darken-3"
                class="pl-2 pr-4 rounded-b-lg elevation-1"
                >                        
                    <!-- 
                        // TODO 
                        // botão para ir pro topo
                    -->
                </v-toolbar>
        </template>

        <template v-slot:default="{ items}">

            <v-sheet
            color=""
            dark
            class="px-4 pt-3 pb-1 
            scrollalbe_y"
            >
                <v-row>
                    
                    <v-expansion-panels>
                        <v-expansion-panel
                        v-for="(item,index) in items"
                        :key="`${index}_expansion_${item._id.$oid}`"
                        >
                        <v-expansion-panel-header>
                            {{ item.file_name}}
                            <br>
                            Concluído em {{ item.terminated_at | formatedDate}}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Inicio da Execução em {{ item.initialized_at | formatedDate}}  
                            <v-divider />
                            <br>
                            {{item.count_erro?`Quantidade de falhas: ${item.count_erro}`:""}}
                            <v-divider v-if="item.count_erro" />
                            <br v-if="item.count_erro">
                            Logs:
                            <br>
                            <pre>{{item.log}}</pre>
                            <v-divider />
                            <br>
                            Conteúdo do arquivo:
                            <br>
                            <v-textarea
                            :value="item.content | scriptedFormat()"
                            readonly
                            auto-grow
                            no-resize
                            solo>                                
                            </v-textarea>
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>                        
                    
                </v-row>
            </v-sheet>
        </template>

        <template v-slot:no-data>
            <v-row
            class="mb-0 ">
                <v-alert type="warning" class="col-12
                my-0
                ">
                    Nenhum relatório registrado dos listens ainda....
                </v-alert>
            </v-row>
        </template>
    </v-data-iterator>
</template>

<script>
import {mapMutations} from "vuex"
import moment from "moment"

export default {
    name:"reports",

    data:() => ({
        Data:[],        
    }),

    methods:{
        ...mapMutations({
            stopLoading: "stopLoading",
            startLoading: "startLoading",
            setSnackBar: "setSnackBar"
        }),
        feedData(){
            this.$axios.get('/tasks/history').then(response => {
                this.Data = response.data                
                setTimeout(this.stopLoading, 750)    
            })
        },        
    },

    created(){
        this.startLoading()
        this.feedData()
    },
    

    filters: {
        formatedDate(value){
            if (value) {
                // return moment(String(value)).format('MM/DD/YYYY hh:mm')
                return moment(String(value)).locale('pt-br').format('LLL')                
            }
        },
        scriptedFormat(value){
            if (value) {
                return value.join('\n')
            }
        }
    }

}
</script>

<style>

    .scrollalbe_y{
        max-height:70vh;
        overflow-y:auto;        
    }

    .scrollalbe_y::-webkit-scrollbar{        
        width: 8px;
    }
    .scrollalbe_y::-webkit-scrollbar-track{
        
        background-color: transparent;
        border-radius: 4px;
    }
    .scrollalbe_y::-webkit-scrollbar-thumb{
        background: #263238;
        /* border: solid #e0f2f127; */
        border-radius: 4px;
    }

</style>
