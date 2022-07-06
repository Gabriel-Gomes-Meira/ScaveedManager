<template>
    <v-container    
    >
        <v-form v-model="valid" ref="form" lazy-validation>
        <v-toolbar
        color="blue-grey darken-3"
        class="pr-1 rounded-t-lg elevation-1"        
        >    
                        
            <v-text-field
            class="mt-8 col-3 solo elevation-0"
            v-model="title"
            :rules="titleRules"
            solo
            background-color="blue-grey ligthen-4"
            dense
            color=""
            label="Nome do Arquivo"
            placeholder="anyonefile.rb"

            ></v-text-field>

            <v-autocomplete 
            item-text="name"
            item-value="_id.$oid"
            placeholder="Listen Associado"
            label="Listen"       
            class="col-3 mt-8 ml-2"             
            solo
            dense      
            :rules="listenRules"      
            background-color="blue-grey ligthen-4"
            :items="listens"
            v-model="selectedListen"            
            />


            <v-spacer></v-spacer>
            <v-toolbar-title>
                Tasker Maker
            </v-toolbar-title>                        
            
        </v-toolbar>        

        
        
        <v-sheet color="blue-grey darken-4
        d-flex px-2 py-1"
        min-height="100"
        max-height="100%">
            
            <v-textarea 
            light
            background-color="white "
            class="text--black ma-0 px-2 custom_area_text
            elevation-0"
            color="black"
            auto-grow
            no-resize
            :rules="textRules"
            v-model="text"
            />            
            
        </v-sheet>       
        </v-form>

        <v-toolbar
        color="blue-grey darken-3"
        class="pr-1 rounded-b-lg elevation-1"       
        dense 
        >
            <v-btn text             
            color="blue-grey lighten-4"
            @click="$router.back()">
                <v-icon
                size="30">mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn outlined            
            color="light-blue"
            @click="submit"
            >
                <v-icon
                color="light-blue accent-3"
                size="30">mdi-send-outline</v-icon>
            </v-btn>
        </v-toolbar>
    </v-container>

</template>

<script>
import {mapGetters, mapMutations} from "vuex"

export default {    
    name:"ModelTaskMaker",

    data() {
        return {
            title:"",
            titleRules:[v => !!v || "Titulo do arquivo é requido!",
                        v => ! /^\W|(?:\/)+|(?:\s)+|\W$/gm.test(v) || "Titulo do arquivo deve ser válido!",
                        v => v.slice(0,v.length-3)!=".rb" || "Nome do arquivo deve possuir uma valida extensao para script Ruby!"],
            text:"",
            textRules:[v => !!v || "Script em branco!"],
            listens:[],
            selectedListen:null,
            valid:false,
        }
    },

    computed:{
        ...mapGetters([
            'getUpdatingItem', 'updating'
        ]),

        listenRules(){
            if(this.getUpdatingItem){
                return [
                    v => !!v || "Listen é requerido nessa atualização!"
                ]
            }
            return []
        }
    },

    created(){
        this.$axios.get('/listens/').then(response => {
            this.listens = response.data
        })

        if(this.getUpdatingItem){
            this.title = this.getUpdatingItem.file_name
            this.text = this.getUpdatingItem.content.join("\n")
            this.selectedListen = this.getUpdatingItem.listen_id.$oid
        }
    },

    methods:{
        submit(){            

            if (this.$refs.form.validate()) {
                if (!this.updating){
                    this.$axios.post("/task/", {
                        task:{
                            file_name: this.title,
                            content: this.text.split("\n")                            
                        },
                        listen: {
                            id: this.selectedListen
                        }
                    }).then(response => {
                        
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
                            content: this.text.split("\n")                            
                        },
                        listen: {
                            id: this.selectedListen
                        } 
                    }).then(response => {
                        
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
        })
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


