<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <div display="inline" class="d-flex align-center"> -->
      <!-- :src="$vuetify.breakpoint.smAndUp ? './assets/logo.png' : './assets/logo_2.png'" -->
      <v-img
        alt="Kino Target Logo"
        class="shrink mr-2"
        contain
        :src="$vuetify.breakpoint.smAndUp ? require('./assets/logo.png') : require('./assets/logo_2.png')"
        transition="scale-transition"
        :width="$vuetify.breakpoint.smAndUp ? '275' : '40'"
      />
      <!-- <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          /> -->
      <!-- </div> -->

      <v-spacer />

      <span
        v-show="loggedIn"
        class="text-caption white--text text--darken-1"
        >signed in as <br />
        <span class="text-subtitle-2 font-italic">{{ userName }}</span></span
      >

      <v-btn v-show="!loggedIn" @click="signup" color="green darken-2">
        sign up
      </v-btn>
    </v-app-bar>

    <v-main>
      <MovieDB v-if="loggedIn" />
    </v-main>
  </v-app>
</template>

<script>
import MovieDB from "./components/MovieDB";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    MovieDB
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState(["loggedIn", "userName"]),

    test() {
      return this.$vuetify.breakpoint;
    }
  },

  methods: {
    ...mapActions(["signup"])
  }
};
</script>
