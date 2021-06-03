import {backendlookup} from '../lookup'

export function apiHootCreate(newHoot, callback) {
    backendlookup("POST", "/hoots/create/", callback, {content: newHoot})
}

export function apiHootAction(hootId, action, callback) {
    const data = {id: hootId, action: action}
    backendlookup("POST", "/hoots/action/", callback, data)
}

export function apiHootDetail(hootId, callBack) {
    backendlookup("GET", `/hoots/${hootId}/`, callBack)
}

export function apiHootList(username, callBack) {
    let endpoint = "/hoots/"
    if (username) {
        endpoint = `/hoots/?username=${username}`
    }
    backendlookup("GET", endpoint, callBack)
}