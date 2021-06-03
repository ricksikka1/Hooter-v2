import React, {useEffect, useState} from 'react'

import {apiHootList} from './lookup'
import {Hoot} from './hoot'

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
        apiHootList(props.username, callBack)
      }
    }, [hootsInit, hootsDidSet, setHootsDidSet, props.username])

    const handleDidReHoot = (newHoot) => {
      const updatedHootsInit = [...hootsInit]
      updatedHootsInit.unshift(newHoot)
      setHootsInit(updatedHootsInit)

      const updatedFinalHoot = [...hoots]
      updatedFinalHoot.unshift(newHoot)
      setHoots(updatedFinalHoot)
    }

    return hoots.map((item, index) => {
      return <Hoot 
      hoot={item}
      didReHoot={handleDidReHoot} 
      className='my-5 py-5 border bg-white text-dark' 
      key={`${index}-item.id`}/>
    })
}