<template>    

        <!-- <v-container           
        v-show="showing"  
        style="height: 80vh;"
        class="d-flex align-center align-content-center">
            <v-row justify="center">                     -->
                <v-progress-circular
                class="circle_progress"
                indeterminate
                color="green"
                size="100"        
                v-show="showing"
                ></v-progress-circular>                
            <!-- </v-row>
        </v-container>                   -->
</template>

<script>
export default {
    name:"loading",
    props:{
        showing:Boolean
    }
}
</script>
<style>
    html{
        overflow-y: hidden;
    }
    .circle_progress {
        position: relative;
        top: 29vh;
        left: 42vw;        
    }
</style>