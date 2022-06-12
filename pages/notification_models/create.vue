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

            <!-- :disabled="hasTitle" -->
            <v-btn
            @click="hasTitle = !hasTitle"
            class="mr-2"
            color="blue-grey darken-1">
                TITLE
            </v-btn>    

            <!-- :disabled="hasBlockText" -->
            <v-btn
            @click="hasBlockText = !hasBlockText"
            color="blue-grey darken-1">
                TEXT
            </v-btn>    
        </v-toolbar>

        <v-card height="400">             
            <v-card-title v-show="hasTitle">
                {{title}}
            </v-card-title>
            
            <v-card-text v-show="hasBlockText">
                {{text}}
            </v-card-text>
        </v-card>

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
            title:"",
            hasImage:false,
            refImage:"",
            hasBlockText:false,
            text:""            
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
</style>