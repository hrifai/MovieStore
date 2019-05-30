<template>

  <div>
    <v-card>
        <v-stepper style="width:850px;height:700px;" v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1">Review Order</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 2" step="2">Confirm User Details</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 3" step="3">Shipping Details</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 4" step="4">Payment Details</v-stepper-step>
            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <h1 class="headline">Review Your Order</h1>
              <v-container grid-list-md>
                <v-layout row wrap>
                <v-flex xs3 v-for="movie in queue" :key="movie['.key']">
                    <v-img
                      :src="movie.Poster"
                      heigh="255"
                    ><v-btn @click="removeMovie(movie)" color="red darken-4" fab bottom right small>X</v-btn></v-img>
                </v-flex>
                </v-layout>
              </v-container>
            </v-stepper-content>

            <v-stepper-content step="2">
               <v-layout justify-center class="headline pt-3">{{ActiveUser.First_name}}'s Profile</v-layout>
                  <v-container grid-list-md>
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
                        <v-text-field v-model="ActiveUser.Password" :color="buttonColor" type="password" label="Password" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-layout justify-center class="headline pt-3">{{ActiveUser.First_name}}'s Shipping Details</v-layout>
              <v-layout justify-center>
                <v-container grid-list-md>
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
                    </v-container>
              </v-layout>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-layout justify-center class="headline pt-3">{{ActiveUser.First_name}}'s Payment Details</v-layout>
              <v-layout justify-center>
                <v-container grid-list-md>
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
              </v-layout>
            </v-stepper-content>

          </v-stepper-items>
        </v-stepper>
      {{currentStep}}

        <v-btn fab absolute bottom left color="primary" :disabled="parseInt(currentStep) === 1 || parseInt(currentStep) === 0" @click="stepper(-1)"><v-icon>arrow_back</v-icon></v-btn>
        <v-btn fab absolute bottom v-if="currentStep < 4" right color="primary" @click="stepper(1)"><v-icon>arrow_forward</v-icon></v-btn>
        <v-btn fab absolute bottom v-if="currentStep >= 4" right color="green" @click="validateOrder()"><v-icon>done</v-icon></v-btn>

        </v-card>

        <v-dialog width="300" v-model="confirm">
          <v-card dark>
            <v-card-text>
              Are you sure you want to make this order? This cannot be undone.
            </v-card-text>
            <v-btn color="green darken-2" @click="makeOrder()"><v-icon>done</v-icon></v-btn>
            <v-btn color="red darken-2" @click="confirm=false"><v-icon>close</v-icon></v-btn>
          </v-card>
        </v-dialog>

    <v-dialog width="300" v-model="invalid">
      <v-card color="red darken-2" dark>
        <v-card-text>
          Please make sure all fields are filled in before proceeding.
        </v-card-text>
        <v-btn color="green darken-2" @click="invalid=false"><v-icon>done</v-icon></v-btn>
      </v-card>
    </v-dialog>

 </div>

</template>

<script>
  import MS from '../firebaseCRUD'
  import MovieTile from './MovieTile'

  export default {
    beforeMount(){
      this.$parent.$parent.$parent.ActiveUser = MS.getRefreshedActiveUser(this.ActiveUser.key);
    },
    components: {
      MovieTile
    },
    props: {
      queue: Array,
      ActiveUser: Object
    },
    data() {
      return {
        currentStep: 0,
        refer: {},
        buttonColor: 'white',
        confirm: false,
        invalid: false
      };
    },
    methods: {
      removeMovie(movie){
        this.queue = this.queue.filter(e => e.Name !== movie.Name);
      },
      validateOrder(){
      if (this.currentStep == 4){
          if(this.ActiveUser.PaymentDetails['cardNumber'] == '' || this.ActiveUser.PaymentDetails['exp'] == '' || this.ActiveUser.PaymentDetails['cvc'] == ''){
            this.invalid = true;
          } else {
           this.confirm = true;
          }
        }
      },
      makeOrder(){
        var orderObj = MS.addOrder(this.ActiveUser['key'],this.ActiveUser.ShippingInfo, this.ActiveUser.PaymentDetails, this.queue);
        this.confirm = false;
        this.$router.push({name: 'reciept', params: {Order:orderObj}})
      },
      stepper(step){
        if(this.currentStep == 2){
          if(this.ActiveUser.First_Name == '' || this.ActiveUser.Last_Name == '' || this.ActiveUser.Email == ''){
            this.invalid = true
          } else {
            this.currentStep = parseInt(this.currentStep) + parseInt(step);
          }
        } else if (this.currentStep == 3){
          if(this.ActiveUser.ShippingInfo['address'] == '' || this.ActiveUser.ShippingInfo['city'] == ''|| this.ActiveUser.ShippingInfo['postCode'] == ''){
            this.invalid = true;
          } else {
            this.currentStep = parseInt(this.currentStep) + parseInt(step);
          }
        }
        else {
          this.currentStep = parseInt(this.currentStep) + parseInt(step);
        }
      }
    }
  }
</script>

<style scoped>

  .v-card {
    box-shadow: none;
  }

</style>
