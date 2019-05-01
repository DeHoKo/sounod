import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueYoutube from 'vue-youtube'
import firebase from 'firebase';

Vue.use(VueYoutube)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => { // конечно не здесь должно быть, потом разобраться
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.authRequired);
    if (requiresAuth && !currentUser) next('login');
    //else if (!requiresAuth && currentUser) next('profile');
    else next();
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
