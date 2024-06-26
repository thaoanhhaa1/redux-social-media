import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import GlobalStyle from './components/GlobalStyle';
import reportWebVitals from './reportWebVitals';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle>
            <App />
        </GlobalStyle>
    </Provider>,
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
