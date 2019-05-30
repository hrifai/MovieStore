
<template>
  <v-layout justify-center>
      <v-card elevation="10" width="900">

        <v-card-title><v-layout justify-center class="headline pt-3">
          {{ActiveUser.First_name}}'s Activity Logs
        </v-layout>
        </v-card-title>
        <v-card-text>

          <v-layout justify-center>
            <v-btn @click="order('a')">Order Ascending</v-btn>
            <v-btn @click="order('d')">Order Descending</v-btn>
            <v-btn @click="clearLogs()">Clear All Logs</v-btn>
          </v-layout>

            <v-container grid-list-md>
              <h3>Log In</h3>

              <v-layout row wrap>
                <v-flex xs4 v-for="log in login" :key="log">
                  {{log}}
                </v-flex>
              </v-layout>

              <br><h3>Log Out</h3>

              <v-layout row wrap>
                <v-flex xs4 v-for="log in logout" :key="log">
                  {{log}}
                </v-flex>
              </v-layout>

            </v-container>

          </v-card-text>
      </v-card>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-2" dark>
        <v-card-text>
          Loading logs...
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    beforeMount(){
      // this.$parent.$parent.$parent.ActiveUser = MS.getRefreshedActiveUser(this.ActiveUser.key);
      this.loading = true;
      MS.db.ref('Users/'+this.ActiveUser.key).once('value', (snap) => {
        var user = snap.val();
        this.login = user.Login.split(',').map(d => {return new Date(d).toUTCString();});
        this.logout = user.Logout.split(',').map(d => {return new Date(d).toUTCString();});
        this.loading = false;
      });
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "red darken-4",
        login: [],
        logout: [],
        loading: true
      };
    },
    props: {
      ActiveUser: Object
    },
    methods:{
      order(t){
        this.login = this.login.sort((a,b) => {
          return a - b
        });
        if(t == 'd'){
          this.login.reverse();
          this.logout.reverse();
          this.t = 'd';
        }
      },
      clearLogs(){
        MS.db.ref('Users/'+this.ActiveUser.key+'/Login').remove();
        MS.db.ref('Users/'+this.ActiveUser.key+'/Logout').remove();
        this.login = [];
        this.logout = [];
      }
    }
  };
</script>

<style scoped>
  #form {
    margin-right: 5%;
    margin-left: 5%;
    padding-top:10px;
    padding-bottom:30px;
    text-align: left;
  }

  .v-btn--large{
    padding: 10px !important;
  }

  .header {
    background-color: rgba(185, 134, 12, 0.79);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
