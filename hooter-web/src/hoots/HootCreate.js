import React from 'react'

import {apiHootCreate} from './lookup'

export function HootCreate(props) {
    const textAreaRef = React.createRef()
    const {didHoot} = props
  
    const handleBackEndUpdate = (response, status) => {
      if(status === 201) {
        didHoot(response)
      } else {
        console.log(response)
        alert("An error occured")
      }
    }
    
    const handleSubmit = (event) => {
      event.preventDefault()
      const newVal = textAreaRef.current.value
      // API CALL
      apiHootCreate(newVal, handleBackEndUpdate)
      textAreaRef.current.value = ''
    }
  
    return <div className={props.className}>
              <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control' name='hoot'>
  
                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Hoot</button>
              </form>
            </div>
  }