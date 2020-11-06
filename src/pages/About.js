import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/alertContext'

export const About = () => {
  const {hide} = useContext(AlertContext)
  hide()
  return (
  <div className="jumbotron">
    <div className="container">
      <h1 className="display-4">Информация</h1>
      <p className="lead">Версия приложения: <strong>1.0.0</strong></p>
    </div>
  </div>
)}