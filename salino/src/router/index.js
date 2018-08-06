import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main/main'
import ReallyMain from '../components/reallymain/reallyMain'
import Salino from '../components/salino/salino'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'main',
      component: Main,
      path: '/'
    },
    {
      name: 'realMain',
      component: ReallyMain,
      path: '/main',
      children: [
        {
          name: 'salino',
          component: Salino,
          path: '/main/salino',
        }
      ]
    }
  ]
})
