<template>
  <div>
      <v-container grid-list-md>
        <small>Personal Info</small>
        <v-layout wrap>
          <v-flex xs6>
            <v-text-field v-model="current['First_name']" :color="buttonColor" label="First name" required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="current['Last_name']" :color="buttonColor" label="Last name" required></v-text-field>
          </v-flex>
          <v-flex xs6>
          <v-text-field v-model="current['Email']" :color="buttonColor" label="Email" required></v-text-field>
        </v-flex>
          <v-flex xs6>
            <v-text-field v-model="current.Password" :color="buttonColor" label="Password" required></v-text-field>
          </v-flex>
        </v-layout>
        <br><small>Shipping Info</small>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field v-model="current.ShippingInfo['address']" :color="buttonColor" label="Address" required></v-text-field>
          </v-flex>
          <v-flex xs9>
            <v-text-field v-model="current.ShippingInfo['city']" :color="buttonColor" label="City" required></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="current.ShippingInfo['postCode']" :color="buttonColor" label="Post Code" required></v-text-field>
          </v-flex>
        </v-layout>
        <br><small>Payment Info</small>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field v-model="current.PaymentDetails['cardNumber']" :color="buttonColor" label="Card Number" required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="current.PaymentDetails['exp']" :color="buttonColor" label="Expiry Date" required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="current.PaymentDetails['cvc']" :color="buttonColor" label="CVC" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-checkbox color="red" v-model="current.isAdmin" label="Admin/Staff"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-spacer></v-spacer>
    <v-layout justify-center>
      <v-btn :color="buttonColor"  large @click="save()">Save <v-icon>done</v-icon></v-btn>
      <v-btn :color="buttonColor"  large @click="deleteDialog = true">Delete <v-icon>delete</v-icon></v-btn>
      <v-btn :color="buttonColor"  large @click="viewOrders(current)">View Orders <v-icon>delete</v-icon></v-btn>
    </v-layout>

  <v-dialog width="300" v-model="saved">
    <v-card color="green" dark>
      <v-card-text>
        Data has been updated.
      </v-card-text>
    </v-card>
  </v-dialog>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-2" dark>
        <v-card-text>
          Loading data...
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

    <v-dialog fullscreen v-model="showOrders">
      <v-card dark>
        <v-btn fab flat color="white" @click="showOrders=false"><v-icon>close</v-icon></v-btn>
        <v-container grid-list-md v-if="orders.length > 0">
          <v-layout row wrap>
            <v-flex xs4 v-for="order in orders" :key="order.key">
              <order-tile :order="order"></order-tile>
            </v-flex>
          </v-layout>
        </v-container>
          <v-layout v-else justify-center class="headline">No Previous Orders</v-layout>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import OrderTile from './OrderTile'
  import MS from '../firebaseCRUD'

  export default {
    components:{
      OrderTile
    },
    beforeMount(){
      this.loading = true;
      this.$parent.$parent.$parent.$parent.$on('reloadData',key => {
        console.log(key);
        this.reloadData(key);
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
        orders: [],
        loading: false,
        age: "",
        saved: false,
        deleteDialog: false,
        showOrders:false
      };
    },
    props: {
      current: Object
    },
    methods:{
      save(){
         MS.queryUser(this.current.Email,'Email').then(data => {
           MS.db.ref('Users/'+data.key).set(this.current);
         });
        this.saved = true;
        setTimeout(() => {this.saved = false}, 5000);
      },
      deleteAccount(){
        this.deleteDialog = false;
        MS.queryUser(this.current.Email,'Email').then(data => {
          MS.db.ref('Users/'+data.key).remove();
        });
        this.$parent.$parent.$parent.$parent.$emit('closeEdit')
      },
      viewOrders(){
        this.showOrders = true;
      },
      reloadData(key){
          MS.getOrders(key).then(data => {
            this.orders = data;
            this.loading = false;
          })
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
