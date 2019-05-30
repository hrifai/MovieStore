<template>
  <div>
    <v-container>
      <v-card color="red darken-4" style="width:300px;">
        <v-btn @click="info=true" absolute fab top><v-icon>info</v-icon></v-btn>
        <v-carousel style="width:300px;" height="500">
            <v-carousel-item
              v-for="movie in order.movies"
              :key="movie.key"
              :src="movie.Poster"
            ></v-carousel-item>
          </v-carousel>
          <v-card-title primary-title>
            <div class="subheading">
              <small>Order Id: {{order.key}}</small><br>
              <small>Time: {{order.time}}</small>
              <h3>Order Total: ${{order.totalPrice}}</h3>
            </div>
          </v-card-title>
        </v-card>
   </v-container>

    <v-dialog fullscreen v-model="info">
      <v-card dark>
        <v-btn fab flat @click="info=false"><v-icon>close</v-icon></v-btn>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout justify-center class="headline">Order Details</v-layout>

            <v-layout class="headline pt-3">Order Id: {{order.key}}</v-layout>
            <v-layout class="headline pt-3">Movies</v-layout>
            <v-layout wrap>
              <v-flex xs2 v-for="movie in order.movies" :key="movie['key']">
                <v-img
                  :src="movie.Poster"
                  height="255"
                ></v-img>
              </v-flex>
            </v-layout>
            <v-layout class="headline pt-5">Order Total: ${{order.totalPrice}}</v-layout>
            <v-layout class="headline pt-5">Order Time<br>{{order.time}}</v-layout>
            <v-layout v-if="order.shipping"class="headline pt-5">Shipping Info<br>
            Address: {{order.shipping.address}}<br>
            City: {{order.shipping.city}}<br>
            Postcode: {{order.shipping.postCode}}<br>
            </v-layout>
            <v-layout v-if="order.payment"class="headline pt-5">Shipping Info<br>
              Card Number: {{order.payment.cardNumber}}<br>
              Exp: {{order.payment.exp}}<br>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
        name: "OrderTile",
        data() {
          return {
            color: "dark",
            info: false
          }
        },
        props:{
          order: Object,
        },
      methods:{
      }
    }

</script>

<style scoped>

</style>
