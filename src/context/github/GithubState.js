import Axios from 'axios'
import React, { useReducer } from 'react'
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types'
import { GithubContext } from './githubContext'
import { githubReducer } from './githubReducer'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const withCreds = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GithubState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
    emptySearch: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const search = async (value) => {
    setLoading()
    //... server request
    
    const response = await Axios.get(withCreds(`https://api.github.com/search/users?q=${value}&`))
    
    const emptySearch = response.data.items.length === 0

    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
      emptySearch
    })
  }

  const getUser = async (name) => {
    setLoading()
    //... server request
    const response = await Axios.get(withCreds(`https://api.github.com/users/${name}?`))
    dispatch({
      type: GET_USER,
      payload: response.data
    })
  }

  const getRepos = async (name) => {
    setLoading()
    //... server request
    const response = await Axios.get(withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`))
    dispatch({
      type: GET_REPOS,
      payload: response.data
    })
  }

  const setLoading = () => dispatch({type:SET_LOADING})
  const clear = () => dispatch({type: CLEAR_USERS})


  return (
    <GithubContext.Provider value={{
      ...state, search, getUser, getRepos, clear
    }}>
      {children}
    </GithubContext.Provider>
  )
}