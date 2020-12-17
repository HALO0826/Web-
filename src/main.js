import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'
import VueRouter from 'vue-router'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Blog from './components/Blog'
import writeBlog from "./components/writeBlog";
import DetailBlog from "./components/DetailBlog";

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VuePaginate);

const routes =[
  {path:'/',component: Blog},
  {path:'/blogs/:id', component: DetailBlog},
  {path:'/post', component: writeBlog}
]
const router = new VueRouter({
  mode: 'history',
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
