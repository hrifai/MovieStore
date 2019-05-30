<template>
  <div>
    <v-container grid-list-md>
      <v-layout justify-center class="headline">{{ActiveUser.First_name}}'s Order History</v-layout>
      <v-layout row>
        <v-flex xs8>
        </v-flex>
        <v-flex xs3>
          {{search}}
          <v-text-field
            @click:append="searchMovies()"
            placeholder="Search..."
            single-line
            v-model="search"
            append-icon="search"
            color="white"
            hide-details
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout v-if="orders.length > 0" row wrap>
        <v-flex xs4 v-for="order in orders" :key="order.key">
          <order-tile :order="order"></order-tile>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-layout class="headline">No Previous Orders</v-layout>
      </v-layout>
    </v-container>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Loading Orders...
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import MS from '../firebaseCRUD'
  import OrderTile from './OrderTile'

  export default {
    beforeMount(){
      this.loading = true;
      this.getOrders();
      setTimeout(() => {this.loading = false;}, 2000)
    },
    components: {
      OrderTile
    },
    props: {
      ActiveUser: Object
    },
    data() {
      return {
        subColor: "#ab302f",
        orders: [],
        loading: false,
        current: {},
      };
    },
    methods: {
      getOrders(){
        MS.getOrders(this.ActiveUser.key).then(orders => {
           this.orders = orders;
        });
      },
      ObjToArray(obj){
        var arr = new Array(Object.keys(obj).length);
        for(var key in obj){
          arr[key] = obj[key];
        }
        return arr;
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
