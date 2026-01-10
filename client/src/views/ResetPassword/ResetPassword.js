import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './../VerifyOtp/VerifyOtp.css'; // Reuse styles
import { API_URL } from '../../util/config';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('resetEmail');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    async function reset() {
        if (!otp || !newPassword) return swal('Error', 'Please fill all fields', 'error');
        try {
            const response = await axios.post(`${API_URL}/verify-reset-otp`, { email, otp, newPassword });
            if (response.data.success) {
                swal('Success', response.data.message, 'success').then(() => {
                    localStorage.removeItem('resetEmail');
                    window.location.href = '/login';
                });
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal('Error', error.message, 'error');
        }
    }

    return (
        <div className='verify-container'>
            <h2>Reset Password</h2>
            <input
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled
            />
            <input
                placeholder='Enter OTP'
                value={otp}
                onChange={e => setOtp(e.target.value)}
            />
            <input
                type="password"
                placeholder='Enter New Password'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <button onClick={reset} className='btn-verify'>Reset Password</button>
        </div>
    )
}

export default ResetPassword;
