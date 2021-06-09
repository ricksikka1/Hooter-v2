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

export function apiHootList(username, callBack, nextUrl) {
    let endpoint = "/hoots/"
    if (username) {
        endpoint = `/hoots/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendlookup("GET", endpoint, callBack)
}