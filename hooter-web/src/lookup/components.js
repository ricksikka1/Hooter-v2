export function loadHoots(callBack) {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = "http://localhost:8000/api/hoots/"
    const responseType = "json"
  
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function() {
        callBack(xhr.response, xhr.status)
    }
    xhr.onerror = function(e) {
        callBack({"message": "The request was an error"}, 400)
    }
    xhr.send()
}