import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// Styles
import Header from '../components/Header';

// Assets
import Checkmark from '../assets/checkmark.png';
import Xmark from '../assets/xmark.png';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
};

const Register = (props) => {
    const { theme } = props;
    const navigate = useNavigate();
    const [creds, setCreds] = useState(initialValues);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleChanges = (e) => setCreds({ ...creds, [e.target.name]: e.target.value }); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!creds.firstName) {
            setError('Please enter your first name')
        } else if (!creds.lastName) {
            setError('Please enter your last name')
        } else if (!creds.email) {
            setError('Please enter an email address')
        // } else if (/\d/.test(creds.password) || creds.password === creds.confirmPassword) {
        //     setError('Password not accepted')
        } else {
            axios
            .post('http://localhost:9000/auth/register', creds)
            .then((res) => {
                axios.post('http://localhost:9000/auth/signin', creds).then((res) => {
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('firstName', res.data.firstName);
                    localStorage.setItem('lastName', res.data.lastName);
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                    window.location.reload(true);
                });   
            })
            .catch((err) => {
                // console.log(err)
                // if (err == Unauthorized) {
                //     setError('Account with that email already exists.')
                // }
                // setError('Please try again!');
            });
        }
    };

    return (
        <div className={theme ? 'app dark-primary' : 'app light-primary'}>
            <Header />
            <div className='site-wrapper'>
                <div className='auth-container'>
                    <h1>Register</h1>
                    <br />
                    {error && <p className='error-message'>{error}</p>}
                    <br />
                    <form onSubmit={handleSubmit}>
                        <input className='auth-input' type='text' placeholder='First Name' name='firstName' value={creds.firstName} onChange={handleChanges} />
                        <input className='auth-input' type='text' placeholder='Last Name' name='lastName' value={creds.lastName} onChange={handleChanges} />
                        <input className='auth-input' type='email' placeholder='Email Address' name='email' value={creds.email} onChange={handleChanges} />
                        
                        <div className='pass-container'>
                            <input className='auth-input password' type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' value={creds.password} onChange={handleChanges} />
                            <div className='show-pass' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </div>
                        </div>
                        
                        <div className='register-validation-container' style={creds.password.length > 0 ? {height: '147px'} : {height: '0'}}>
                            <div className='pass-container'>
                                <input className='auth-input' type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' name='confirmPassword' value={creds.confirmPassword} onChange={handleChanges} />
                            </div>
                        {/* Validate Password */}
                            <p style={creds.password.length >= 6 ? {color: '#28A745'} : {color: '#DC3545'}}>
                                <img className={'error-img' + ((creds.password.length >= 6) ? ' error-img-green' : ' error-img-red')} src={creds.password.length >= 6 ? Checkmark : Xmark} />
                                Password must be 6 characters long
                            </p>
                            <p style={/\d/.test(creds.password) ? {color: '#28A745'} : {color: '#DC3545'}}>
                                <img className={'error-img' + ((/\d/.test(creds.password)) ? ' error-img-green' : ' error-img-red')} src={creds.password.length >= 6 ? Checkmark : Xmark} />
                                Password must include a number
                            </p>
                            <p style={(creds.password.length > 0 && creds.password === creds.confirmPassword) ? {color: '#28A745'} : {color: '#DC3545'}}>
                                <img className={'error-img' + ((creds.password.length > 0 && creds.password === creds.confirmPassword) ? ' error-img-green' : ' error-img-red')} src={creds.password.length >= 6 ? Checkmark : Xmark} />
                                Both passwords must match
                            </p>
                        </div>
                        
                        <button style={{width: '100%', marginTop: '10px'}}>Create Your Account</button>
                    </form><br />
                    <p><Link to='/register'><u>Sign in here!</u></Link></p>
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
