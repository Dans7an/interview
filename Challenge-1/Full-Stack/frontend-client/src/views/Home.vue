<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MovieDB msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieDB from '@/components/MovieDB.vue';

export default {
  name: 'Home',
  components: {
    MovieDB,
  },
};
</script>
