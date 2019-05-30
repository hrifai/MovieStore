<template>
  <div>
  <v-container grid-list-md>
    <v-layout justify-center class="headline pb-3">Edit Movies</v-layout>
    <v-layout row wrap>
      <v-flex xs3 v-for="movie in movies" :key="movie['key']">
        <v-img
          :src="movie.Poster"
          heigh="255"
        ><v-btn @click="editMovie(movie)" color="red darken-4" fab bottom right large><v-icon>edit</v-icon></v-btn></v-img>
      </v-flex>
    </v-layout>
  </v-container>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Loading Movies...
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog fullscreen v-model="editing">
      <v-card>
        <v-btn fab flat @click="editing=false"><v-icon>close</v-icon></v-btn>
        <v-card-title><v-layout justify-center class="headline pt-3">Edit {{current.Name}}</v-layout></v-card-title>
        <movie-edit-card :current="current"></movie-edit-card>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import MS from '../firebaseCRUD'
  import MovieEditCard from './MovieEditCard'

  export default {
    components: {
      MovieEditCard
    },
    data() {
      return {
        movies: [],
        buttonColor: "red darken-2",
        subColor: "#ab302f",
        loading: true,
        current: {},
        editing: false
      };
    },
    beforeMount() {
      this.$on('closeEdit',() => {
        this.editing = false;
        this.loading = true;
        setTimeout( () => {this.loading = false},1000);
      });

      MS.db.ref('Movies').on('value', (snap) => {
        this.movies = [];
        snap.forEach(movie => {
          var mobj = movie.val();
          mobj.key = movie.key;
          this.movies.push(mobj);
        });
        setTimeout( () => {this.loading = false},1000);
      })

      // MS.getMovies().then(data => {
      //   this.movies = data;
      //   setTimeout(() => {this.loading = false}, 1000);
      // });

    },
    props: {
      ActiveUser: Object
    },
    methods: {
      editMovie(movie){
        this.editing = true;
        this.current = movie;
        this.$emit('reloadData', movie.key);
      }
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
