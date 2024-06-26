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

        <v-list-group
        active-class="accent--white white--text">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>
                mdi-history
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </template>
          
          <v-list-item
            v-for="(item, index) in historyList"
            :key="'historyList' + index"
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
          
        </v-list-group>
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
    <v-main class="main-container pt-4">
      <v-container>
        <transition name="slide-y">                
            <router-view
            v-show="!loading"/>                            
        </transition>
        
        <loading 
        :showing="loading"/>    
      </v-container>
    </v-main>

    <v-snackbar 
    :value="getSnackBar.active"
    :color="getSnackBar.color"
    :timeout="getSnackBar.timeout"
    >
    <!-- @input="hiddenSnackBar" -->
      {{getSnackBar.message}}
    </v-snackbar>
  </v-app>
</template>

<script>

import { mapGetters, mapMutations} from "vuex";
import loading from "./components/loading.vue"

export default {
    name: "DefaultLayout",

    data() {
        return {
          clipped: false,
          drawer: false,
          fixed: false,
          title: "Scavued",
          historyList:[{
            icon: "mdi-timeline-alert-outline",
            title: "Reports",
            to:"/history/reports"
          },{
            icon: "mdi-calendar-check-outline",
            title: "Tasks",
            to:"/history/tasks"
          },{
            title: "Logs",
            icon: "mdi-file-document-outline",
            to: "/history/logs"
          }]
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
            },{
                title: "Crons",
                icon: "mdi-alarm",
                to: "/crons/",
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
        setUserSetting:"setUserSetting",
        hiddenSnackBar:"hiddenSnackBar"
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
  html{
    overflow: hidden!important;
  }

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
