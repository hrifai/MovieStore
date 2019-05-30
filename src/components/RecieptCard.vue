<template>
  <div>
  <v-layout justify-center>
    <v-card elevation="10" width="900">
        <v-card-title><v-layout justify-center class="headline pt-3">{{ActiveUser.First_name}}'s Confirmed Order</v-layout></v-card-title>
        <v-card-text>
          <h1 class="headline pl-3">Order Id: {{Order.key}}</h1>
          <h1 class="headline pl-3">Your Movies:</h1>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs3 v-for="movie in Order.movies" :key="movie['.key']">
                <v-img
                  :src="movie.Poster"
                  heigh="255"
                ></v-img>
              </v-flex>
            </v-layout>
          </v-container>
            <h1 class="headline pl-3">Shipping Info:</h1>
            <h2 class="pl-3">{{ActiveUser.ShippingInfo.address}},{{ActiveUser.ShippingInfo.city}},{{ActiveUser.ShippingInfo.postCode}}</h2>
            <h1 class="headline pl-3 pt-4">Payment Info:</h1>
            <h2 class="pl-3">Num: {{ActiveUser.PaymentDetails.cardNumber}}</h2>
            <h2 class="pl-3">Exp:{{ActiveUser.PaymentDetails.exp}}</h2>
            <h1 class="headline pl-3 pt-4">Order Total: ${{Order.totalPrice}}</h1>
        </v-card-text>
        <v-btn color="red darken-4" fab absolute bottom right @click="$router.push('home')"><v-icon>home</v-icon></v-btn>
      </v-card>
  </v-layout>

    <v-dialog width="300" v-model="done">
      <v-card color="green" dark>
        <v-card-text>
          Congrats! Your order is now finalised!
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    beforeMount(){
      setTimeout(() => {this.done = false}, 2000)
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "red darken-4",
        done: true,
        deleteDialog: false
      };
    },
    props: {
      ActiveUser: Object,
      Order: Object
    },
    methods:{
      save(){}
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
