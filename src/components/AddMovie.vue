<template>
  <div>
  <v-layout justify-center>
      <v-card :color="cardColor" elevation="10" width="600">
          <v-card-title><span class="headline">Add Movie To System</span></v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md56>
                  <v-text-field v-model="name" :color="buttonColor" label="Movie Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="price" :color="buttonColor" label="Movie Price" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :color="buttonColor" absolute bottom left fab @click="$router.push('/home')"><v-icon>close</v-icon></v-btn>
            <v-btn :color="buttonColor" absolute bottom right fab @click="addMovie()"><v-icon>done</v-icon></v-btn>
          </v-card-actions>
      </v-card>
  </v-layout>

  <v-dialog width="300" v-model="saved">
    <v-card color="green" dark>
      <v-card-text>
        Movie has been added. Please Check Catalouge.
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
        name: "",
        price: 0,
        movies: [],
        saved: false
      };
    },
    beforeMount() {
    },
    methods: {
      addMovie(){
       MS.newMovieAPI(this.name, this.price).then(movie => {
         MS.db.ref('Movies').push(movie).then(e => {
           this.saved = true;
           setTimeout(()=>{this.saved = false;this.$router.push('/managemovies')}, 1500);
         });
       });
      },
    },
    firebase:{
      movies: MS.db.ref('Movies')
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
