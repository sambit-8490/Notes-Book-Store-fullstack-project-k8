import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './VerifyOtp.css';

function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('verifyEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    async function verify() {
        try {
            const response = await axios.post('/verify-otp', { email, otp });
            if (response.data.success) {
                swal('Success', response.data.message, 'success').then(() => {
                    localStorage.removeItem('verifyEmail');
                    localStorage.setItem('currentUser', JSON.stringify(response.data.data.user));
                    localStorage.setItem('token', response.data.data.token);
                    window.location.href = '/';
                });
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal('Error', error.message, 'error');
        }
    }

    async function resend() {
        if (!email) return swal('Error', 'Please enter email to resend OTP', 'error');
        try {
            const response = await axios.post('/resend-otp', { email });
            if (response.data.success) {
                swal('Success', response.data.message, 'success');
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal("Error", error.message, "error");
        }
    }

    return (
        <div className='verify-container'>
            <h2>Verify OTP</h2>
            <p>Enter the OTP sent to your email</p>
            <input
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder='Enter OTP'
                value={otp}
                onChange={e => setOtp(e.target.value)}
            />
            <button onClick={verify} className='btn-verify'>Verify</button>
            <p onClick={resend} className='resend-text'>Resend OTP</p>
        </div>
    )
}

export default VerifyOtp;
