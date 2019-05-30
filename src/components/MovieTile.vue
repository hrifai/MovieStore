<template>
    <v-card color="red darken-4" width="400px;">
        <v-img
          :src="movie.Poster"
          height="300"
        ></v-img>

        <v-card-title primary-title>
          <div class="mb-3">
            <h3>{{movie.Name}} ({{movie.Year}})</h3>
            <small>Price: ${{movie.Price}}</small>
          </div>

          <v-layout row>
            <div v-for="i in movie.Rating">
              <v-icon color="yellow">star</v-icon>
            </div>
            <div v-for="i in (5-movie.Rating)">
              <v-icon>star_border</v-icon>
            </div>
          </v-layout>

        </v-card-title>

        <v-card-actions>
          <v-btn flat small @click="$router.push('/movie/'+movie['.key'])"><v-icon>info</v-icon></v-btn>
          <v-btn flat small @click="sendMovieClick();"><v-icon>shopping_cart</v-icon></v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
    export default {
        name: "MovieTile",
        data() {
          return {
            color: "dark"
          }
        },
        props:{
          movie: Object,
        },
      methods:{
          sendMovieClick(m){
            var col = this.color === 'dark' ? "green lighten-2" : "dark";
            this.color = col;
           this.$parent.$emit('movie_added',this.movie)
          },
      }
    }

</script>

<style scoped>

</style>
