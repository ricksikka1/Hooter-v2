import React, {useState} from 'react'

export function UserLink(props){
    const {user, includeFullName} = props
    const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null
  
    const handleLink = (event) => {
      window.location.href = `/profile/${user.username}`
    }
    return <React.Fragment>
            {nameDisplay}
            <span onClick={handleLink} style={{cursor:'pointer', color:'blue'}}>@{user.username}</span>
    </React.Fragment>
  }
  
export function UserPicture(props){
    const {user} = props
    return <span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white'>
        {user.username[0]}
    </span>
  }