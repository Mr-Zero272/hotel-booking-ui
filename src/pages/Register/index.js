import React, { useState } from 'react';
import validation from './RegisterValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './Register.scss';

function SignupForm() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        // if (!values.username) {
        //     setErrors({ ...errors, username: 'Username should not be empty' });
        // }

        if (Object.keys(validation(values)).length === 0) {
            alert('Form Submitted successfully');
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="signup_container">
            <div className="signup_form">
                <h1>Register</h1>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            <strong>Username:</strong>
                        </label>
                        <input
                            style={{ marginBottom: '10px' }}
                            type="text"
                            placeholder=" Please Enter Username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <p style={{ color: 'red' }}>
                                <strong>{errors.username}</strong>
                            </p>
                        )}

                        <label htmlFor="email">
                            <strong>Email:</strong>
                        </label>
                        <input
                            style={{ marginBottom: '10px' }}
                            type="email"
                            placeholder=" Please Enter Email"
                            name="email"
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p style={{ color: 'red' }}>
                                <strong>{errors.email}</strong>
                            </p>
                        )}

                        <label htmlFor="password">
                            <strong>Password:</strong>
                        </label>
                        <div className="input-group">
                            <input
                                style={{ marginBottom: '10px' }}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Please Enter Password"
                                onChange={handleChange}
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {errors.password && (
                            <p style={{ color: 'red' }}>
                                <strong>{errors.password}</strong>
                            </p>
                        )}

                        <label htmlFor="confirm_password">
                            <strong>Confirm Password:</strong>
                        </label>
                        <div className="input-group">
                            <input
                                style={{ marginBottom: '10px' }}
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirm_password"
                                placeholder=" Please Enter Confirm Password"
                                onChange={handleChange}
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility}>
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {errors.confirm_password && (
                            <p style={{ color: 'red' }}>
                                <strong>{errors.confirm_password}</strong>
                            </p>
                        )}
                        <label>
                            <input type="checkbox" defaultChecked name="remember" /> You agree to our terms
                        </label>
                        <div>
                            <button className="btnSignup">Signup</button>
                            <span>
                                Already have an account? <Link to="/login">&nbsp;Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
