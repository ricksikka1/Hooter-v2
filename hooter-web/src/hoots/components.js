import React, {useEffect, useState} from 'react'

import {HootCreate} from './HootCreate'
import {HootsList} from './list'
import {apiHootDetail} from './lookup'
import {Hoot} from './Hoot'

export function HootsComponent(props) {
  const [newHoots, setNewHoots] = useState([])
  const canHoot = props.canHoot === "false" ? false : true
  const handleNewHoot = (newHoot) => {
    let tempNewHoots = [...newHoots]
    tempNewHoots.unshift(newHoot)
    setNewHoots(tempNewHoots)
  }

  return <div className={props.className}>
      {canHoot === true && <HootCreate didHoot={handleNewHoot} className='col-12 mb-3'/>}
    <HootsList newHoots={newHoots} {...props}/>
  </div>
}

export function HootDetailComponent(props){
  const {hootId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [hoot, setHoot] = useState(null)

  const handleBackEndLookup = (response, status) => {
    if (status === 200){
      setHoot(response)
    } else{
      alert("Error")
    }
  }

  useEffect(() => {
    if(didLookup === false) {
      apiHootDetail(hootId, handleBackEndLookup)
      setDidLookup(true)
    }
  }, [hootId, didLookup, setDidLookup])

  return hoot === null ? null : <Hoot hoot={hoot} className={props.className} /> 
}

