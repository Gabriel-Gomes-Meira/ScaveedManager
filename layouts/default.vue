<template>
  <v-app dark>

    <v-navigation-drawer v-model="drawer" app absolute
    height="100%">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="'list' + i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" 
    app style="position: inherit"
    max-height="60px">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" class="text-h4" />
      <v-spacer></v-spacer>
      
      <v-btn to="/user/setting" icon >
        <v-icon> mdi-cog-outline </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="main-container">
      <v-container>
        <transition name="slide-y">                
            <Nuxt
            v-show="!loading"/>                            
        </transition>
        
        <loading 
        :showing="loading"/>    
      </v-container>
    </v-main>

    <v-snackbar 
    v-model="getSnackBar.active"
    v-text="getSnackBar.message"
    :color="getSnackBar.color"
    :timeout="getSnackBar.timeout"></v-snackbar>
  </v-app>
</template>

<script>

import { mapGetters, mapMutations} from "vuex";
import loading from "./loading.vue"

export default {
    name: "DefaultLayout",

    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            title: "Scavued",
            
        };
    },

    computed: {
        ...mapGetters([
            'loading', 'userSetted', 'getSnackBar'
        ]),
        items(){
          let list = [{
                icon: "mdi-newspaper-variant-multiple-outline",
                title: "News",
                to: "/",
            },{
                title: "Sites",
                icon: "mdi-sitemap",
                to: "/sites/",
            },{
                title: "Listens",
                icon: "mdi-message-alert-outline",
                to: "/listens/",
            }]
          if(this.userSetted){
            list.push({
              title: "Notification Models",
              icon: "mdi-email-newsletter",
              to: "/notification_models/"
            },{
              title: "Model Tasks",
              icon: "mdi-script-text-outline",
              to: "/model_tasks/"
            },{
              title: "Queue Tasks",
              icon: "mdi-human-queue",
              to: "/queued_tasks/"
            })
          }
          return list
        }
    },

    components:{
        loading
    },

    methods:{
      ...mapMutations({
        setUserSetting:"setUserSetting"
      })
    },

    created(){
      this.$axios.get('/user/').then((resp) => {
        this.setUserSetting(resp.data)
      })
    },

    transition: "slide-y"
};
</script>

<style>
    .slide-y-enter-active, .slide-y-leave-active { 
        transition: 0.8s;         
        position: relative;
        top:0;
        opacity: 1;
    }
    .slide-y-enter, .slide-y-leave-active { 
        position: relative;
        top: -200px;        
        opacity: 0;
        transition: 0s;
    }
</style>
