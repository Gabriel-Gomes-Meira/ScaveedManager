<template>

    <!-- :items-per-page.sync="countPerPage"
    :page.sync="page" -->
    <!-- Desabilitei a paginação pois o data iterator simplesmente não mudava de páginas -->
  <v-data-iterator
      :items="Data"      
      :single-expand="true"
      hide-default-footer                  
      disable-pagination
    >

        <template v-slot:header>            
                <v-toolbar
                color="blue-grey darken-3"
                class="pl-2 pr-4 rounded-t-lg"
                elevation="0"
                >
                    <v-toolbar-title>Relatórios das Tasks</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-btn
                    @click="getPreviousPage()"
                    icon
                    :disabled="!hasPreviousPage">
                        <v-icon size="25">mdi-arrow-left</v-icon>
                    </v-btn>

                    <v-btn
                    @click="getNextPage()"
                    icon
                    :disabled="!hasNextPage">
                        <v-icon size="25">mdi-arrow-right</v-icon>
                    </v-btn>

                    
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

        <template v-slot:default="props">

            <v-sheet
            color=""
            dark
            class="px-4 pt-3 pb-1 
            scrollalbe_y"
            :key="`${props.pagination.page}_pagina`"
            >
                <v-row>
                    
                    <v-expansion-panels>
                        <v-expansion-panel
                        v-for="(item) in props.items"
                        :key="item.id"
                        >
                        <v-expansion-panel-header>
                            {{ item.file_name}} {{ item.id }}
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
                            :value="item.content"
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
            <v-alert class="col-12
            my-0 blue-grey darken-2
            " tile>
                Nenhum relatório registrado das tarefas...
            </v-alert>            
        </template>
    </v-data-iterator>
</template>

<script>
import {mapMutations} from "vuex"
import moment from "moment"

export default {
    name:"tasks",

    data:() => ({
        Data:[],
        countPerPage: 10,
        totalPages: -1,
        page: 1,
    }),

    computed: {
        // has next page?
        hasNextPage() {
            return this.page < this.totalPages
        },
        // has previous page?
        hasPreviousPage() {
            return this.page > 1
        },                
    },

    methods:{
        ...mapMutations({
            stopLoading: "stopLoading",
            startLoading: "startLoading",
            setSnackBar: "setSnackBar"
        }),

        feedData(){
            this.$axios.get(`/tasks/history?page=${this.page}&per_page=${this.countPerPage}`).then(response => {
                this.Data = response.data.items               
                this.totalPages = response.data.pagination.total_pages
                setTimeout(this.stopLoading, 750)    
            })
        },          
        getPreviousPage() {
            if (this.hasPreviousPage) {
                this.page--
                this.feedData()
            }
        },
        getNextPage() {
            if (this.hasNextPage) {
                this.page++
                this.feedData()
            }
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
