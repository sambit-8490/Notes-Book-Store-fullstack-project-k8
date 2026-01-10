import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './ForgotPassword.css';
import { API_URL } from '../../util/config';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    async function sendOtp() {
        if (!email) return swal('Error', 'Please enter your email', 'error');
        try {
            const response = await axios.post(`${API_URL}/send-reset-otp`, { email });
            if (response.data.success) {
                swal('Success', response.data.message, 'success').then(() => {
                    localStorage.setItem('resetEmail', email);
                    window.location.href = '/reset-password';
                });
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal('Error', error.message, 'error');
        }
    }

    return (
        <div className='forgot-container'>
            <h2>Forgot Password</h2>
            <p>Enter your email to receive a reset OTP</p>
            <input
                type="email"
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} className='btn-forgot'>Send OTP</button>
        </div>
    )
}

export default ForgotPassword;
