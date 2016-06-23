export const REQUEST_USERLIST = 'REQUEST_USERLIST';

export function requestUserlist(userlist) {
  return { type: REQUEST_USERLIST, userlist: userlist, message: null };
}

export const actions = {
  requestUserlist
}

//export default loginReducer;
const USERLIST_ACTION_HANDLERS = {
  [REQUEST_USERLIST]: (state, action) => Object.assign({}, state, { userlist: action.userlist, message: action.message })
}

// Reducer
export default function getUserlistReducer (state = { userlist: [], message: null }, action) {
  const handler = USERLIST_ACTION_HANDLERS[action.type]
  console.log('getUserlistReducer ' );
  return handler ? handler(state, action) : state
}
