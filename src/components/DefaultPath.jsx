import React from 'react'
import { useHistory } from 'react-router-dom'

const DefaultPath = () => {
    const history = useHistory()
    history.push('/home')
  return (
    <>
    </>
  )
}

export default DefaultPath