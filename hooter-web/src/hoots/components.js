import React, {useEffect, useState} from 'react'

import {loadHoots} from '../lookup'

export function HootsList(props) {
    const [hoots, setHoots] = useState([])
  
    useEffect(() => {
      const callBack = (response, status) => {
        if(status === 200) {
          setHoots(response)
        }
      }
      loadHoots(callBack)
      
    }, [])
    return hoots.map((item, index) => {
      return <Hoot hoot={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-item.id`}/>
    })
}

export function ActionBtn(props){
    const {hoot, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-small'
    return action.type === "like" ? <button className={className}>{hoot.likes} Likes</button> : null
}
  
export function Hoot(props) {
    const {hoot, action} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <p>{hoot.id} - {hoot.content}</p>
        <div className='btn btn-group'>
          <ActionBtn hoot={hoot} action={{type:"like"}}/>
        </div>
    </div>
}