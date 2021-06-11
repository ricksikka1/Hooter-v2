import React, {useState, useEffect} from 'react'
import { UserLink, UserPicture} from './components'
import {apiProfileDetail, apiProfileFollow} from './lookup'

function ProfileBadge(props) {
    const {user, didFollowToggle, profileLoading} = props
    let current = (user && user.is_following) ? "Unfollow" : "Follow"
    current = profileLoading ? "Loading..." : current
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if(didFollowToggle && !profileLoading){
            didFollowToggle(current)
        }
    }

    return user ? <div>
             <UserPicture user={user} />
             <p><UserLink user={user} includeFullName/></p>
             <p>{user.follower_count} {user.follower_count === 1 ? "Follower" : "Followers"}</p>
             <p>{user.following_count} Following</p>
             <p>{user.location}</p>
             <p>{user.bio}</p>
             <button onClick={handleFollowToggle} className='btn btn-primary'>{current}</button>
        </div> : null
}

export function ProfileBadgeComponent (props) {
    const {username} = props
    // lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    const handleBackEndLookup = (response, status) => {
        if (status === 200){
            setProfile(response)
        }
    }

    useEffect(() => {
        if(didLookup === false) {
            apiProfileDetail(username, handleBackEndLookup)
            setDidLookup(true)
        }}, [username, didLookup, setDidLookup])

    const handleNewFollow = (verb) => {
        apiProfileFollow(username, verb, (response, status) => {
            if (status === 200){
                setProfile(response)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }

    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/> : null
}