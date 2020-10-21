import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  // NOTE: copied from
  // https://vuetifyjs.com/en/styles/colors/#javascript-color-pack
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken4, // #E53935
        secondary: colors.red, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
