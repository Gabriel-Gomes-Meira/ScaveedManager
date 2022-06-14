<template>
    <v-container 
    class="pa-12"    
    >
        <v-toolbar
        color="blue-grey darken-3"
        class="pl-2 pr-4 rounded-t-lg elevation-1"        
        >    
            <v-toolbar-title>
                Modelo de Notificação
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn
            @click="selectedType = ''"
            class="mr-2"
            color="blue-grey darken-1"
            v-show="selectedType">
                <v-icon
                size="38">mdi-arrow-left</v-icon>
            </v-btn> 

            <!-- :disabled="hasTitle" -->
            <v-btn
            @click="hasTitle = !hasTitle"
            class="mr-2"
            color="blue-grey darken-1"
            v-show="selectedType">
                TITLE
            </v-btn>    

            <!-- :disabled="hasBlockText" -->
            <v-btn
            @click="hasBlockText = !hasBlockText"
            color="blue-grey darken-1"
            class="mr-2"
            v-show="selectedType">
                TEXT
            </v-btn>

            <v-btn
            @click="hasImage = !hasImage"
            color="blue-grey darken-1"
            v-show="selectedType">
                IMAGE
            </v-btn>
            
        </v-toolbar>

        <!-- <v-card height="400">             
            
            <v-card-title v-show="hasTitle">
                {{title}}
            </v-card-title>
            
            <v-card-text v-show="hasBlockText">
                {{text}}
            </v-card-text>
            <v-img
            class="grey darken-2 align-end"
            height="200px"
            v-show="hasImage"
            >
                <v-card-title
                v-show="hasImage && hasTitle">
                    {{title}}
                </v-card-title>
            </v-img>
        </v-card> -->
        
        <v-sheet color="blue-grey darken-4
        rounded-b-lg"
        height="400">
                <v-row class="pt-8" >
                    <transition name="slide-y">
                    <v-card 
                    class="mx-auto cols-4"
                    color="rgb(23, 22, 22)"
                    elevation="0"
                    max-width="400"
                    v-show="selectedType == 'vue-card-model' || 
                            !selectedType"
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
                    </transition>

                    <transition name="slide-y">
                    <v-card
                    class="mx-auto cols-4 blue-grey darken-5
                    d-flex align-content-center justify-center"
                    width="400"
                    height="inherit"
                    elevation="0"
                    v-show="selectedType == 'telegram' || 
                            !selectedType"
                    @click="selectedType = 'telegram'"
                    >
                        <v-icon
                        
                        size="200">telegram</v-icon>
                    </v-card>                        
                    </transition>
                </v-row>            
        </v-sheet>
        <v-text-field 
        label="Title"
        v-show="hasTitle"
        v-model="title"
        />

        <v-textarea 
        label="Message Text"
        v-show="hasBlockText"
        v-model="text"
        />
    </v-container>

</template>

<script>
export default {    
    name:"NotificationModelMaker",

    data() {
        return {
            items:[],
            hasTitle:false,
            title:"A Big Title",
            hasImage:false,
            refImage:"",
            hasBlockText:false,
            text:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa quisquam obcaecati commodi iste voluptatum amet. Obcaecati ab nesciunt tenetur adipisci, impedit culpa? Magni quibusdam doloribus officia suscipit amet iure culpa.",
            selectedType:""
        }
    }
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
        
        background-color: #80cbc39e;
        border-radius: 4px;
    }
    .main-container::-webkit-scrollbar-thumb{
        background: #26a094de;
        border: solid #e0f2f127;
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
        animation: slideyr 0.8s;
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
            top:-50px;
            z-index: -1;
        }
    }

    @-moz-keyframes slideyr {
        0% { 
            top:0 ;
            opacity: 1;
        }
        100% { 
            opacity: 0; 
            top:-50px;
            z-index: -1;
        }
    }
</style>