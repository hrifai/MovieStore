<template>
  <div>
  <v-layout justify-center>
      <v-card elevation="10" width="900">
        <v-card-title><v-layout justify-center class="headline pt-3">{{ActiveUser.First_name}}'s Profile</v-layout></v-card-title>
        <v-card-text>
            <v-container grid-list-md>
              <small>Personal Info</small>
              <v-layout wrap>
                <v-flex xs6>
                  <v-text-field v-model="ActiveUser['First_name']" :color="buttonColor" label="First name" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="ActiveUser['Last_name']" :color="buttonColor" label="Last name" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                <v-text-field v-model="ActiveUser['Email']" :color="buttonColor" label="Email" required></v-text-field>
              </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="ActiveUser.Password" :color="buttonColor" label="Password" required></v-text-field>
                </v-flex>
              </v-layout>
              <br><small>Shipping Info</small>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="ActiveUser.ShippingInfo['address']" :color="buttonColor" label="Address" required></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-text-field v-model="ActiveUser.ShippingInfo['city']" :color="buttonColor" label="City" required></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-model="ActiveUser.ShippingInfo['postCode']" :color="buttonColor" label="Post Code" required></v-text-field>
                </v-flex>
              </v-layout>
              <br><small>Payment Info</small>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="ActiveUser.PaymentDetails['cardNumber']" :color="buttonColor" label="Card Number" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="ActiveUser.PaymentDetails['exp']" :color="buttonColor" label="Expiry Date" required></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="ActiveUser.PaymentDetails['cvc']" :color="buttonColor" label="CVC" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="buttonColor" absolute bottom right fab @click="save()"><v-icon>done</v-icon></v-btn>
            <v-btn :color="buttonColor" absolute bottom left fab @click="deleteDialog = true"><v-icon>delete</v-icon></v-btn>
          </v-card-actions>
        {{ActiveUser}}
      </v-card>
  </v-layout>

  <v-dialog width="300" v-model="saved">
    <v-card color="green" dark>
      <v-card-text>
        Data has been updated.
      </v-card-text>
    </v-card>
  </v-dialog>

    <v-dialog width="300" v-model="deleteDialog">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Are you sure you want to delete your account? This cannot be undone.
        </v-card-text>
        <v-btn @click="deleteAccount()">Yes</v-btn>
        <v-btn @click="deleteDialog=false">No</v-btn>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    beforeMount(){
      MS.db.ref('Users/'+this.ActiveUser.key+'/Logout').once('value', (snap) => {
        this.ActiveUser.Login = snap.val();
      });
      MS.db.ref('Users/'+this.ActiveUser.key+'/Login').once('value', (snap) => {
        this.ActiveUser.Logout = snap.val();
      })
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "red darken-4",
        fname: "",
        lname: "",
        email: "",
        password: "",
        age: "",
        saved: false,
        deleteDialog: false
      };
    },
    props: {
      ActiveUser: Object
    },
    methods:{
      save(){
        MS.db.ref('Users/'+this.ActiveUser.key).set(this.ActiveUser);
        this.saved = true;
        setTimeout(() => {this.saved = false}, 5000);
      },
      deleteAccount(){
        MS.db.ref('Users/'+this.ActiveUser.key).remove();
        this.ActiveUser = 'guest';
        localStorage.activeUser = '';
        this.$router.push('/');
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
