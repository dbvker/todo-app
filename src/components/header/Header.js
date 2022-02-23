import React from 'react';

import './Header.css';

const Header = (props) => {
    const { toggleTheme, theme, handleNewListClick } = props;
    return (
        <header className='header-container'>
            <div className='header-left'><b>To Do App</b></div>
            <div className='header-right'>
                {/* <span>Sign In</span> | 
                <span> Create an Account</span> */}
                <button onClick={toggleTheme}>Toggle {theme ? 'Light' : 'Dark'}</button>
                <button onClick={handleNewListClick}>New List</button>
            </div>
        </header>
    );
};

export default Header;
