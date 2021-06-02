import {backendlookup} from '../lookup'

export function apiHootCreate(newHoot, callback) {
    backendlookup("POST", "/hoots/create/", callback, {content: newHoot})
}

export function apiHootAction(hootId, action, callback) {
    const data = {id: hootId, action: action}
    backendlookup("POST", "/hoots/action/", callback, data)
}

export function apiHootList(callBack) {
    backendlookup("GET", "/hoots/", callBack)
}