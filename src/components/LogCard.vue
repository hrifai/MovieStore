
<template>
  <v-layout justify-center>
      <v-card elevation="10" width="900">

        <v-card-title><v-layout justify-center class="headline pt-3">
          {{ActiveUser.First_name}}'s Activity Logs
        </v-layout>
        </v-card-title>
        <v-card-text>

          <v-layout justify-center>
            <v-container grid-list-md>
              <v-layout justify-center class="ml-4 pl-4" row>
                <v-flex xs5><v-text-field color="red darken-2" v-model="start" label="Start Date"></v-text-field></v-flex>
                <v-flex xs5><v-text-field color="red darken-2" v-model="end" label="End Date"></v-text-field></v-flex>
                <v-flex xs1><v-btn fab flat @click="filter()"><v-icon>search</v-icon></v-btn></v-flex>
                <v-flex xs1><v-btn fab flat @click="clearSearch()"><v-icon>close</v-icon></v-btn></v-flex>
              </v-layout>
            </v-container>
            <v-btn fab absolute bottom right color="red darken-2"@click="confirm=true"><v-icon>close</v-icon></v-btn>
          </v-layout>

            <v-container grid-list-md>
              <h3>Log In</h3>

              <v-layout row wrap>
                <v-flex xs4 v-for="log in login" :key="log">
                  {{new Date(log).toDateString() + ':' + new Date(log).toLocaleString()}}
                </v-flex>
              </v-layout>

              <br><h3>Log Out</h3>

              <v-layout row wrap>
                <v-flex xs4 v-for="log in logout" :key="log">
                  {{new Date(log).toDateString() + ':' + new Date(log).toLocaleString()}}
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

    <v-dialog width="300" v-model="confirm">
      <v-card dark>
        <v-card-text>
          Are you sure you want to clear your logs? This cannot be undone.
        </v-card-text>
        <v-btn color="green darken-2" @click="clearLogs()"><v-icon>done</v-icon></v-btn>
        <v-btn color="red darken-2" @click="confirm=false"><v-icon>close</v-icon></v-btn>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    components: {},
    beforeMount(){
      // this.$parent.$parent.$parent.ActiveUser = MS.getRefreshedActiveUser(this.ActiveUser.key);
      this.loading = true;
      MS.db.ref('Users/'+this.ActiveUser.key).on('value', (snap) => {
        var user = snap.val();
        this.login = user.Login.split(',');
        this.logout = user.Logout.split(',');
        this.loading = false;
      });
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "red darken-4",
        login: [],
        logout: [],
        loading: true,
        confirm: false,
        start: "",
        end: ""
      };
    },
    props: {
      ActiveUser: Object
    },
    methods:{
      filter(){
        this.clearSearch();
        this.login = this.filterArray(this.login);
        this.logout = this.filterArray(this.logout);
      },
      clearLogs(){
        MS.db.ref('Users/'+this.ActiveUser.key+'/Login').remove();
        MS.db.ref('Users/'+this.ActiveUser.key+'/Logout').remove();
        this.login = [];
        this.logout = [];
      },
      clearSearch(){
        MS.db.ref('Users/'+this.ActiveUser.key).on('value', (snap) => {
          var user = snap.val();
          this.login = user.Login.split(',');
          this.logout = user.Logout.split(',');
        });
      },
      formatDate(dateString){
        var comps = dateString.split('/');
        dateString = comps[1]+'/'+comps[0]+'/'+comps[2];
        return dateString
      },
      filterArray(array){
        return array.filter(currentDate => {
          var check = new Date(currentDate).setHours(0,0,0,0);
          var fromDate = new Date(this.formatDate(this.start)).setHours(0,0,0,0);
          var to = new Date(this.formatDate(this.end)).setHours(0,0,0,0);
          return (check >= fromDate && check <= to);
        });
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
