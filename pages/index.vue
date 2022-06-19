 <template>
        
    <v-row justify="center">
        <v-col cols="12">
            <v-sheet class="white rounded"
            style="padding:1px"
            >
                <v-card elevation="0" 
                class="rounded">                        
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">headline</h3>
                            <div>description</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>

                    </v-card-actions>
                </v-card>        
            </v-sheet>
        </v-col>

        <v-col
        cols="6">
            <v-sheet color="orange rounded-lg px-2">
                <v-row>
                    <v-col cols="6">
                        <v-card
                            class="mx-auto"
                            color="orange"
                            dark           
                            elevation="0"                         
                        >
                            <v-card-title>
                            <v-icon
                                large
                                left
                            >
                                mdi-movie-open-play-outline
                            </v-icon>
                            <span class="text-h6 font-weight-light">Entertainment</span>
                            </v-card-title>
            
                            <v-card-text class="text-h5 font-weight-bold">                                        
                                "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."                                                            
                            </v-card-text>
                            
            
                            <v-card-actions>
                                <v-list-item class="grow">
                                <v-list-item-avatar color="grey darken-3">
                                    <v-img
                                    class="elevation-6"
                                    alt=""
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                ></v-img>
                                </v-list-item-avatar>
            
                                <v-list-item-content>
                                <v-list-item-title>Evan You</v-list-item-title>
                                </v-list-item-content>
            
                                <v-row
                                align="center"
                                justify="end"
                                >
                                <v-icon class="mr-1">
                                    mdi-heart
                                </v-icon>
                                <span class="subheading mr-2">256</span>
                                <span class="mr-1">·</span>
                                <v-icon class="mr-1">
                                    mdi-share-variant
                                </v-icon>
                                <span class="subheading">45</span>
                                </v-row>
                            </v-list-item>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        class="rounded-lg"
                        style="opacity: 0.85"
                        contain></v-img>                                                                                        
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>

        <v-col cols="6">
            <v-card
                class="mx-auto"
                max-width="400"
            >
                <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>

                <v-card-subtitle class="pb-0">
                Number 10
                </v-card-subtitle>

                <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="orange"
                    text
                >
                    Share
                </v-btn>

                <v-btn
                    color="orange"
                    text
                >
                    Explore
                </v-btn>
                </v-card-actions>
            </v-card>                
        </v-col>
    </v-row>            
       
 </template>
 
 <script>
 export default {
 
 }
 </script>
 
 <style>
 
 </style>