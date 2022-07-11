<template>  
  <v-stepper v-if="!getUpdatingItem"
  v-model="step"  
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
            v-for="(item,index) in wantedItems"
            :key="item.var_name+'_varname'"
            :class="valids[index]?'green--text':'red--text'"
            class="font-weight-medium"            
          >
            {{ item.var_name }}
          </v-chip>
        </v-chip-group>        
                  
        <v-row class="my-2">
            <v-expansion-panels flat            
            class="rounded-lg col"            
            >
            <v-expansion-panel v-for="(item, index) in wantedItems"
            :key="'input_'+index"
            :ref="'expansion_wi_'+index"
            class="blue-grey darken-3 elevation-0"
            >
                <v-expansion-panel-header v-text="item.var_name" 
                class="font-weight-medium"/>
                <v-expansion-panel-content
                >                
                <v-form v-model="valids[index]" :ref="'wanted_item_form_'+index"
                lazy-validation
                class="row justify-end pb-2">                      
                    <v-text-field
                    class="col-12"
                    label="URL"
                    v-model="item['url']"
                    :rules="urlRules"
                    required
                    placeholder="https://......../"
                    ></v-text-field>

                    <v-text-field
                    class="col-12"
                    label="Path"
                    v-model="item['path']"
                    :rules="valueRules"
                    required
                    placeholder="Css Path, xpath ..."
                    ></v-text-field>
                    
                    <v-text-field
                    class="col-12"
                    label="Wanted Value"
                    v-model="item['wanted_value']"
                    :rules="valueRules"
                    required
                    placeholder="src, inner_html, etc..."
                    ></v-text-field>

                    
                    <v-checkbox
                    class="col-12"
                    v-model="item['distinguer']['is_last']"
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
            @click="remakemessage">
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
  <!-- 
    A Estrategia, pelo menos por enquanto, usada para o componente de criaçao e update desse model, e de que para que o usuario tenha uma melhor experiencia quando for atualizar, ele n~ao precise passar pelos steps, como na criaçao, e inves disso, posso ir direto para a atualizacao, seja da mensagem ou dos itens.
    No server side, um novo item pode ser criado tranquilamente, e um ja existente pode ser atualizado parcial ou totalmente.
    Porem, em nenhum dos lados ocorre a validacao que um item nao esta mais sendo utilizado, afinal o usuario podera criar novos itens, e esquecer de usuar os ja criados, ou simplesmente apagar algum da mensagem.
  -->
  <v-card v-else
  class="blue-grey darken-4 mt-2 col-10 elevation-0">
    <v-alert :value="WastedVars.length>0?true:false"
    type="warning">
      ATENÇÃO!! Há items que não estão sendo usados em sua mensagem. Se envia-la dessa forma, o items serão apagados!
    </v-alert>    
    <v-row class="justify-space-between align-center" >
      <v-chip-group class="elevation-0 col-6"
        active-class="primary--text"
        column
      >
        <v-chip
          disabled
          v-for="(item,index) in wantedItems"
          :key="item.var_name+'_varname'"
          :class="valids[index]?'green--text':'red--text'"
          class="font-weight-medium"
        >
          {{ item.var_name }}
        </v-chip>
      </v-chip-group>
  
      <v-btn :color="editingText?'success':'primary'"
      class="col-2"
      @click="changeText">
          {{editingText?'CHECK':'EDIT'}}
      </v-btn>
    </v-row>

    <v-row class="my-2">
      <!-- too -->
      <v-textarea 
      :disabled="editingText?false:true"
      label="Message Text"
      background-color="grey lighten-2"
      light
      color="blue-grey darken-4"
      class=""        
      v-model="text"
      outlined
      no-resize
      rows="8"
      >
        <!-- <template v-slot:append-outer> -->
          
        <!-- </template> -->
      </v-textarea>    
    </v-row>

    <v-row class="my-2">
            <v-expansion-panels flat            
            class="rounded-lg col ele"            
            >
            <v-expansion-panel v-for="(item, index) in wantedItems"
            :key="'input_'+index"
            :ref="'expansion_wi_'+index"
            class="blue-grey darken-3 elevation-0"
            >
                <v-expansion-panel-header v-text="item.var_name" 
                class="font-weight-medium"/>
                <v-expansion-panel-content
                >                
                <v-form v-model="valids[index]" :ref="'wanted_item_form_'+index"
                lazy-validation
                class="row justify-end pb-2">                      
                    <v-text-field
                    class="col-12"
                    label="URL"
                    v-model="item['url']"
                    :rules="urlRules"
                    required
                    placeholder="https://......../"
                    ></v-text-field>

                    <v-text-field
                    class="col-12"
                    label="Path"
                    v-model="item['path']"
                    :rules="valueRules"
                    required
                    placeholder="Css Path, xpath ..."
                    ></v-text-field>
                    
                    <v-text-field
                    class="col-12"
                    label="Wanted Value"
                    v-model="item['wanted_value']"
                    :rules="valueRules"
                    required
                    placeholder="src, inner_html, etc..."
                    ></v-text-field>

                    
                    <v-checkbox
                    class="col-12"
                    v-model="item['distinguer']['is_last']"
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

    <v-row justify="end"> 
      <v-btn color="primary"
      :disabled="!isvalids"
      @click="validWantedItems">
          UPDATE
      </v-btn>
    </v-row>
  </v-card>
