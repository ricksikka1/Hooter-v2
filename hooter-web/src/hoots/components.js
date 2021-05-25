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
    const [likes, setLikes] = useState(hoot.likes ? hoot.likes : 0)
    const [useLike, setUserLike] = useState(hoot.useLike === true ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-small'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleClick = (event) => {
      event.preventDefault()
      if(action.type === 'like'){

        if(useLike === true){
          setUserLike(false)
          setLikes(likes-1)
        }else{
          setUserLike(true)
          setLikes(likes+1)
        }

      }
    }
    const display = action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
}
  
export function Hoot(props) {
    const {hoot, action} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
        <p>{hoot.id} - {hoot.content}</p>
        <div className='btn btn-group'>
          <ActionBtn hoot={hoot} action={{type:"like", display:"Likes"}}/>
          <ActionBtn hoot={hoot} action={{type:"unlike", display:"Unlike"}}/>
          <ActionBtn hoot={hoot} action={{type:"rehoot", display:"ReHoot"}}/>
        </div>
    </div>
}