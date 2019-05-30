<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" fixed clipped app v-if="activeUser !== 'guest'">

      <v-list dense>
        <v-list-tile class="mt-3" @click="$router.push('/usersettings')">

          <v-list-tile-action>
            <v-avatar>
              <v-icon>person</v-icon>
            </v-avatar>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{activeUser.First_name}} - Account Settings</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-subheader class="mt-3 grey--text text--darken-1">MAIN MENU</v-subheader>

        <v-list-tile v-for="item in items" :key="item.text" @click="$router.push(item.route)">

          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <div v-if="activeUser.isAdmin == true">

        <v-subheader class="mt-3 grey--text text--darken-1">SETTINGS</v-subheader>

        <v-list-tile class="mt-3" @click="$router.push('addMovie')">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Add A Movie</v-list-tile-title>
        </v-list-tile>

          <v-list-tile @click="$router.push('/managemovies')">
            <v-list-tile-action>
              <v-icon color="grey darken-1">fas fa-film</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">Manage Movies</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="$router.push('/register')">
            <v-list-tile-action>
              <v-icon color="grey darken-1">fingerprint</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">Add User</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="$router.push('/users')">
            <v-list-tile-action>
              <v-icon color="grey darken-1">wc</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="grey--text text--darken-1">Manage Users</v-list-tile-title>
          </v-list-tile>


        </div>

        <v-list-tile class="mt-3" @click="logOut()">

          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>
              Log Out
            </v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="red darken-4" dense fixed clipped-left app>
      <v-toolbar-side-icon v-if="activeUser !== 'guest'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push('/movies')" class="mr-5 align-center">
        <span class="title"><v-icon class="mx-3">fas fa-film</v-icon>Movie Store</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <transition name="slide-in-left" mode="out-in">
              <router-view :ActiveUser="activeUser"></router-view>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  import MS from './firebaseCRUD'

  export default {
    beforeMount(){

      if(!!localStorage.ActiveUser){
        localStorage.ActiveUser = 'guest';
      }

      this.$on('userFound', function(user){
       this.activeUser = user;
      })
    },
    data: () => ({
      isLoggedIn: true,
      drawer: false,
      items: [
        { icon: 'home', text: 'Home Page', route: "/home"},
        { icon: 'movie', text: 'All Movies', route: "/movies" },
        { icon: 'history', text: 'Order History', route:"/history" },
        { icon: 'alarm', text: 'Logs', route:'/logs' }
      ],
      activeUser: 'guest',
    }),
    props: {
      source: String,
    },
    methods:{
      logOut(){
        this.drawer = false;
        MS.log(this.activeUser.key, 'Logout');
        this.activeUser = 'guest';
        localStorage.activeUser = 'guest';
        this.$router.push('/')
      }
    }
  }
</script>

<style>

  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-in-left-enter-active {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }

  .slide-out-left-leave-active {
    -webkit-animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
    animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }

</style>
