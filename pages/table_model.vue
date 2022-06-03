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
        class="rounded-b-lg rounded-t-0"
        light
        id="Table"
        >
            <template slot="no-data">
                Não há registro de {{Model}} cadastrado!
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn 
                text
                class="mr-2 primary">
                    <v-icon
                        small                        
                        @mouseenter="SelectedItem = item"
                    >
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn
                class="red"
                text
                dark
                @mouseenter="SelectedItem = item"
                >
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>

        
    </v-container>

</template>

<script>

export default {    
    name:"TableModel",
    props:{
        Model:String,
        Data:null,
        Headers:null,
        ViewCreate: String,
    },
    data () {
        return {        
            SwitchSearch: false,
            search:'',
            SelectedItem:null,            
        }
    },    
    methods: {      
    },
}
</script>