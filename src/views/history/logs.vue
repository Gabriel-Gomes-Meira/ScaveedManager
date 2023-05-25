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
                    <v-toolbar-title>Logs de erros e eventos</v-toolbar-title>
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
                        :key="`${index}_expansion_${item.id}`"
                        >
                        <v-expansion-panel-header>
                            Horário do evento : {{ item.at | formatedDate}}                              
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>                                                        
                            Mensagem:
                            <br>
                            <v-textarea
                            :value="item.message_log"
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
    name:"logs",

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
            this.$axios.get('/logs').then(response => {                
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
        border-radius: 4px;
    }

</style>
