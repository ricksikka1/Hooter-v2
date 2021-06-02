import React, {useEffect, useState} from 'react'

import {apiHootCreate, apiHootList, apiHootAction} from './lookup'

export function HootsComponent(props) {

  const textAreaRef = React.createRef()
  const [newHoots, setNewHoots] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    
    let tempNewHoots = [...newHoots]
    apiHootCreate(newVal, (response, status) => {
      if(status === 201) {
        tempNewHoots.unshift(response)
        setNewHoots(tempNewHoots)
      } else {
        console.log(response)
        alert("An error occured")
      }
    })
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
    const [hootsDidSet, setHootsDidSet] = useState(false)

    useEffect(() => {
      const final = [...props.newHoots].concat(hootsInit)
      if (final.length !== hoots.length) {
        setHoots(final)
      }
      
    }, [props.newHoots, hoots, hootsInit])

    useEffect(() => {
      if (hootsDidSet === false) {
        const callBack = (response, status) => {
          if(status === 200) {
            setHootsInit(response)
            setHootsDidSet(true)
          }
        }
        apiHootList(callBack)
      }
    }, [hootsInit, hootsDidSet, setHootsDidSet])
    return hoots.map((item, index) => {
      return <Hoot hoot={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-item.id`}/>
    })
}

export function ActionBtn(props){
    const {hoot, action, didAction} = props
    const likes = hoot.likes ? hoot.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-small'
    const actionDisplay = action.display ? action.display : 'Action'
    
    const handleClick = (event) => {
      event.preventDefault()
      apiHootAction(hoot.id, action.type, handleAction)
    }

    const handleAction = (response, status) => {
      console.log(response, status)
      if ((status === 200 || status === 201) && didAction) {
        didAction(response, status)
      }
    }

    const display = action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay
    return <button className={className} onClick={handleClick}>{display}</button>
}

export function ParentHoot(props) {
  const {hoot} = props
  return hoot.parent ? <div className='row'>
    <div className='col-11 mx-auto p-3 border rounded'>
      <p className='mb-0 text-muted small'>ReHoot</p>
      <Hoot className={' '} hoot={hoot.parent}/>
    </div>
  </div> : null
}
  
export function Hoot(props) {
    const {hoot, action} = props
    const [actionHoot, setActionHoot] = useState(props.hoot ? props.hoot : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    const PerformAction = (newActionHoot, status) => {
      if (status === 200) {
        setActionHoot(newActionHoot)
      } else if (status === 201){
        // Let the hootList know
      }
    }

    return <div className={className}>
        <div>
          <p>{hoot.id} - {hoot.content}</p>
          <ParentHoot hoot={hoot} />
        </div>
        
        {actionHoot && <div className='btn btn-group'>
          <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"like", display:"Likes"}}/>
          <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"unlike", display:"Unlike"}}/>
          <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"rehoot", display:"ReHoot"}}/>
        </div>}
    </div>
}