</template>


<script>
import {mapGetters, mapMutations} from "vuex"
export default {
    name:"MakerTelegramNotification",

    props:['selectedListen'],

    data() {
        return {
            step:1,
            text:'',
            // splitedText:'',
            wantedItems:[],
            valids:[],
            urlRules: [v => !!v || "URL is required", v => /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(v) || "URL must be valid"],
            valueRules: [v => !!v || "Value is required"],
            pathRules: [v => !!v || "Value is required"],            
            editingText:false,
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
                } else if (delimiter>=0 && (index == splitedText.length-1 || splitedText[index] == ' '|| splitedText[index] == '\n' || splitedText[index] == '"' || splitedText[index] == '<')){                    
                  
                  if(index == splitedText.length-1){
                    varName.push(splitedText[index])  
                  }

                  varName = varName.join("")
                  if (this.wantedItems.findIndex(wi => wi.var_name == varName) == -1){
                    this.wantedItems.push({
                        var_name: varName,
                        url:'',
                        distinguer:{
                            is_last:true
                        },
                        path:'',
                        wanted_value:''
                    })
                  } 

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
              if(!this.updating){
                this.$axios.post("/notification_model/", {                  
                  model:{
                    message:this.text,
                    wanted_items: this.wantedItems,
                    listen_id: this.selectedListen
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
                //tava dando erro no server se enviasse com o _id
                let wis_without_id = Object.create(this.wantedItems)
                wis_without_id.forEach(ele => {
                  delete ele._id
                })               
                this.$axios.put(`/notification_model/${this.getUpdatingItem._id.$oid}`, {
                  model:{
                    message:this.text,
                    wanted_items: this.wantedItems,
                    descarted_items: this.WastedVars,
                    listen_id: this.selectedListen
                  },
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
        
        changeText(){
          if(this.editingText){
            this.searchVarNames();
          }         
          this.editingText = !this.editingText;
        },

        ...mapMutations({
          setSnackBar: "setSnackBar"
        }),

        remakemessage(){
          this.wantedItems = []
          this.step = 2
        }
    },

    computed:{
      ...mapGetters([
        'getUpdatingItem', 'updating'
      ]),
      isvalids(){
        this.valids.forEach(ele =>{
          if(!ele){
            return ele
          }
        })

        if(this.valids.length != this.wantedItems.length){
          return false
        }

        return true
      },
      WastedVars(){
        let response = []
        for (let index = 0; index < this.wantedItems.length; index++) {
          if(!this.text.includes(this.wantedItems[index].var_name)){
            response.push(this.wantedItems[index]._id.$oid)
          }
        }
        return response
      },
    },

    created(){


        if(this.getUpdatingItem){
          this.text = this.getUpdatingItem.message
          this.wantedItems = Object.create(this.getUpdatingItem.wanted_items)
        }
    }
}
</script>

<style>

</style>
