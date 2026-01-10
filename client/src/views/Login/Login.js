import React, { useState, useEffect } from 'react'
import { currentUser } from '../../util/currentUser';
import swal from 'sweetalert';
import OtpModal from '../../components/OtpModal/OtpModal';
import ForgotPasswordModal from '../../components/ForgotPasswordModal/ForgotPasswordModal';

import axios from 'axios'
import "./Login.css"
import { Link } from 'react-router-dom';
import { API_URL } from '../../util/config';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);

    useEffect(() => {
        if (currentUser) {
            window.location.href = "/"
        }
    }, [])

    async function loginUser() {
        const response = await axios.post(`${API_URL}/login`, {
            email: email,
            password: password,
        })
        console.log(response.data)
        if (response.data.success) {
            await swal({
                title: "Login Successful",
                text: "Welcome back to NoteWala!",
                icon: "success",
                button: "Let's Go!",
            });
            localStorage.setItem('currentUser', JSON.stringify(response.data.data.user));
            localStorage.setItem('token', response.data.data.token);
            window.location.href = "/"
        }
        else {
            if (response.data.message.includes("not verified")) {
                setShowOtpModal(true);
                return;
            }
            await swal({
                title: "Login Failed",
                text: response.data.message,
                icon: "error",
                button: "Try Again",
            });
        }
    }

    const handleOtpSuccess = (data) => {
        if (data && data.token) {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            window.location.href = "/";
        }
    };

    return (
        <div>
            <OtpModal
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                email={email}
                onSuccess={handleOtpSuccess}
            />

            <ForgotPasswordModal
                isOpen={showForgotModal}
                onClose={() => setShowForgotModal(false)}
            />

            <div className='row login-row'>
                <div className='col-lg-6 description-col'>
                    <div className='description-content'>
                        <h1 className='main-heading'>Own <span className='highlight-text'>NotesWala</span></h1>
                        <p className='description-text'>
                            Thank You For Visiting Our Website 🧡 <br />
                            "The reading of all good books is like conversation with the finest (people) of the past centuries." - Descartes
                        </p>
                    </div>
                    <img className='hero-image' src="https://img.freepik.com/free-vector/kids-reading-concept-illustration_114360-8513.jpg" alt='Reading' />
                </div>

                <div className='col-lg-6 form-col'>
                    <div className='form-container login-container'>
                        <div className='form-header'>
                            <img className='welcome-icon' src='https://thumbs.dreamstime.com/b/hand-book-logo-illustration-art-background-43965136.jpg' alt='' />
                            <span>Welcome Back</span>
                        </div>

                        <form>
                            <div className="input-group">
                                <label htmlFor='email'>Email Address</label>
                                <input type='email' id='email' placeholder='name@example.com' className='user-input'
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor='password'>Password</label>
                                <div className='password-input-wrapper'>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        id='password'
                                        placeholder='Enter Password'
                                        className='user-input password-field'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button type='button' className='toggle-password' onClick={() => setPasswordVisible(!passwordVisible)} >
                                        {passwordVisible ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                    </button>
                                </div>
                                <div className="forgot-password-link">
                                    <span onClick={() => setShowForgotModal(true)}>Forgot Password?</span>
                                </div>
                            </div>

                            <button type='button' className='action-button login-btn' onClick={loginUser}>Login</button>

                            <div className="alternate-action">
                                <span>Don't have an account? <Link to='/signup'>Signup here</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login