import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// import Header from '../components/header/Header';

const initialValues = {
    email: '',
    password: '',
    firstName: '',
};

const Register = (props) => {
    const { theme } = props;
    const navigate = useNavigate();
    const [creds, setCreds] = useState(initialValues);
    const [error, setError] = useState('');

    const handleChanges = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
      console.log(creds)
        e.preventDefault();
        axios
            .post('http://localhost:9000/auth/register', creds)
            .then((res) => {
                axios.post('http://localhost:9000/auth/signin', creds).then((res) => {
                    localStorage.setItem('todo-app-id', res.data.id);
                    localStorage.setItem('todo-app-firstName', res.data.firstName);
                    localStorage.setItem('todo-app-token', res.data.token);
                    navigate('/');
                    window.location.reload(true);
                });   
            })
            .catch((err) => {
                setError('All fields need to be filled out. Please try again!');
            });
    };

    return (
        <div className={theme ? 'app dark-mode' : 'app light-mode'}>
            <div className='site-wrapper'>
                <div className='auth-container'>
                    <h1>Register</h1>
                    <br />
                    {error.length > 0 ? <span style={{ backgroundColor: '#cc0000', color: '#ffffff', padding: ' 8px 10px 10px', fontWeight: '500', borderRadius: '6px' }}>{error}</span> : ''}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input className='auth-input' type='email' placeholder='Email Address' name='email' value={creds.email} onChange={handleChanges} />
                        <input className='auth-input' type='password' placeholder='Password' name='password' value={creds.password} onChange={handleChanges} />
                        <input className='auth-input' type='text' placeholder='First Name' name='firstName' value={creds.firstName} onChange={handleChanges} />
                        <button className='auth-button'>Create Your Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        theme: state.header.theme,
    };
};

export default connect(mapStateToProps)(Register);
