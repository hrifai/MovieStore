<template>
  <v-container grid-list-md>
    <v-layout justify-center class="headline pb--4">All Movies</v-layout>
    <v-layout row>
      <v-btn v-if="ActiveUser === 'guest'" fab color="red darken-2" @click="$router.push('/')"><v-icon>home</v-icon></v-btn>
      <v-flex xs7>
      </v-flex>
    <v-flex xs5>
      <v-text-field
          v-if="loading == false"
          @click:append="searchMovies()"
          placeholder="Search via title key words or year..."
          single-line
          v-model="search"
          append-icon="search"
          color="white"
          hide-details
        ></v-text-field>
    </v-flex>
    </v-layout>

    <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs3 v-for="movie in movies" :key="movie['.key']">
        <v-container>
          <movie-tile :isGuest="ActiveUser" :movie="movie"></movie-tile>
        </v-container>
    </v-flex>
  </v-layout>
    </v-container>

    <v-snackbar v-model="snackbar" :top="true" :timeout="6000" color="dark">
      <v-layout justify-center align-center fill-height>{{ snackbar_text }}</v-layout>
    </v-snackbar>

    <v-snackbar v-model="queueBar" auto-height :vertical="true" :timeout="0" :bottom="true" :left="true" color="red darken-4">
      <v-layout justify-center align-center fill-height class="headline mb-3">Movies in Cart</v-layout>
      <v-layout v-for="movie in queue" :key="movie.Id">
          {{ movie.Name + '\t'}} ${{ movie.Price }}
      </v-layout>
      <v-divider class="subheading mt-3"></v-divider>
      <div class="subheading mt-3">Total: ${{quetotal}}</div>
      <div style="border-width: 2px; border-color: #fff">
        <router-link :to="{name:'checkout', params: {queue}}">Checkout Now <v-icon> arrow_forward</v-icon></router-link>
      </div>
    </v-snackbar>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Loading Movies...
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog fullscreen v-model="searchScreen">
      <v-card dark>
        <v-btn fab flat @click="searchScreen=false"><v-icon>close</v-icon></v-btn>
        <v-container grid-list-md>
          <v-layout justify-center class="headline pb-3">Search Results</v-layout>
          <v-layout v-if="searchResults.length > 0" row wrap>
            <v-flex xs3 v-for="movie in searchResults" :key="movie.key">
              <movie-tile :isGuest="ActiveUser" :movie="movie"></movie-tile>
            </v-flex>
          </v-layout>
          <v-layout v-else row wrap>
            <v-layout class="headline">No Results Found</v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import MS from '../firebaseCRUD'
  import MovieTile from "./MovieTile";

  export default {
    components: {
      MovieTile,
    },
    data() {
      return {
        movies: [],
        subColor: "#ab302f",
        badge_count: 0,
        hidden: false,
        snackbar: false,
        snackbar_text: null,
        queueBar: false,
        queue: [],
        timeout: 0,
        search: "",
        quetotal: null,
        loading: true,
        searchScreen: false,
        searchResults: []
      };
    },
    beforeMount() {
      setTimeout(()=>{this.loading = false}, 2000);
      this.$on('movie_added', (movie) => {
        if(this.queue.filter(qMovie => {return (qMovie.Name === movie.Name)}).length === 0){
          this.queue.push(movie);
          this.snackbar = true;
          this.snackbar_text = "You added " + movie.Name + " to the cart";
          this.quetotal = this.getQueTotal();
          this.handleRent()
        } else {
          this.snackbar = true;
          this.snackbar_text = "You removed " + movie.Name + " from the cart";
          this.queue.splice(this.queue.indexOf(movie),1);
          if(this.queue.length === 0){
            this.queueBar = false;
          }
          this.handleRent()
        }
      })

    },
    mounted(){
    },
    props:{
      ActiveUser: Object
    },
    methods: {
      handleRent() {
        this.queueBar = true;
        this.quetotal = this.getQueTotal();
        if (this.queue.length === 0) {
          this.queueBar = false;
        }
      },
      searchMovies(){
        this.searchResults = this.movies.filter(movie => {
          return movie.Name.toLowerCase().includes(this.search.toLowerCase()) || movie.Description.toLowerCase().includes(this.search.toLowerCase()) || movie.Year.toLowerCase().includes(this.search.toLowerCase());
        });
        this.searchScreen = true;
      },
      getQueTotal() {
        var count = 0;
        this.queue.forEach(e => {
          count += parseInt(e.Price);
        });
        return count;
      }
    },
    firebase : {
      movies: MS.db.ref('Movies')
    }
  };
</script>

<style scoped>

  a {
    color: #fff;
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
