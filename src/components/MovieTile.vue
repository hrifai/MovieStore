<template>
    <!--<v-card color="red darken-4" width="400px;">-->
        <!--<v-img-->
          <!--:src="movie.Poster"-->
          <!--height="300"-->
        <!--&gt;</v-img>-->

        <!--<v-card-title primary-title>-->
          <!--<div class="mb-3">-->
            <!--<h3>{{movie.Name}} ({{movie.Year}})</h3>-->
            <!--<small>Price: ${{movie.Price}}</small>-->
          <!--</div>-->

          <!--<v-layout row>-->
            <!--<div v-for="i in movie.Rating">-->
              <!--<v-icon color="yellow">star</v-icon>-->
            <!--</div>-->
            <!--<div v-for="i in (5-movie.Rating)">-->
              <!--<v-icon>star_border</v-icon>-->
            <!--</div>-->
          <!--</v-layout>-->

        <!--</v-card-title>-->

        <!--<v-card-actions>-->
          <!--<v-btn flat small @click="$router.push('/movie/'+movie['.key'])"><v-icon>info</v-icon></v-btn>-->
          <!--<v-btn flat small @click="sendMovieClick();"><v-icon>shopping_cart</v-icon></v-btn>-->
        <!--</v-card-actions>-->
      <!--</v-card>-->

    <v-img :src="movie.Poster" max-height="255"  gradient="to top right, rgba(0,0,0,.33), rgba(0,0,0,.7)">
      <div class="ml-4">
        <div class="mb-3 pt-3">
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
      </div>

      <v-container grid-list-md>
        <v-layout class="pt-5">
          <v-flex xs6>
            <v-btn fab color="red darken-2" small top left @click="$router.push('/movie/'+movie['.key'])"><v-icon>info</v-icon></v-btn>
          </v-flex>
          <v-flex xs6 v-if="isGuest !== 'guest'">
            <v-btn fab color="green darken-2" small top right @click="sendMovieClick();"><v-icon>shopping_cart</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </v-container>



    </v-img>
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
          isGuest: Object
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
