import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPlayer from '@/components/MainPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPlayer',
      component: MainPlayer
    }
  ]
})
