function lookup(method, endpoint, callBack, data) {
    let JsonData;
    if(data){
        JsonData = JSON.stringify(data)
    }

    const xhr = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`
  
    const csrftoken = getCookie('csrftoken');
    
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "text/plain")
    // if (csrftoken) {
    //     console.log("this shouldnt work")
    //     xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    //     xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    //     xhr.setRequestHeader("X-CSRFToken", csrftoken)
    // }
    xhr.onload = function() {
        callBack(xhr.response, xhr.status)
    }
    xhr.onerror = function(e) {
        callBack({"message": "The request was an error"}, 400)
    }
    xhr.send(JsonData)
}

export function createHoot(newHoot, callback) {
    lookup("POST", "/hoots/create/", callback, {content: newHoot})
}

export function loadHoots(callBack) {
    lookup("GET", "/hoots/", callBack)
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}