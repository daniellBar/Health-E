import { ActivityApp } from './pages/activity/ActivityApp.jsx'
import { ActivityDetails } from './pages/activity/ActivityDetails.jsx'
import { ActivityEdit } from './pages/activity/ActivityEdit.jsx'
import { HomeApp } from './pages/HomeApp.jsx'
import { UserDetails } from './pages/user/UserDetails.jsx'
import { Login } from './pages/user/Login.jsx'
import { SignUp } from './pages/user/SignUp.jsx'
import { About } from './pages/About.jsx'


export default [
    {
        path: '/activity/edit/:activityId',
        component: ActivityEdit,
    },
    {
        path: '/activity/add',
        component: ActivityEdit,
    },
    {
        path: '/activity/:activityId',
        component: ActivityDetails,
    },
    {
        path: '/activity/',
        component: ActivityApp
    },
    {
        path: '/user/:userId',
        component: UserDetails,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/signUp',
        component: SignUp
    },
    {
        path:'/about',
        component: About
    },
    {
        path: '/',
        component: HomeApp,
    },

]