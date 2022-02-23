import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from '../../reducers/header/headerActions';


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

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme,
    };
};

export default connect(mapStateToProps, { toggleTheme })(Header);
