import React, {useEffect, useState} from 'react'

import {apiHootFeed} from './lookup'
import {Hoot} from './Hoot'

export function HootsFeed(props) {
    const [hootsInit, setHootsInit] = useState([])
    const [hoots, setHoots] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
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
            setNextUrl(response.next)
            setHootsInit(response.results)
            setHootsDidSet(true)
          }
        }
        apiHootFeed(callBack)
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

    const handleLoadNext = (event) => {
      event.preventDefault()
      if (nextUrl !== null){
        const handleloadNextResponse = (response, status) => {
          if(status === 200) {
            setNextUrl(response.next)
            const newHoots = [...hoots].concat(response.results)
            setHootsInit(newHoots)
            setHoots(newHoots)
          }
        }
        apiHootFeed(handleloadNextResponse, nextUrl)
      }
    }

    return <React.Fragment>{hoots.map((item, index) => {
      return <Hoot 
      hoot={item}
      didReHoot={handleDidReHoot} 
      className='my-5 py-5 border bg-white text-dark' 
      key={`${index}-item.id`}/>
    })}
    {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load Next</button>}
    </React.Fragment>
}