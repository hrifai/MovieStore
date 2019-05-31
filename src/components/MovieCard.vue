<template>
  <div>
  <v-card color="red darken-4" class="white--text">
    <v-layout row>
      <v-flex xs8>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{movie.Name}}</div>
            <div>{{movie.Year}}</div><br>
            <div>{{movie.Description}}</div><br>
            <div>Price: ${{movie.Price}}</div>
          </div>
        </v-card-title>
      </v-flex>
      <v-flex xs4>
        <v-img
          :src="movie.Poster"
          height="510px"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div v-for="i in movie.Rating">
        <v-icon color="yellow">star</v-icon>
      </div>
      <div v-for="i in (5-movie.Rating)">
        <v-icon>star_border</v-icon>
      </div>
      <v-btn fab absolute bottom left @click="$router.push('/movies')"><v-icon>arrow_back</v-icon></v-btn>
    </v-card-actions>
  </v-card>

    <v-dialog width="300" v-model="loading" persistent>
      <v-card dark>
        <v-card-text>
          One Moment Please...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import MS from '../firebaseCRUD';

    export default {
        name: "MovieCard",
        beforeMount(){
          this.id = this.$route.params.selectedId;
          MS.db.ref('Movies/'+this.id).on('value', snapshot => {
            this.loading = false;
            this.movie = snapshot.val();
            console.log(this.movie);
          })
        },
      methods:{
          log(a){
            console.log(this.movies);
            console.log(a)
          }
      },
      data(){
          return {
            movie: {},
            movies: [],
            id: null,
            loading:true,
          }
      },
      props:{
          color: String,
          selectedId: String,
          ActiveUser: Object
      }
    }
</script>

<style scoped>

</style>
