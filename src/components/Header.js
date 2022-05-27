import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleTheme } from '../reducers/header/headerActions';

import '../styles/Header.css';

import PlusDark from '../assets/plus(dark).png';
import PlusLight from '../assets/plus(light).png';
import Moon from '../assets/moon.png';
import Sun from '../assets/sun.png';
import LogoutDark from '../assets/logout(dark).png';
import LogoutLight from '../assets/logout(light).png';
import Logo from '../assets/logo.png';

const HeaderLink = ({ image, text, theme, onClick, link }, key) => {
    return (
        <Link to={link}>
            <div key={key} className={'header-link' + (theme ? ' dark-link' : ' light-link')} onClick={onClick}>
                <img src={image} alt=''/>
                {text && image && <span style={{marginLeft: '10px'}}></span>}
                {text && <p>{text}</p>}
            </div>
        </Link>                               
    );
}

const Header = (props) => {
    const { toggleTheme, theme, handleNewListClick } = props;
    const userAuth = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('firstName');
        localStorage.removeItem('token');
        window.location.reload(true);
    };

    return (
        <header className='header-wrapper'>
            <div className='header-container'>
                <div className='header-left'>
                    <Link to='/'>
                        <img src={Logo} style={{height: '35px'}} />
                    </Link>
                </div>
                {userAuth ? (
                <div className='header-right'>
                            <HeaderLink 
                                theme={theme}
                                image={theme ? PlusLight : PlusDark}
                                text='New List'
                                onClick={handleNewListClick}
                                link=''
                            />

                            <HeaderLink 
                                theme={theme}
                                image={theme ? Sun : Moon}
                                text={(theme ? 'Light' : 'Dark') + ' Mode'}
                                onClick={toggleTheme}
                                link=''
                            />

                            <HeaderLink 
                                theme={theme}
                                image={theme ? LogoutLight : LogoutDark}
                                text='Logout'
                                onClick={handleLogout}
                                link=''
                            />
                        </div>
                    ) : (
                        <div className='header-right'>
                            <HeaderLink 
                                theme={theme}
                                image={null}
                                text='Sign In'
                                onClick={null}
                                link='/signin'
                            />
                            <HeaderLink 
                                theme={theme}
                                image=''
                                text='Register'
                                onClick={null}
                                link='/register'
                            />
                            <HeaderLink 
                                theme={theme}
                                image={theme ? Sun : Moon}
                                text={null}
                                onClick={toggleTheme}
                                link=''
                            />
                        </div>
                    )}
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
