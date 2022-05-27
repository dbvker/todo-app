import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './index.css';

// Pages
import App from './App';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

const persistedState = localStorage.getItem('theme') 
                       ? JSON.parse(localStorage.getItem('theme'))
                       : {}
const store = createStore(reducer, persistedState);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    </Provider>,
    document.getElementById('root')
);
