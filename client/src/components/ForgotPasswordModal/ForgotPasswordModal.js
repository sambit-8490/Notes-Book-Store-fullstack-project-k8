import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './ForgotPasswordModal.css';
import { API_URL } from '../../util/config';

function ForgotPasswordModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    if (!isOpen) return null;

    async function sendOtp() {
        if (!email) return swal('Error', 'Please enter your email', 'error');
        try {
            const response = await axios.post(`${API_URL}/send-reset-otp`, { email });
            if (response.data.success) {
                swal('Success', response.data.message, 'success');
                setStep(2);
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal('Error', error.message, 'error');
        }
    }

    async function resetPassword() {
        if (!otp || !newPassword) return swal('Error', 'Please fill all fields', 'error');
        try {
            const response = await axios.post(`${API_URL}/verify-reset-otp`, { email, otp, newPassword });
            if (response.data.success) {
                swal('Success', response.data.message, 'success').then(() => {
                    onClose();
                    setStep(1);
                    setEmail('');
                    setOtp('');
                    setNewPassword('');
                });
            } else {
                swal('Error', response.data.message, 'error');
            }
        } catch (error) {
            swal('Error', error.message, 'error');
        }
    }

    return (
        <div className="forgot-modal-overlay">
            <div className="forgot-modal-container">
                <button className="forgot-modal-close" onClick={onClose}>&times;</button>

                {step === 1 ? (
                    <>
                        <h2 className="forgot-modal-title">Forgot Password</h2>
                        <div className="forgot-input-group">
                            <label>Enter your email address</label>
                            <input
                                type="email"
                                className="forgot-input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="forgot-btn" onClick={sendOtp}>Send OTP</button>
                    </>
                ) : (
                    <>
                        <h2 className="forgot-modal-title">Reset Password</h2>
                        <div className="forgot-input-group">
                            <label>Enter OTP sent to {email}</label>
                            <input
                                type="text"
                                className="forgot-input"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="forgot-input-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="forgot-input"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button className="forgot-btn" onClick={resetPassword}>Reset Password</button>
                        <span className="back-link" onClick={() => setStep(1)}>Back to Email</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default ForgotPasswordModal;
