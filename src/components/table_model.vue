<template>
    <v-container 
    class="pa-12"
    >  
        <v-toolbar
        color="blue-grey darken-3"
        class="pl-2 pr-4 rounded-t-lg elevation-1"
        >
            <v-toolbar-title>{{Model}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field
            class="pt-6 SearchDisable"
            prepend-inner-icon="mdi-magnify"
            filled dense
            @focus="SwitchSearch = true"
    	    @blur="SwitchSearch = false"
            :class="{
                'SearchEnable':SwitchSearch
            }"
            v-model="search"
            > 
            </v-text-field>            
            <v-btn 
            class="ml-2"
            :to="ViewCreate"
            icon>
                <v-icon                
                size="33">mdi-plus</v-icon>
            </v-btn>

            <v-btn                   
            @click="$emit('refresh')"              
            icon
            class="ml-2">
                    <v-icon                
                    size="25">mdi-restore</v-icon>
                </v-btn>
        </v-toolbar>

        <v-data-table
        :headers="Headers"
        :items="Data"
        :search="search"
        :items-per-page="7"
        :group-by="Agroupment"
        class="rounded-b-lg rounded-t-0"
        light
        id="Table"
        >
            <template slot="no-data">
                Não há registro de {{Model}} cadastrado!
            </template>

            <template v-slot:[`item.${key}`]="{ item }"
            v-for="(key,i) in LongItems"
            >
                <div class="text-truncate" style="width: 450px" :key="'tt'+i">
                {{ item[key] }}
                </div>
            </template>

            <template v-slot:[`item._id`]="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-on="on"
                        v-bind="attrs"
                        small
                        class="red darken-1"
                        text
                        dark
                        @click="deletingItem = item"
                        >
                            <v-icon
                            small>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </template>

                    <span>
                        Deletar
                    </span>
                </v-tooltip>

                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-on="on"
                        v-bind="attrs"
                        small 
                        text
                        dark
                        @click="update(item)"                
                        class="ml-1 indigo darken-1">                    
                            <v-icon
                                small                        
                            >
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </template>

                    <span>
                        Editar
                    </span>
                </v-tooltip>

                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-on="on"
                        v-bind="attrs"
                        small 
                        text
                        dark
                        @click="clone(item)"                
                        class="ml-1 teal darken-3">                    
                            <v-icon
                                small                        
                            >
                                mdi-content-copy
                            </v-icon>
                        </v-btn>                
                    </template>

                        <span>
                            Clonar
                        </span>
                </v-tooltip>
                <slot name="extra-action" :item="item"></slot>
                
                <!-- 
                    // MAYBE TODO 
                    // turn this slot implementable by component father.
                -->
            </template>
        </v-data-table>

        <confirmation-dialog 
        :active="!!deletingItem"                
        @Closethis="deletingItem = null"
        @SendRequest="destroy()"
        >
            <template v-if="!!deletingItem">
                Você tem certeza de que deseja deletar: "<b>{{deletingItem  [MainAtt]}}</b>" ?!                
            </template>
        </confirmation-dialog>
    </v-container>

</template>

<script>
import {mapMutations} from "vuex"
import ConfirmationDialog from '@/components/confirmationDialog.vue';

export default {
    name: "TableModel",
    
    props: {
        Model: String,
        Data: null,
        Headers: null,
        ViewCreate: String,
        ModelApi:String,
        LongItems: [],
        MainAtt: "",
        Agroupment:null
    },
    
    data() {
        return {
            SwitchSearch: false,
            search: "",
            deletingItem:null,            
        };
    },    
    
    methods: {
        ...mapMutations({
            setUpdatingItem: "setUpdatingItem",
            setSnackBar: "setSnackBar"
        }), 

        destroy(){
            // console.log(this.deletingItem, this.deletingItem.id)
            let ide = this.deletingItem.id
            this.$axios.delete(`${this.ModelApi}${ide}`)
                .then(() =>{
                    let index = this.Data.findIndex(ele => ele.id == ide)
                    this.$emit('remove', index)
                    this.deletingItem = null

                    this.setSnackBar({
                                active:true,
                                timeout:2000,
                                color:"amber darken-1",
                                message:"Documento deletado com sucesso!"
                    })
                })
        },

        update(item) {
            this.setUpdatingItem(item)
            this.$router.push(this.ViewCreate)
        },

        clone(item){
            let cp_item = Object.create(item);            
            cp_item.id = undefined            
            this.setUpdatingItem(cp_item)
            this.$router.push(this.ViewCreate)
        }
    },

    created(){
        this.setUpdatingItem(null)
    },
    
    components: { ConfirmationDialog }
}
</script>