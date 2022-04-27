import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleTheme } from '../../reducers/header/headerActions';

import './Header.css';

const Header = (props) => {
    const { toggleTheme, theme, handleNewListClick } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const userAuth = localStorage.getItem('todo-app-token');

    const handleLogout = () => {
        localStorage.removeItem('todo-app-id');
        localStorage.removeItem('todo-app-firstName');
        localStorage.removeItem('todo-app-token');
        window.location.reload(true);
    };

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={theme ? 'header-wrapper dark-mode' : 'header-wrapper light-mode'}>
            <div className='header-container'>
                <div className='header-left'>
                    <Link to='/'>
                        <b>To Do App</b>
                    </Link>
                </div>
                <div className='header-right'>
                    {userAuth ? (
                        <div>
                            <button onClick={handleMenuOpen} className={menuOpen ? 'btn-active' : ''}>
                                Hey {localStorage.getItem('todo-app-firstName')}!
                            </button>
                            <div className={menuOpen ? 'menu' : 'hide'}>
                                <ul>
                                    <li onClick={toggleTheme}>{theme ? 'Light' : 'Dark'} Mode</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                            <button onClick={handleNewListClick}>New List</button>
                        </div>
                    ) : (
                        <>
                        <ul>
                            <li>
                                <Link to='/signin'>Sign In</Link>
                            </li>
                            |
                            <li>
                                <Link to='/register'> Create an Account</Link>
                            </li>
                        </ul>
                        <button onClick={toggleTheme}>{theme ? 'Light' : 'Dark'} Mode</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme,
    };
};

export default connect(mapStateToProps, { toggleTheme })(Header);
