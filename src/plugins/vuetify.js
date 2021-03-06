import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ja from 'vuetify/es5/locale/ja'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    primary: '#0074d9',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: 'fa',
  },
  lang: {
    locales: { ja },
    current: 'ja'
  },
});
