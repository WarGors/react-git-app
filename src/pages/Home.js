import React, { Fragment, useContext } from 'react'
import { Card } from '../conponents/Card'
import { Search } from '../conponents/Search'
import { GithubContext } from '../context/github/githubContext'



export const Home = () => {
  const {loading, users} = useContext(GithubContext)
  return (
    <Fragment>
      <Search />
      
      <div className='row'>
        {
        loading
          ? <div style={{textAlign: 'center'}}><h2>Загрузка...</h2></div>
          : users.map( user => (
          <div key={user.id} className='col-sm-4 mb-4'>
            <Card user={user}/>
          </div>
        ))}
      </div>
    </Fragment>
)}