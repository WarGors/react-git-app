import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { GithubContext } from '../context/github/githubContext'

export const Search = () => {
  const {show, hide} = useContext(AlertContext)
  const [value, setValue] = useState('')
  const {search, clear, emptySearch} = useContext(GithubContext)

  const onSubmit = (e) => {
    if (e.key !== 'Enter') {
      return
    }
    
    clear()

    if (value.trim()) {
      hide()
      search(value.trim())
    } else {
      show('Вы оставили поле ввода пустым!')
    }
  }

  useEffect( () => {
    if (emptySearch) {
      show('Пользователь не найден')
    }
    // eslint-disable-next-line
  }, [emptySearch])

  return (
    <div className="form-group">
      <input
        type='text'
        className="form-control"
        placeholder='Введите ник пользователя...' 
        onKeyPress={onSubmit}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}