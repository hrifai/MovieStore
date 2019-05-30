<template>
  <div>
    <v-container>
      <v-layout justify-center class="headline">Welcome Back {{ActiveUser.First_name}}!</v-layout>
      <v-layout justify-center class="subheading mt-4 pb-10">Select one of the following options</v-layout>
        <v-layout>
          <v-flex xs6 v-for="btn in menuItems" :key="btn.route">
            <v-btn @click="$router.push(btn.route)" depressed large color="red darken-2"><v-icon>{{btn.icon}}</v-icon>{{btn.text}}</v-btn>
          </v-flex>
        </v-layout>
    </v-container>


    <v-layout class="headline pt-5">Recently Added Movies</v-layout>
    <v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs3 v-for="index in 8" :key="movies[movies.length-index]['key']">
          <router-link :to="'movie/'+movies[movies.length-index].key"><v-img
            :src="movies[movies.length-index].Poster"
            height="255"
          ></v-img></router-link>
        </v-flex>
    </v-layout>
    </v-container>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Loading...
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

import MS from '../firebaseCRUD'

export default {
  components: {

  },
  beforeMount(){
    // MS.getMovies().then(data => {
    //   this.movies = data;
    // })
    MS.db.ref('Movies').on('value',(snap) => {
      snap.forEach(movie => {
        var mobj = movie.val();
        mobj.key = movie.key;
        this.movies.push(mobj);
      })
    })
  },
  props: {
    ActiveUser: Object
  },
  methods:{
    ObjToArray(obj){
      var arr = new Array(Object.keys(obj).length);
      for(var key in obj){
        arr[key] = obj[key];
      }
      return arr;
    }
  },
  data() {
    return {
      buttonColor: "#ab302f",
      cardColor: "#404040",
      movies: [],
      loading:false,
      menuItems: [
        { icon: 'edit', text: 'Edit Profile', route: "/usersettings"},
        { icon: 'movie', text: 'All Movies', route: "/movies" },
        { icon: 'history', text: 'Order History', route:"/history" },
        { icon: 'alarm', text: 'Logs', route:'/logs' }
        ]
    };
  },
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
