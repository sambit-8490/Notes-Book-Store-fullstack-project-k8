import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './OtpModal.css';
import { API_URL } from '../../util/config';

function OtpModal({ isOpen, onClose, email, onSuccess }) {
    const [otp, setOtp] = useState('');

    if (!isOpen) return null;

    async function verify() {
        try {
            const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
            if (response.data.success) {
                swal('Success', response.data.message, 'success').then(() => {
                    onSuccess(response.data.data);
                    onClose();
                });
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal('Error', error.message, 'error');
        }
    }

    async function resend() {
        try {
            const response = await axios.post(`${API_URL}/resend-otp`, { email });
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
        <div className="otp-modal-overlay">
            <div className="otp-modal-content">
                <button className="otp-modal-close" onClick={onClose}>&times;</button>
                <h2>Verify Email</h2>
                <p>Enter the OTP sent to <strong>{email}</strong></p>

                <div className="otp-input-group">
                    <input
                        type="text"
                        placeholder="ENTER OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                    />
                </div>

                <button className="btn-verify-modal" onClick={verify}>Verify & Login</button>
                <p className="resend-link" onClick={resend}>Resend OTP</p>
            </div>
        </div>
    );
}

export default OtpModal;
