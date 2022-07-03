<template>
    <v-form v-model="valid" ref="form" lazy-validation>
    <v-container     
    style="height: 60vh;"
    class="d-flex align-center align-content-center">
        <v-row justify="center">
            <v-card class="col-8 align-center">
                <v-card-text class="pt-0">
                        <v-text-field
                        label="Api Token"
                        v-model="telegram.token"
                        :rules="tokenRules"                    
                        required
                        color="white"
                        ></v-text-field>
                        
                        <v-text-field
                        label="chat_id"
                        v-model="telegram.chat_id"
                        :rules="chat_idRules"
                        required
                        color="white"
                        placeholder="0000000000"
                        ></v-text-field>
                
                        <v-row 
                        class="mt-2 px-4">
                            <v-btn
                                large
                                text
                                @click="submit"
                                :disabled="!valid"
                                class="light-green"
                            >
                                <v-icon
                                size="36">
                                    mdi-content-save-outline
                                </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn 
                            @click="clear"
                            large
                            color="light-blue">
                                <v-icon
                                size="34">mdi-broom</v-icon>
                            </v-btn>   
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
import {mapGetters} from "vuex"

export default {
    data: () => ({
        valid: true,
        telegram:{
            chat_id:null,
            token:null
        },
        tokenRules: [v => !!v || "Token is required"],        
        chat_idRules: [v => !!v || "Chat-id is required"],                
    }),

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                if (!this.getUpdatingItem){
                    this.$axios.post("/user/", {
                        profile:{
                            telegram: this.telegram
                        }
                    }).then(response => {
                        // TODO
                        // implementar mensagem de criado com sucesso
                        this.$router.back()
                    })

                } else {
                    this.$axios.put(`/user/${this.getUserSettings._id.$oid}`, {
                        profile:{
                            telegram: this.telegram
                        }
                    }).then(response => {
                        // TODO
                        // implementar mensagem de atualizado com sucesso
                        this.$router.back()
                    })
                }
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    },

    computed:{
        ...mapGetters([
            'getUserSettings', 'userSetted'
        ])
    },

    created(){
        // console.log(this.$store.state)
        if(this.getUserSettings){
            this.telegram.token = this.getUserSettings.telegram.token
            this.telegram.chat_id = this.getUserSettings.telegram.chat_id
        }
    },

    mounted(){
        // console.log(this.getUpdatingItem)
    }
};
</script>
