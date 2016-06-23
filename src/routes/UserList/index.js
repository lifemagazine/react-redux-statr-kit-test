import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'userlist',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const UserList = require('./containers/UserList').default
      const reducer = require('./modules/userlist').default

      /*  Add the reducer to the store on key 'userlist'  */
      injectReducer(store, { key: 'userlist', reducer })

      /*  Return getComponent   */
      cb(null, UserList)

    /* Webpack named bundle   */
    }, 'userlist')
  }
})
