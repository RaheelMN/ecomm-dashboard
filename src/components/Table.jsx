import React from 'react'

const Table = ({users}) => {
  return (
    <>
    {
        users.map((user)=>(
            <div key={user.id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
            </div>
        ))
    }
    </>
  )
}

export default Table