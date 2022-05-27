import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from '../components/Header';

const initialValues = {
    email: '',
    password: '',
};

const SignIn = (props) => {
    const { theme } = props;
    const navigate = useNavigate()
    const [creds, setCreds] = useState(initialValues);
    const [error, setError] = useState('')

    const handleChanges = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:9000/auth/signin', creds)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('token', res.data.token);
                navigate('/');
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
                setError('Email or password do not match. Please try again.')
            });
    };

    return (
        <div className={theme ? 'app dark-primary' : 'app light-primary'}>
            <Header />
            <div className='site-wrapper'>
                <div className='auth-container'>
                    <h1>Sign In</h1>
                    <br />
                    { error.length > 0 ? <span style={{backgroundColor: '#cc0000', padding: ' 8px 10px 10px', fontWeight: '500', borderRadius: '6px'}}>{error}</span> : ''}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input className='auth-input' type='email' placeholder='Email Address' name='email' value={creds.email} onChange={handleChanges} />
                        <input className='auth-input' type='password' placeholder='Password' name='password' value={creds.password} onChange={handleChanges} />
                        <button style={{width: '100%', marginTop: '10px'}}>Sign In</button>
                    </form><br />
                    <p>Don't have an account? <Link to='/register'><u>Create one!</u></Link></p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme
    };
};

export default connect(mapStateToProps)(SignIn);
