<template>  
  <v-stepper v-model="step"
  class="col-12 rounded-t-0 elevation-0
    blue-grey darken-4"
    height="100%"
  >
    <v-stepper-header
    class="elevation-0">
      <v-stepper-step
        :complete="step > 1"
        step="1"
      >
        Name of step 1
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        Name of step 2
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Name of step 3
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items
    >
      <v-stepper-content step="1"
      
      class="container pb-0">
        <v-textarea 
        label="Message Text"
        background-color="grey lighten-2"
        light
        color="blue-grey darken-4"
        class=""        
        v-model="text"
        outlined        
        no-resize
        rows="8"
        /> 

        <v-row
        justify="end"
        class="mb-2 pr-4"
        >            
            <v-btn text
            class="mr-2"
            @click="$emit('UnChoosed')">
            Cancel
            </v-btn>

            <v-btn
            color="primary"
            @click="formatText"
            >
            Continue
            </v-btn>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
            <v-card-text 
            >
                {{formatedText}}
            </v-card-text>
        </v-card>

        <v-btn
          color="primary"          
          
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="step = 1"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
export default {
    name:"MakerTelegramNotification",

    data() {
        return {
            step:1,
            text:'',
            formatedText:''
        }
    },

    methods:{
        formatText(){
            this.step = 2
            let items = this.text.split('$')
            console.log(items)
        }
    }
}
</script>

<style>

</style>