export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';

export function requestLogout() {
  console.log('requestLogout');
        return { type: REQUEST_LOGOUT, userid: 'guest', role: 100, message: 'ok' };
}

export const actions = {
  requestLogout
}

//export default logoutReducer;
const LOGOUT_ACTION_HANDLERS = {
  [REQUEST_LOGOUT]: (state, action) => Object.assign({}, state, { userid: 'guest', role: 100, message: 'ok' })
}

// Reducer
export default function logoutReducer (state = {userid: 'guest', role: 100, message: 'ok'}, action) {
  const handler = LOGOUT_ACTION_HANDLERS[action.type]
  console.log('logoutReducer action.userid: ' + action.userid);
  return handler ? handler(state, action) : state
}
