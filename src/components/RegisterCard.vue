<template>
  <div>
  <v-layout justify-center>
      <v-card :color="cardColor" elevation="10">
        <v-card-title><v-layout justify-center class="headline mt-3">Register New User</v-layout></v-card-title>
        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md56>
                  <v-text-field v-model="fname" :color="buttonColor" label="First name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="lname" :color="buttonColor" label="Last name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="email" :color="buttonColor" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="age" :color="buttonColor" label="Age" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="password" :color="buttonColor" label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex v-if="ActiveUser !== 'guest'" xs12>
                  <v-checkbox color="red darken-2" v-model="isAdmin" label="Admin/Staff"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="ActiveUser === 'guest'" :color="buttonColor" absolute bottom left fab @click="$router.push('/')"><v-icon>close</v-icon></v-btn>
            <v-btn :color="buttonColor" absolute bottom right fab @click="addUser()"><v-icon>done</v-icon></v-btn>
          </v-card-actions>
      </v-card>
  </v-layout>

    <v-dialog width="300" v-model="saved">
      <v-card color="green" dark>
        <v-card-text>
          User has been created.
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "#404040",
        fname: "",
        lname: "",
        email: "",
        password: "",
        age: "",
        isAdmin: false,
        saved: false
      };
    },
    methods: {
      addUser: function () {
        MS.addUser(this.fname,this.lname,this.email,this.age,this.password, this.isAdmin);
        this.saved = true;
        if(this.ActiveUser === 'guest'){
          setTimeout(() => {
            this.saved = false;
            this.$router.push('/');
          }, 2000);
        }else {
          setTimeout(() => {
            this.fname = "";
            this.lname= "";
            this.email= "";
            this.age= "";
            this.password= "";
            this.isAdmin = "";
            this.saved = false;
          }, 1500);
        }
      },
    },
    props: {
      ActiveUser: Object
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
