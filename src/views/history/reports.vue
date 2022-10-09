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

        <template v-slot:default="{ items, isExpanded, expand }">

            <v-sheet
            color=""
            dark
            class="px-4 pt-3 pb-1 
            scrollalbe_y"
            >
                <v-row>
                    <v-col
                        v-for="item in items"
                        :key="item.fromId.$oid"
                        cols="12"     
                        class="mb-2"       
                    >
                        
                        <v-toolbar
                        color="blue-grey darken-3"
                        class="pl-2 pr-4 rounded"
                        elevation="0"
                        dense
                        >
                        <!-- :class="isExpanded(item) ? '' : 'rounded-b'" -->
                            <v-toolbar-title>{{item.fromName}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            
                            <v-btn
                            v-show="isExpanded(item)"                                            
                            @click="dialogid = item.id"              
                            icon
                            small
                            class="white"
                            >
                                <v-icon
                                color="teal darken-4"                
                                >
                                    mdi-delete-empty-outline
                                </v-icon>
                            </v-btn>

                            <v-btn
                            class="ml-3 white"
                            icon
                            small
                            elevation="3"                
                            active-class="purple"
                            
                            @click="expand(item, !isExpanded(item))">
                                <v-icon
                                color="purple darken-2">
                                    {{isExpanded(item) ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}}
                                </v-icon>
                            </v-btn>
                        </v-toolbar>

                        <confirmation-dialog
                        :active="dialogid == item.id"                
                        @Closethis="dialogid = ''"
                        @SendRequest="flushSet(item)"
                        >
                            <template>
                                Você tem certeza de que deseja limpar os relatórios do listen "<b>{{item.fromName}}</b>" ?!                
                            </template>
                        </confirmation-dialog>
                        
                        <v-card 
                        v-show="isExpanded(item)"
                        >                
                            
                            <v-expansion-panels
                            style="overflow-x:auto">
                                <v-expansion-panel
                                v-for="(register,index) in item.registers"
                                :key="`${index}_expansion_${item.id}`"
                                >
                                <v-expansion-panel-header>
                                    Registrado em {{ register.created_at | formatedDate}}
                                </v-expansion-panel-header>
                                <v-expansion-panel-content
                                >
                                    <pre>{{register.content}}</pre>
                                </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>                                                           
                        </v-card>
                    </v-col>
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
import confirmationDialog from "@/components/confirmationDialog.vue"
import {mapMutations} from "vuex"
import moment from "moment"

export default {
    name:"reports",

    data:() => ({
        Data:[],
        dialogid: ""
    }),

    methods:{
        ...mapMutations({
            stopLoading: "stopLoading",
            startLoading: "startLoading",
            setSnackBar: "setSnackBar"
        }),
        feedData(){
            this.$axios.get('/reports/').then(response => {
                this.Data = response.data                
                setTimeout(this.stopLoading, 750)    
            })
        },
        flushSet(item){
            this.$axios.delete(`/reports/clean/${item.id}`).then(resp => {
                this.setSnackBar({
                        active:true,
                        timeout:2000,
                        color:"light-green darken-3",
                        message:resp.data.message
                })
                this.feedData()
            })
        },
    },

    created(){
        this.startLoading()
        this.feedData()
    },

    components: { confirmationDialog },

    filters: {
        formatedDate(value){
            if (value) {
                // return moment(String(value)).format('MM/DD/YYYY hh:mm')
                return moment(String(value)).locale('pt-br').format('LLL')                
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
