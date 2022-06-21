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
        Escolha o listen a ser notificado
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="step > 2"
        step="2"
      >
        Definir Mensagem em Formato HTML
        
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Definir items desejados
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items
    >
      <v-stepper-content step="2"
      
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
            @click="step = 1"
            >
            Cancel
            </v-btn>

            <v-btn
            color="primary"
            @click="searchVarNames"
            >
            Continue
            </v-btn>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="3">
        
        <v-chip-group class=""
          active-class="primary--text"
          column
        >
          <v-chip
            disabled
            v-for="(name,index) in varNames"
            :key="name+'_varname'"
            :class="valids[index]?'green--text':'red--text'"
            class="font-weight-medium"            
          >
            {{ name }}
          </v-chip>
        </v-chip-group>        
                  
        <v-row class="my-2">
            <v-expansion-panels flat            
            class="rounded-lg col"            
            >
            <v-expansion-panel v-for="(name, index) in varNames"
            :key="'input_'+index"
            :ref="'expansion_wi_'+index"
            class="blue-grey darken-3 elevation-0"
            >
                <v-expansion-panel-header v-text="name" 
                class="font-weight-medium"/>
                <v-expansion-panel-content
                >                
                <v-form v-model="valids[index]" :ref="'wanted_item_form_'+index"
                lazy-validation
                class="row justify-end pb-2">                      
                    <v-text-field
                    class="col-12"
                    label="URL"
                    v-model="wantedItems[index]['url']"
                    :rules="urlRules"
                    required
                    placeholder="https://......../"
                    ></v-text-field>

                    <v-text-field
                    class="col-12"
                    label="Path"
                    v-model="wantedItems[index]['path']"
                    :rules="valueRules"
                    required
                    placeholder="Css Path, xpath ..."
                    ></v-text-field>
                    
                    <v-text-field
                    class="col-12"
                    label="Wanted Value"
                    v-model="wantedItems[index]['wanted_value']"
                    :rules="valueRules"
                    required
                    placeholder="src, inner_html, etc..."
                    ></v-text-field>

                    
                    <v-checkbox
                    class="col-12"
                    v-model="wantedItems[index]['distinguer']['is_last']"
                    label="isLast"></v-checkbox>

                    <v-btn class="rounded-lg col-1"
                    color="success"
                    text
                    @click="validateThat(index)">
                    CHECK
                    </v-btn>
                </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
        </v-row>

        <v-row
        justify="end"
        class="mb-2 pr-4"
        >            
            <v-btn text
            class="mr-2"
            @click="step = 2">
            Cancel
            </v-btn>

            <v-btn
            color="primary"
            @click="validWantedItems"
            >
            Continue
            </v-btn>
        </v-row>
      </v-stepper-content>

      <v-stepper-content step="1">

        <v-autocomplete 
        item-text="name"
        item-value="_id.$oid"
        placeholder="Listen"
        label="Listen"                    
        :items="Listens"
        v-model="selectedListen"        
        />

        <v-card height="" color="blue-grey darken-1"
        class="mb-2">
            <v-card-text
            class="text-h6 text-center">
                Atenção! Esteja ciente que o nome das variavéis deve começar com sifrão ($), e cada variavél representa um item sujeito à webscrap no endereço fornecido. Certifique-se que esteja provendo items corretamente elaborados! 
            </v-card-text>
        </v-card>

        <v-row
        justify="end"
        class="my-2 pr-4"
        >    

            <v-btn text
            @click="$emit('UnChoosed')">
            Cancel
            </v-btn>

            <v-btn
            color="primary"
            @click="step = 2"
            :disabled="!selectedListen"
            >
            Continue
            </v-btn>
        </v-row>
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
            // splitedText:'',
            varNames:[],
            wantedItems:[],
            valids:[],
            urlRules: [v => !!v || "URL is required", v => /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(v) || "URL must be valid"],
            valueRules: [v => !!v || "Value is required"],
            pathRules: [v => !!v || "Value is required"],
            Listens:[],
            selectedListen:null
        }
    },

    methods:{
        searchVarNames(){
            this.step = 3
            this.varNames = []
            let splitedText = this.text.split("")
            let delimiter = -1, varName = []
            
            for (let index = 0; index < splitedText.length; index++) {
                if (splitedText[index] == '$'){
                delimiter = index           
                varName.push(splitedText[index])     
                } else if (delimiter>=0 && (index == splitedText.length-1 || splitedText[index] == ' '|| splitedText[index] == '\n' || splitedText[index] == '"')){
                    this.varNames.push(varName.join(""))
                    this.wantedItems.push({
                        var_name: varName.join(""),
                        url:'',
                        distinguer:{
                            is_last:true
                        },
                        path:'',
                        wanted_value:''
                    })
                    varName = []
                    delimiter = -1
                } else if (delimiter>=0) {
                  varName.push(splitedText[index])
                }
            }                        
        },

        validateThat(index){            
            if(this.$refs['wanted_item_form_'+index][0].validate()){
                this.$refs['expansion_wi_'+index][0].isActive = false
            }
        },

        validWantedItems(){
            let validated = true
            for (let index = 0; index < this.wantedItems.length; index++) {                
                if(!this.$refs['wanted_item_form_'+index][0].validate()){
                    validated = false
                }
            }

            if(validated){
                this.$axios.post("/notification_model/", {
                  listen:{
                    id:this.selectedListen
                  },
                  model:{
                    message:this.text,
                    wanted_items: this.wantedItems
                  }
                }).then(response => {
                  // TODO
                  // implementar mensagem de criado com sucesso
                  this.$router.back()
                })
            }
        },        
    },

    created(){
        this.$axios.get('/listens/').then(response => {
            this.Listens = response.data            
        })
    }
}
</script>

<style>

</style>