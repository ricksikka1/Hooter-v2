import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HootsComponent, HootDetailComponent} from './hoots'
import reportWebVitals from './reportWebVitals';

const appEl = document.getElementById('root')
if (appEl) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appEl
  );
}

const e = React.createElement

const hootsEl = document.getElementById('hooter')
if (hootsEl) {
  ReactDOM.render(e(HootsComponent, hootsEl.dataset),hootsEl);
}

const hootDetailElement = document.querySelectorAll(".hooter-detail")

hootDetailElement.forEach(container => {
  ReactDOM.render(e(HootDetailComponent, container.dataset),
  container);
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
