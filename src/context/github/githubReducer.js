import {CLEAR_USERS, GET_USER, SEARCH_USERS, SET_LOADING, GET_REPOS} from '../types'

const githubHandlers = {
  [CLEAR_USERS]: state => ({...state, users: [], loading: false}),
  [GET_USER]: (state, {payload}) => ({...state, user: payload, loading: false}),
  [SEARCH_USERS]: (state, {payload, emptySearch}) => ({
    ...state, loading: false, users: payload, emptySearch
  }),
  [SET_LOADING]: state => ({...state, loading: true}),
  [GET_REPOS]: (state, {payload}) => ({...state, loading: false, repos: payload}),
  DEFAULT: state => state
}

export const githubReducer = (state, action) => {
  const handler = githubHandlers[action.type] || githubHandlers.DEFAULT
  return handler(state, action)
}