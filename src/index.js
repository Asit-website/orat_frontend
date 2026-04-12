import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import './App.css'
import App from'./App'
import TimerModal from '../src/components/timermodal'; 
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = createRoot(document.getElementById('root'));
root.render(
  // Temporarily remove React.StrictMode for testing
  // 966190937142-rsk3g4jempc1n3b2jm7ku1s8u7b1r2s7.apps.googleusercontent.com
  // 95587276709-0o7o6l6jbcsld6iel6ou0dh9c93fprbs.apps.googleusercontent.com
  <Suspense fallback={<span>loading...</span>}>
  <Provider store={store}>
  <GoogleOAuthProvider clientId="966190937142-rsk3g4jempc1n3b2jm7ku1s8u7b1r2s7.apps.googleusercontent.com">
    <App />
    <TimerModal />
    </GoogleOAuthProvider>
  </Provider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
