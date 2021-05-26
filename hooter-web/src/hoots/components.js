import React, {useEffect, useState} from 'react'

import {loadHoots} from '../lookup'

export function HootsComponent(props) {

  const textAreaRef = React.createRef()
  const [newHoots, setNewHoots] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    
    let tempNewHoots = [...newHoots]
    tempNewHoots.unshift({
      content: newVal,
      likes: 0,
      id: 12313
    })
    setNewHoots(tempNewHoots)
    textAreaRef.current.value = ''
  }

  return <div className={props.className}>
      <div className='col-12 mb-3'>
        <form onSubmit={handleSubmit}>
          <textarea ref={textAreaRef} required={true} className='form-control' name='hoot'>

          </textarea>
          <button type='submit' className='btn btn-primary my-3'>Hoot</button>
        </form>
      </div>
    <HootsList newHoots={newHoots}/>
  </div>

}

export function HootsList(props) {
    const [hootsInit, setHootsInit] = useState([])
    const [hoots, setHoots] = useState([])

    useEffect(() => {
      const final = [...props.newHoots].concat(hootsInit)
      if (final.length !== hoots.length) {
        setHoots(final)
      }
      
    }, [props.newHoots, hoots, hootsInit])

    useEffect(() => {
      const callBack = (response, status) => {
        if(status === 200) {
          setHootsInit(response)
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