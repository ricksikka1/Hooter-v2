import React, {useState} from 'react'

import {ActionBtn} from './buttons'
import {UserLink, UserPicture} from '../profiles'

export function ParentHoot(props) {
    const {hoot} = props
    return hoot.parent ? <Hoot isRehoot rehooter={props.rehooter} hideAction className={' '} hoot={hoot.parent}/> : null
}
    
export function Hoot(props) {
      const {hoot, didReHoot, hideAction, isRehoot, rehooter} = props
      const [actionHoot, setActionHoot] = useState(props.hoot ? props.hoot : null)
      let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
      className = isRehoot === true ? `${className} p-2 border rounded` : className 
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
        {isRehoot === true && <div className='mb-2'>
          <span className='small text-muted'>ReHoot via <UserLink user={rehooter}/></span></div>}
        <div className='d-flex'>
            <div className=''>
                <UserPicture user={hoot.user}/>
            </div>
            <div className='col-11'>
              <div>
                <p>
                  <UserLink includeFullName user={hoot.user} />
                </p>
                <p>{hoot.content}</p>
                <ParentHoot hoot={hoot} rehooter={hoot.user}/>
              </div>
              
              <div className='btn btn-group px-0'>
              {(actionHoot && hideAction !== true) && <React.Fragment>
                  <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"like", display:"Likes"}}/>
                  <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"unlike", display:"Unlike"}}/>
                  <ActionBtn hoot={actionHoot} didAction={PerformAction} action={{type:"rehoot", display:"ReHoot"}}/>
                </React.Fragment>
              }
                {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
              </div>
              </div>
        </div>
      </div>
}