<template>
    <v-container    
    >
        <v-toolbar
        color="blue-grey darken-3"
        class="pl-2 pr-4 rounded-t-lg elevation-1"        
        >    
            <v-toolbar-title>
                Modelo de Notificação
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            <v-autocomplete 
            class="col-3 mt-8"
            item-text="name"
            item-value="_id.$oid"
            placeholder="Listen"
            label="Listen"                    
            :items="Listens"
            v-model="selectedListen"        
            />
            <v-spacer></v-spacer>

            <v-btn text
            color="blue-grey lighten-4"
            @click="$router.back()">
                <v-icon
                size="30">mdi-arrow-left</v-icon>
            </v-btn>
        </v-toolbar>        
        
        <v-sheet color="blue-grey darken-4
        rounded-b-lg"
        min-height="100"
        max-height="100%">
            <v-container is="transition-group"
            name="slide-y"
            class="pt-0 fill-height" 
            >
                <v-row class="pt-8 mb-6"                 
                key="row_1"
                v-show="!selectedType"
                >
                    <!-- <transition name="slide-y"> -->
                    <v-card 
                    key="card_1"
                    class="mx-auto cols-4"
                    color="rgb(23, 22, 22)"
                    elevation="0"
                    max-width="400"
                    
                    @click="selectedType='vue-card-model'"
                    >
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                            <v-card-title>Vue Card Model Notification</v-card-title>
                        </v-img>
    
                        <v-card-subtitle class="pb-0">
                        Subtitle
                        </v-card-subtitle>
    
                        <v-card-text class="text--primary">
                        <div>Text1</div>
    
                        <div>Text2</div>
                        </v-card-text>
                    </v-card>                
                    <!-- </transition> -->

                    <!-- <transition name="slide-y"> -->
                    <v-card
                    key="card_2"
                    class="mx-auto cols-6 blue-grey lighten-2
                    pa-1 rounded white"
                    width="400"
                    height="inherit"
                    elevation="0"                    
                    @click="selectedType = 'telegram'"
                    >
                        <v-card
                        class="d-flex 
                        align-content-center justify-center"
                        elevation="0"
                        style="height: 100%; width: inherit;">
                            <v-icon 
                            color="blue-grey lighten-3"
                            size="200">telegram</v-icon>                            
                        </v-card>                                                    
                    </v-card>                        
                    <!-- </transition> -->
                </v-row>            

                <v-row v-show="selectedType"
                class="justify-center mt-0
                mb-4"
                key="row_2"
                style="height:inherit"
                >
                    <telegram 
                    v-show="selectedType == 'telegram'"
                    :selectedListen="selectedListen"
                    @UnChoosed="selectedType = ''"
                    />

                    <defaultcardmodel 
                    v-show="selectedType == 'vue-card-model'"
                    @UnChoosed="selectedType = ''"
                    />
                </v-row>
            </v-container>
        </v-sheet>                
    </v-container>

</template>

<script>
import telegram from "./telegram.vue"
import defaultcardmodel from "./vuecardmodel.vue"
import { mapGetters } from "vuex"

export default {    
    name:"NotificationModelMaker",

    data() {
        return {
            // items:[],                                    
            selectedType:"",
            Listens:[],
            selectedListen:""
        }
    },

    
    // ON CREATE, IF UPDATE, USE THE ":TYPE" TO REDIRECT TO TELEGRAM OU VUE CARD MODEL ONCE TIME.
    computed:{
        ...mapGetters([
            'getUpdatingItem'
        ])
    },

    created(){
        this.$axios.get('/listens/').then(response => {
            this.Listens = response.data            
        })

        //provisiouly
        if(this.getUpdatingItem) {
            this.selectedType = 'telegram'
            this.selectedListen = this.getUpdatingItem.listen_id.$oid
        }
    },

    components:{
        telegram,
        defaultcardmodel
    },
}
</script>

<style>
    .main-container{
        max-height:100vh;
        overflow-y:auto;        
    }

    .main-container::-webkit-scrollbar{        
        width: 8px;
    }
    .main-container::-webkit-scrollbar-track{
        
        background-color: transparent;
        border-radius: 4px;
    }
    .main-container::-webkit-scrollbar-thumb{
        background: #263238;
        /* border: solid #e0f2f127; */
        border-radius: 4px;
    }

    /* .fake-img{
        background: gray;
    } */
</style>

<style scoped>
    .slide-y-enter-active, .slide-y-leave-active {               
        position: relative;
        animation: slidey 0.8s;
        
        /* -webkit-animation: slidey 0.8s;
        -moz-animation: slidey 0.8s; */
    }
    .slide-y-enter, .slide-y-leave-active { 
        position: relative;        
        animation: slideyr 0.0s;/* ou matenho todos componenetes na mesma row, ou reduzo o tempo de transiç~ao a zero */
        /* -webkit-animation: slideyr 0.8s;
        -moz-animation: slideyr 0.8s; */
    }

     /* .fade-in-image {
       
        -o-animation: slidey 5s;
        -ms-animation: slidey 5s;
    }  */

    @keyframes slidey {
        0% { 
            opacity: 0; 
            top:-50px;
        }
        100% {
            top:0 ;
            opacity: 1; 
        }
    }

    @-moz-keyframes slidey {
        0% { 
            opacity: 0; 
            top:-50px;
        }
        100% {
            top:0 ;
            opacity: 1; 
        }
    }


    @keyframes slideyr {
        0% { 
            top:0 ;
            opacity: 1;    
        }
        100% {
            opacity: 0; 
            top:-100px;
            /* z-index: -1; */
        }
    }

    @-moz-keyframes slideyr {
        0% { 
            top:0 ;
            opacity: 1;
        }
        100% { 
            opacity: 0; 
            /* top:-100px; */
            z-index: -1;
        }
    }
</style>