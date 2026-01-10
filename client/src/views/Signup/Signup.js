import React, { useState, useEffect } from 'react'
import { currentUser } from '../../util/currentUser';
import swal from 'sweetalert';
import OtpModal from '../../components/OtpModal/OtpModal';

import axios from 'axios'
import "./Signup.css"
import { Link } from 'react-router-dom';  // Added Link import
import { API_URL } from '../../util/config';

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role] = useState('user')
    const [showOtpModal, setShowOtpModal] = useState(false);

    useEffect(() => {
        if (currentUser) {
            window.location.href = "/"
        }
    }, [])

    async function signupUser() {
        if (!name || !email || !phone || !password) {
            return swal({
                title: "Error",
                text: "Please fill all fields",
                icon: "error",
            });
        }

        const response = await axios.post(`${API_URL}/signup`, {
            username: name,
            email: email,
            phone: phone,
            password: password,
            role: role
        })
        console.log(response.data)
        if (response.data.success) {
            await swal({
                title: "Signup Successful",
                text: "Account created! Please verify your email.",
                icon: "success",
                button: "Verify Now",
            });
            setShowOtpModal(true);
        }
        else {
            swal({
                title: "Signup Failed",
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
        } else {
            window.location.href = '/login';
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

            <div className='row login-row'> {/* Reuse generic row class */}
                <div className='col-lg-6 description-col'>
                    <div className='description-content'>
                        <h1 className='main-heading'>Get your <span className='highlight-text'>Notes</span> Today</h1>
                        <p className='description-text'>"A reader lives a thousand lives before he dies . . . The man who never reads lives only one." - George R.R. Martin</p>
                    </div>
                    <img className='hero-image' src="https://img.freepik.com/free-vector/reading-book-illustration_114360-8532.jpg" alt='' />
                </div>

                <div className='col-lg-6 form-col'>
                    <div className='form-container start-container'>
                        <div className='form-header'>
                            <img className='welcome-icon' src='https://thumbs.dreamstime.com/b/hand-book-logo-illustration-art-background-43965136.jpg' alt='' />
                            <span>Join Us</span>
                        </div>
                        <form>
                            <div className="input-group">
                                <label htmlFor='name'>Full Name</label>
                                <input type='text' id='name' placeholder='Enter Name' className='user-input'
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor='email'>Email Address</label>
                                <input type='email' id='email' placeholder='Enter Email' className='user-input'
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor='phone'>Phone Number</label>
                                <input type='text' id='phone' placeholder='Enter Phone' className='user-input'
                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' placeholder='Enter Password' className='user-input'
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <button type='button' className='action-button signup-btn' onClick={signupUser}>Signup 💨</button>

                            <div className="alternate-action">
                                <span>Already have an account? <Link to='/login'>Login here</Link></span>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Signup