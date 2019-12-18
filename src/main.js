// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import wangeditor from 'wangeditor';
import myUpload from 'vue-image-crop-upload';


Vue.config.productionTip = false;
Vue.use(elementUI);
Vue.use(axios);
axios.defaults.baseURL = 'http://139.155.76.66:3000/';  //设置axios根路径
// 此处一定不要忘记http://
Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
