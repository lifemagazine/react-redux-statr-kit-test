export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export function requestLogin(userId, role) {
        console.log('requestLogin: ' + userId + ', role: ' + role);
        return { type: REQUEST_LOGIN, userid: userId, role: role, message: null };
}

export const actions = {
  requestLogin
}

//export default loginReducer;
const LOGIN_ACTION_HANDLERS = {
  [REQUEST_LOGIN]: (state, action) => Object.assign({}, state, { userid: action.userid, role: action.role, message: action.message })
}

// Reducer
export default function loginReducer (state = {userid: 'guest', role: 100, message: null}, action) {
  const handler = LOGIN_ACTION_HANDLERS[action.type]
  console.log('loginReducer action.userid: ' + action.userid);
  return handler ? handler(state, action) : state
}
