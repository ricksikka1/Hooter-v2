import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function loadHoots(callBack) {
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = "http://127.0.0.1:8000/api/hoots/"
  const responseType = "json"

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function() {
      callBack(xhr.response, xhr.status)
  }
  xhr.send()
}

function App() {
  const [hoots, setHoots] = useState([])

  useEffect(() => {
    const callBack = (response, status) => {
      if(status === 200) {
        setHoots(response)
      }
    }
    loadHoots(callBack)
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {hoots.map((hoot, index) => {
            return <li>{hoot.content}</li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
