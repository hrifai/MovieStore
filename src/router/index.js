import Router from 'vue-router'
import MainCard from '../components/HomeCard.vue'
import RegCard from '../components/RegisterCard.vue'
import LoginCard from '../components/LoginCard.vue'
import Movies from '../components/Movies'
import MovieCard from '../components/MovieCard'
import HistoryCard from '../components/HistoryCard'
import AddMovie from '../components/AddMovie'
import UserCard from '../components/UserCard'
import CheckoutCard from '../components/CheckoutCard'
import NotFoundCard from '../components/404Card'
import LogCard from '../components/LogCard'
import TestCard from '../components/PayCard'
import RecieptCard from '../components/RecieptCard'
import UsersCard from '../components/UsersCard'
import ManageMovies from '../components/ManageMoviesCard'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginCard,
    },
    {
      path: '/pay',
      name: 'pay',
      component: TestCard,
    },
    {
      path: '/register',
      name: 'register',
      component: RegCard,

    },
    {
      path: '/home',
      name: 'home',
      component: MainCard,
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
    },{
      path: '/managemovies',
      name: 'manage movies',
      component: ManageMovies,
    },
    {
      path: "/movie/:selectedId",
      component: MovieCard,
      props: true
    },
    {
      path: "/history",
      component: HistoryCard,
      props: true
    },
    {
      path: '/logs',
      name: 'logs',
      component: LogCard,
      props:true
    },
    {
      path: '/reciept',
      name: 'reciept',
      component: RecieptCard,
      props:true
    },
    {
      path: "/addMovie",
      name: 'addMovie',
      component: AddMovie,
      props: true
    },
    {
      path: "/usersettings",
      name: 'usersettings',
      component: UserCard,
      props: true
    },{
      path: "/checkout",
      name: 'checkout',
      component: CheckoutCard,
      props: true
    },{
      path: "/users",
      name: 'users',
      component: UsersCard,
      props: true
    },{
      path: "*",
      component: NotFoundCard,
    }
  ],
  mode: 'history',
});

export default router
