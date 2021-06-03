import React, {useState} from 'react'

import {ActionBtn} from './buttons'

export function ParentHoot(props) {
    const {hoot} = props
    return hoot.parent ? <div className='row'>
      <div className='col-11 mx-auto p-3 border rounded'>
        <p className='mb-0 text-muted small'>ReHoot</p>
        <Hoot hideAction className={' '} hoot={hoot.parent}/>
      </div>
    </div> : null
  }
    
  export function Hoot(props) {
      const {hoot, didReHoot, hideAction} = props
      const [actionHoot, setActionHoot] = useState(props.hoot ? props.hoot : null)
      const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

      const path = window.location.pathname
      const match = path.match(/(?<hootid>\d+)/)
      const urlHootId = match ? match.groups.hootid : -1

      const isDetail = `${hoot.id}` === `${urlHootId}`

      const PerformAction = (newActionHoot, status) => {
        if (status === 200) {
          setActionHoot(newActionHoot)
        } else if (status === 201){
          if(didReHoot){
            didReHoot(newActionHoot)
          }
        }
      }

      const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${hoot.id}`
      }
  
      return <div className={className}>
          <div>
            <p>{hoot.id} - {hoot.content}</p>
            <ParentHoot hoot={hoot} />
          </div>
          
          <div className='btn btn-group'>
          {(actionHoot && hideAction !== true) && <React.Fragment>
              <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"like", display:"Likes"}}/>
              <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"unlike", display:"Unlike"}}/>
              <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"rehoot", display:"ReHoot"}}/>
            </React.Fragment>
          }
            {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
          </div>
      </div>
  }