import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { store } from './app/store';
import GlobalStyle from './components/GlobalStyle';
import './index.css';
import reportWebVitals from './reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle>
            <App />
            <ToastContainer />
        </GlobalStyle>
    </Provider>,
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
