<template>
  <v-layout justify-center fill height>

      <v-card :color="cardColor" elevation="10" width="400">
          <v-card-title><v-layout justify-center class="headline mt-3">Movie Store Login</v-layout></v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="email" :color="buttonColor" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="password" :color="buttonColor" label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <router-link to="/register"><em><small>Don't have an account? Register here</small></em></router-link><br>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="buttonColor" absolute bottom right fab @click="handleLogin()"><v-icon>done</v-icon></v-btn>
            <v-btn :color="buttonColor" absolute bottom left fab @click="$router.push('/movies')"><v-icon>fas fa-film</v-icon></v-btn>
          </v-card-actions>
      </v-card>

    <v-dialog width="300" v-model="loadingDialog" persistent>
      <v-card :color="buttonColor" dark>
        <v-card-text>
            {{dialogText}}
          <v-progress-linear :v-if="dialogText === 'One moment please...' "
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    beforeMount(){
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "#404040",
        email: "",
        password: "",
        people: null,
        loadingDialog: false,
        dialogText: "One moment please..."
      };
    },
    methods: {
      handleLogin(){

        this.loadingDialog = true;

        MS.login(this.email,this.password).then(activeUser => {
          if(activeUser !== -1){
            this.dialogText = "User found - Logging In...";
            this.$parent.$parent.$parent.$emit('userFound', activeUser);
            localStorage.ActiveUser = activeUser;
            setTimeout(() => {
              this.loadingDialog = false;
            }, 3000);
            this.$router.push('/home')
          } else {
            this.dialogText = "User not found. Please try again";
            setTimeout(() => {this.loadingDialog = false}, 3000)
          }
        });

      }
    }
  };
</script>

<style scoped>

  a {
    color: #dc303f;
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
