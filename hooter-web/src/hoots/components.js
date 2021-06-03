import React, {useState} from 'react'

import {HootCreate} from './HootCreate'
import {HootsList} from './list'

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

