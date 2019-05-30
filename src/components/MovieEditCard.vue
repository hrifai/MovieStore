<template>
  <div>
      <v-container grid-list-md>
        <small>Movie ID: {{current.key}}</small>
        <v-layout wrap>
          <v-flex xs8>
            <v-text-field v-model="current.Name" :color="buttonColor" label="Movie Name" required></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field v-model="current.Year" :color="buttonColor" label="Year" required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="current.Price" :color="buttonColor" label="Price" required></v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="current.Poster" :color="buttonColor" label="Image Path" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-textarea v-model="current.Description" :color="buttonColor" label="Description" required></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
      <v-spacer></v-spacer>
    <v-layout justify-center>
      <v-btn :color="buttonColor"  large @click="save()">Save <v-icon>done</v-icon></v-btn>
      <v-btn :color="buttonColor"  large @click="deleteDialog = true">Delete <v-icon>delete</v-icon></v-btn>
    </v-layout>

  <v-dialog width="300" v-model="saved">
    <v-card color="green" dark>
      <v-card-text>
        Data has been updated.
      </v-card-text>
    </v-card>
  </v-dialog>

    <v-dialog width="300" v-model="loading">
      <v-card color="red darken-2" dark>
        <v-card-text>
          Loading data...
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog width="300" v-model="deleteDialog">
      <v-card color="red darken-3" dark>
        <v-card-text>
          Are you sure you want to delete this movie? This cannot be undone.
        </v-card-text>
        <v-btn @click="deleteMovie()">Yes</v-btn>
        <v-btn @click="deleteDialog=false">No</v-btn>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

  import MS from '../firebaseCRUD'

  export default {
    components:{
    },
    beforeMount(){
    },
    data() {
      return {
        buttonColor: "#ab302f",
        cardColor: "red darken-4",
        fname: "",
        lname: "",
        email: "",
        password: "",
        orders: [],
        loading: false,
        age: "",
        saved: false,
        deleteDialog: false,
        showOrders:false
      };
    },
    props: {
      current: Object
    },
    methods:{
      save(){
        MS.db.ref('Movies/'+ this.current.key).set(this.current);
        this.saved = true;
        setTimeout(() => {this.saved = false}, 2000);
      },
      deleteMovie(){
        MS.db.ref('Movies/'+ this.current.key).remove();
        this.$parent.$parent.$parent.$parent.$emit('closeEdit')
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
