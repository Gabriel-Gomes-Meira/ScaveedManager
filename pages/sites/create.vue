<template>
    <v-form v-model="valid" ref="form" lazy-validation>
    <v-container     
    style="height: 80vh;"
    class="d-flex align-center align-content-center">
        <v-row justify="center">
            <v-card class="col-8 align-center">
                <v-card-text class="pt-0">
                        <v-text-field
                        label="Name"
                        v-model="name"
                        :rules="nameRules"
                        :counter="150"
                        required
                        color="white"
                        ></v-text-field>
                        
                        <v-text-field
                        label="URL"
                        v-model="url"
                        :rules="urlRules"
                        required
                        color="white"
                        placeholder="https://......../"
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
import axios from "axios";

export default {
    data: () => ({
        valid: true,
        name: "",
        nameRules: [v => !!v || "Name is required", 
                    v => (v && v.length <= 150) || "Name must be less than 150 characters"],
        url: "",
        urlRules: [v => !!v || "E-mail is required", v => /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) || "E-mail must be valid"],                
    }),

    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                axios.post("/api/submit", {
                    name: this.name,
                    url: this.url,                    
                });
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    }
};
</script>
