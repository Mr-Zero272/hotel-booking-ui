import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

import validation from './LoginValidation';

function LoginForm() {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        if (Object.keys(validation(values)).length === 0) {
            alert('Form Submitted successfully');
        }
    }

    return (
        <div className="login_container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="img-container">
                        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label htmlFor="username">
                            <b>Username</b>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={values.username}
                            name="username"
                            onChange={handleChange}
                        />
                        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

                        <label htmlFor="password">
                            <b>Password</b>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={values.password}
                            name="password"
                            onChange={handleChange}
                        />

                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" defaultChecked name="remember" /> Remember me
                            <label style={{ marginLeft: 'auto' }}>
                                <a href="#">Forgot Password</a>
                            </label>
                        </label>
                    </div>
                    <div className="container">
                        <button type="submit">Login</button>
                        <span>
                            Don't have an account? <Link to="/register">&nbsp;Sign Up</Link>
                        </span>
                        <div className="center-content">
                            <strong>Or Login Using</strong>
                            <div className="social-icons">
                                <div className="icon-circle facebook-circle">
                                    <a href="#">
                                        <FontAwesomeIcon icon={faFacebookF} className="facebook-icon" />
                                    </a>
                                </div>
                                <div className="icon-circle google-circle">
                                    <a href="#">
                                        <FontAwesomeIcon icon={faGoogle} className="google-icon" />
                                    </a>
                                </div>
                                <div className="icon-circle twitter-circle">
                                    <a href="#">
                                        <FontAwesomeIcon icon={faTwitter} className="twitter-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
