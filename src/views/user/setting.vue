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
                        v-model="user.telegram_token"
                        :rules="telegram_tokenRules"                    
                        required
                        color="white"
                        ></v-text-field>
                        
                        <v-text-field
                        label="Chat Id"
                        v-model="user.telegram_chatid"
                        :rules="telegram_chatidRules"
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
import {mapGetters, mapMutations} from "vuex" 

export default {
    data: () => ({
        valid: true,
        user:{
            telegram_chatid:null,
            telegram_token:null
        },
        telegram_tokenRules: [v => !!v || "telegram_Token is required"],        
        telegram_chatidRules: [v => !!v || "Chat-id is required"],                
    }),

    methods: {
        ...mapMutations({
                setSnackBar: "setSnackBar"
        }),
        submit() {            
            if (this.$refs.form.validate()) {
                if (!this.getUpdatingItem){
                    this.$axios.post("/user/", {
                        user: this.user
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
                    this.$axios.put(`/user/${this.getUserSettings.id}`, {
                        user: this.user
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
            this.user.telegram_token = this.getUserSettings.user.telegram_token
            this.user.telegram_chatid = this.getUserSettings.user.telegram_chatid
        }
    },

    mounted(){
        // console.log(this.getUpdatingItem)
    }
};
</script>
