import {backendlookup} from '../lookup'

export function apiProfileDetail(username, callBack) {
    backendlookup("GET", `/profiles/${username}/`, callBack)
}

export function apiProfileFollow(username, action, callBack) {
    const data = {action: `${action && action}`.toLowerCase()}
    backendlookup("POST", `/profiles/${username}/follow`, callBack, data)
}
