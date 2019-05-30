<template>
  <v-layout justify-center align-center fill-height>
  <h1 style="font-size: 200px;">404</h1>
  <div style="margin-left:20px; text-align: center;">
    <h2 style="font-size: 30px;">Sorry we couldn't find the page you're looking for</h2>
    <br>
    <v-btn @click="$router.push('/')" large color="red darken-3">Go To Home Page</v-btn>
  </div>
  </v-layout>
</template>

<script>
    export default {
        name: "404Card"
    }
</script>

<style scoped>

</style>
