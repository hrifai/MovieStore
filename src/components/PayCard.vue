<template>
  <v-layout row wrap justify-center>

    <v-card :color="cardColor" elevation="10" width="400">
      <v-card-title><v-layout justify-center class="headline mt-3">Payment Details</v-layout></v-card-title>
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
              <v-text-field v-model="cardNum" :color="buttonColor" label="Card Number" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="exp" :color="buttonColor" label="Expiry" required></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="cvc" :color="buttonColor" label="CVC" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox color="red darken-2" v-model="isAdmin" label="I agree to the terms & conditions"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-card color="red darken-4" elevation="10" width="400">
      <v-card-title><v-layout justify-center class="headline mt-3">Movies in Cart</v-layout></v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <!--<v-layout v-for="movie in [{Name: 'Movie1', Price: 10}, {Name: 'Movie2', Price: 15}, {Name: 'Movie3', Price: 25}]" :key="movie.name" wrap>-->
            <!--<v-flex xs12 sm6 md56>-->
              <!--<p>{{movie.Name + '\t'}} -&#45;&#45; ${{movie.Price}}</p>-->
            <!--</v-flex>-->
          <!--</v-layout>-->
          <v-flex xs3 v-for="movie in queue" :key="movie['.key']">
            <v-img
              :src="movie.Poster"
              heigh="255"
            ><v-btn @click="removeMovie(movie)" color="red darken-4" fab bottom right small>X</v-btn></v-img>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-btn absolute bottom right fab @click="validate()"><v-icon>done</v-icon></v-btn>
    </v-card>

  </v-layout>
</template>

<script>

  import MS from '../firebaseCRUD'

    export default {
        name: "PayCard",
        methods: {
          validate(){
            this.cardNum = this.cardNum.split('-').join('').split(',').join('');
            var isValid = (/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(this.cardNum));
            if(isValid){
              $route.push()
            } else {

            }
          }
        },
      data() {
          return {
            buttonColor: 'red darken-4',
            fname: "",
            lname: "",
            cardNum: "",
            exp: "",
            cvc: ""

          }
      },
      props:{
          activeUser: Object,
          queue: Array
      }
    }
</script>

<style scoped>

</style>
