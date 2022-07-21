<template>
    <v-form v-model="valid" ref="form" lazy-validation>
    <v-container     
    style="height: 80vh;"
    class="d-flex align-center align-content-center">
        <v-row justify="center">
            <v-card class="col-8 align-center">
                <v-card-text class="pt-0">
                        <!-- <v-text-field
                        label="Title"
                        v-model="title"
                        :rules="titleRules"
                        :counter="150"
                        required
                        color="white"
                        ></v-text-field> -->
                        
                        <v-file-input
                        :rules="fileRules"
                        accept=".rb"
                        placeholder="Up your File"
                        prepend-icon="mdi-text"
                        label="Script"
                        v-model="file"
                        @change="readContent"
                        ></v-file-input>

                        <v-autocomplete 
                        v-show="!updatingOnQueue"
                        item-text="name"
                        item-value="_id.$oid"
                        placeholder="Listen Associado"
                        label="Listen"                                                       
                        dense      
                        :rules="listenRules"                              
                        :items="listens"
                        v-model="selectedListen"            
                        />
                
                        <v-row 
                        class="mt-2 px-4">
                            <v-btn
                                large
                                text
                                @click="submit"
                                :disabled="!valid || processingFile"
                                class="light-green"
                            >
                                <v-icon
                                size="36">
                                    mdi-content-save-outline
                                </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>                            
                            <v-btn
                            class="red darken-4 ml-4" 
                            large
                            @click="$router.back()">
                                <v-icon
                                size="38">mdi-arrow-left</v-icon>
                            </v-btn>                 
                        </v-row>
                </v-card-text>        
            </v-card>
        </v-row>        
    </v-container>
    </v-form>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"

export default {    
    name:"ModelTaskMaker",

    data() {
        return {
            fileRules:[v => !!v || "Arquivo do script é obrigatório.",
                            v => v == null || v.type == "application/x-ruby" || "Tipo não adequado!!"],
            file:null,
            content:[],
            title:"",
            textRules:[v => !!v || "Script em branco!"],
            listens:[],
            selectedListen:null,
            valid:false,
            processingFile:false
        }
    },

    computed:{
        ...mapGetters([
            'getUpdatingItem', 'updating'
        ]),

        updatingOnQueue(){
            return this.updating && !!!this.getUpdatingItem.listen_id
        },

        listenRules(){
            if(this.updating && this.getUpdatingItem.listen_id){
                return [
                    v => !!v || "Listen é requerido nessa atualização!"
                ]
            }
            return []
        },
    },

    created(){
        this.$axios.get('/listens/').then(response => {
            this.listens = response.data
        })

        if(this.getUpdatingItem){
            this.title = this.getUpdatingItem.file_name
            this.content = this.getUpdatingItem.content
            if(!this.updatingOnQueue){
                this.selectedListen = this.getUpdatingItem.listen_id.$oid
            }
        }
    },

    methods:{
        submit(){            

            if (this.$refs.form.validate()) {
                
                if (this.updatingOnQueue){
                    this.$axios.put(`/queued_tasks/${this.getUpdatingItem._id.$oid}`, {
                        task:{
                            file_name: this.title,
                            content: this.content
                        }                        
                    }).then(() => {                        
                        this.setSnackBar({
                                active:true,
                                timeout:2000,
                                color:"light-green darken-3",
                                message:"Tarefa atualizada com sucesso!"
                        })
                        this.$router.back()
                    }).catch(() => {
                        // TODO
                        // Melhorar esse tratamento em versões posteriores.
                        this.setSnackBar({
                                active:true,
                                timeout:2000,
                                color:"red darken-3",
                                message:"Não foi possível realizar essa operação!"
                        })
                    })
                } else if (!this.updating){
                    this.$axios.post("/task/", {
                        task:{
                            file_name: this.title,
                            content: this.content
                        },
                        listen: {
                            id: this.selectedListen
                        }
                    }).then(() => {
                        
                        this.setSnackBar({
                                active:true,
                                timeout:2000,
                                color:"light-green darken-3",
                                message:"Documento criado com sucesso!"
                        })
                        this.$router.back()
                    })

                } else {
                    this.$axios.put(`/task/${this.getUpdatingItem._id.$oid}`, {
                        task:{
                            file_name: this.title,
                            content: this.content                         
                        },
                        listen: {
                            id: this.selectedListen
                        } 
                    }).then(() => {
                        
                        this.setSnackBar({
                                active:true,
                                timeout:2000,
                                color:"light-green darken-3",
                                message:"Documento atualizado com sucesso!"
                        })
                        this.$router.back()
                    })
                }
            }
        },

        ...mapMutations({
          setSnackBar: "setSnackBar"
        }),

        readContent(e){          
            this.title = e.name            
            this.processingFile = true;

            e.text().then(content => {
                this.content = content.split("\n")
                this.processingFile = false
            })
        },
        
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
        
        background-color: transparent;
        border-radius: 4px;
    }
    .main-container::-webkit-scrollbar-thumb{
        background: #263238;
        border-radius: 4px;
    }


</style>

<style >
    .custom_area_text .v-input__control .v-text-field__slot {
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 6px;
    }

    .custom_area_text {
        border-radius: 4px;
    }
</style>


