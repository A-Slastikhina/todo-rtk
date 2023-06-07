import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';

import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
*{
  margin:0;
  padding:0;
  font-family: 'Balsamiq Sans';
  color:white;
}
`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <Global/>
    <Provider store={store}>
      <BrowserRouter>    
      <App />
      </BrowserRouter>
    </Provider> 
    </>
   
 
);


