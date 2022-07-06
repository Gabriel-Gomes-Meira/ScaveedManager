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
            :to="ViewCreate"
            icon>
                <v-icon                
                size="33">mdi-plus</v-icon>
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
                <v-btn
                class="red"
                text
                dark
                @click="deletingItem = item"
                >
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
                <v-btn 
                text
                @click="update(item)"                
                class="mr-2 primary">                    
                    <v-icon
                        small                        
                    >
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn 
                text
                @click="clone(item)"                
                class="mr-2 primary">                    
                    <v-icon
                        small                        
                    >
                        mdi-content-copy
                    </v-icon>
                </v-btn>                
                
                <!-- 
                    // MAYBE TODO 
                    // turn this slot implementable by component father.
                -->
            </template>
        </v-data-table>

        <Destroyer 
        :active="!!deletingItem"
        :Item="deletingItem"
        :MainProp="MainAtt"
        @Closethis="deletingItem = null"
        @SendRequest="destroy()"
        />
    </v-container>

</template>

<script>
import {mapMutations} from "vuex"
import Destroyer from "./destroyer.vue"

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
            setUpdatingItem: "setUpdatingItem"
        }), 

        destroy(){
            // console.log(this.deletingItem, this.deletingItem._id.$oid)
            let ide = this.deletingItem._id.$oid
            this.$axios.delete(`${this.ModelApi}${ide}`)
                .then(() =>{
                    let index = this.Data.findIndex(ele => ele._id.$oid == ide)
                    this.$emit('remove', index)
                    this.deletingItem = null
                })
        },

        update(item) {
            this.setUpdatingItem(item)
            this.$router.push(this.ViewCreate)
        },

        clone(item){
            let cp_item = Object.create(item);            
            cp_item._id = undefined            
            this.setUpdatingItem(cp_item)
            this.$router.push(this.ViewCreate)
        }
    },

    created(){
        this.setUpdatingItem(null)
    },
    
    components: { Destroyer }
}
</script>