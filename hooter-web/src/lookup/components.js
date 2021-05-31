function lookup(method, endpoint, callback, data) {
    let JsonData;
    if(data){
        JsonData = JSON.stringify(data)
    }

    const xhr = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`
  
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.onload = function() {
        callBack(xhr.response, xhr.status)
    }
    xhr.onerror = function(e) {
        callBack({"message": "The request was an error"}, 400)
    }
    xhr.send(JsonData)
}

export function loadHoots(callBack) {
    lookup("GET", "/hoots/", callBack)
}