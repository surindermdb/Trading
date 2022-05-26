import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import './assets/scss/responsive.scss';
import './assets/scss/poocoin.scss';
import './assets/scss/token.scss';
// import './assets/scss/chunk.scss';
// import './assets/scss/mobileheader.scss';
// import './assets/scss/mobile.scss';
import './assets/scss/check.scss';
import './assets/scss/pool.scss';
import './assets/scss/mobileTokenDeail.scss';
import './assets/scss/mobileTab.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
