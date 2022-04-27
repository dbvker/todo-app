import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './index.css';
// Components
import Header from './components/header/Header';
// Pages
import App from './App';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    </Provider>,
    document.getElementById('root')
);
