<template>
  <div>
  <v-container grid-list-md>
    <v-layout justify-center class="headline pt-3">All Users</v-layout>
      <v-flex xs12>
        <v-text-field
          v-if="loading==false"
          @click:append="searchUsers()"
          placeholder="Search via name, email, city or 'staff'"
          single-line
          v-model="search"
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
      </v-flex>
    <v-layout row wrap>
      <v-flex xs4 v-for="user in users" :key="user['key']">
        <v-container>
          <v-btn color="red darken-3" @click="editUser(user)">{{user.First_name}} {{user.Last_name}}</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Loading Users...
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog fullscreen v-model="editing">
      <v-card>
        <v-btn fab flat @click="editing=false"><v-icon>close</v-icon></v-btn>
        <v-card-title><v-layout justify-center class="headline pt-3">{{current.First_name}}'s Profile</v-layout></v-card-title>
        <user-edit-card :current="current"></user-edit-card>
      </v-card>
    </v-dialog>

    <v-dialog fullscreen v-model="searchScreen">
      <v-card dark>
        <v-btn fab flat @click="searchScreen=false"><v-icon>close</v-icon></v-btn>
        <v-container grid-list-md>
          <v-layout v-if="searchResults.length > 0" row wrap>
            <v-flex xs4 v-for="user in searchResults" :key="user.key">
              <v-btn color="red darken-3" @click="editUser(user)">{{user.First_name}} {{user.Last_name}}</v-btn>
            </v-flex>
          </v-layout>
          <v-layout v-else row wrap>
            <v-layout class="headline">No Results Found</v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import MS from '../firebaseCRUD'
  import userEditCard from './UserEditCard'

  export default {
    components: {
      userEditCard
    },
    data() {
      return {
        users: [],
        staff: [],
        buttonColor: "red darken-2",
        subColor: "#ab302f",
        searchResults:[],
        search: "",
        searchScreen: false,
        loading: true,
        current: {},
        editing: false
      };
    },
    beforeMount() {
      this.$on('closeEdit',() => {
        this.editing = false;
        this.loading = true;
        setTimeout(()=>{this.loading = false},1500)
      });

          MS.db.ref('Users').on('value', (snap) => {
            this.users = [];
            snap.forEach(order => {
              var user = order.val();
              user.key = order.key;
              this.users.push(user);
              setTimeout(()=>{this.loading = false},1500)
            })
          });

    },
    props: {
      ActiveUser: Object
    },
    methods: {
      editUser(user){
        this.editing = true;
        this.current = user;
        this.$emit('reloadData', user.key);
      },
      searchUsers(){
        if(this.search !== 'staff') {
          this.searchResults = this.users.filter(user => {
            return user.First_name.toLowerCase().includes(this.search.toLowerCase()) || user.Last_name.toLowerCase().includes(this.search.toLowerCase()) || user.ShippingInfo.city.toLowerCase().includes(this.search.toLowerCase());
          });
        } else {
          this.searchResults = this.users.filter(user => {
            return user.isAdmin == true;
          });
        }
        this.searchScreen = true;
      },
    }
  };
</script>

<style scoped>

  a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
  }

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
