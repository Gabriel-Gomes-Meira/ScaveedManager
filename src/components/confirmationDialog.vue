<template>

    <!-- <v-layout row justify-center> -->
        <v-dialog v-model="active" 
        persistent 
        max-width="350" 
        >
            <v-card>
                <v-card-title class="headline">Confirmação</v-card-title>
                <v-card-text>
                    <slot />
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info"  @click.native="Sumir" text>Recusar</v-btn>
                    <v-btn color="warning"  @click.native="Aceito" text>Aceitar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <!-- </v-layout> -->

</template>

<script>
export default {
    name:"confirmationDialog",
    
    props:{
        active:Boolean,      
        // Item:null,
    },    

    methods:{
        Sumir () {
            this.$emit('Closethis')
        },

        Aceito () {
            this.$emit('SendRequest');
            this.Sumir();
        }
    }
}
</script>

<style>

</style>