// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import HomeRoute from './Home'
import UserListRoute from './UserList'
import LoginRoute from './Login'
import RegisterRoute from './Register'
import LogoutRoute from './Logout'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => (
{
  path: '/',
  component: CoreLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/home') },
  childRoutes: [
    HomeRoute(store),
    UserListRoute(store),
    LoginRoute(store),
    RegisterRoute(store),
    LogoutRoute(store)
  ]
})

export default createRoutes
