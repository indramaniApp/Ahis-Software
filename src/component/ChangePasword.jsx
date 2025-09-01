// ../component/ChangePasswordForm.jsx
import React, { useState } from 'react';

// --- Reusable and Modern Style Constants ---
const inputStyle = "w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm h-9 focus:outline-none focus:ring-2 focus:ring-[#8053C6] focus:border-transparent transition";
const labelStyle = "block text-gray-700 mb-1 text-sm font-medium";
const primaryButtonStyle = "bg-[#D055D5] text-white font-bold py-2 px-5 rounded-lg shadow-md hover:opacity-90 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed";
const secondaryButtonStyle = "bg-gray-200 text-gray-700 font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
const errorTextStyle = "text-red-600 text-xs mt-1";

// A small, styled notification component
const Notification = ({ message, type, onDismiss }) => {
  const baseStyle = "p-3 mb-4 text-sm border-l-4 flex justify-between items-center rounded-lg";
  const styles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };
  return (
    <div className={`${baseStyle} ${styles[type]}`} role="alert">
      <p>{message}</p>
      <button onClick={onDismiss} className="font-bold text-xl leading-none">&times;</button>
    </div>
  );
};

export default function ChangePasswordForm() {
  const initialPasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [passwords, setPasswords] = useState(initialPasswordData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (name === 'newPassword' || name === 'confirmPassword') {
        setErrors(prev => ({ ...prev, confirmPassword: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (passwords.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long.';
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'New passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(null);
    if (!validate()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Submitting to server:", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setIsLoading(false);
      setPasswords(initialPasswordData);
      setNotification({ message: 'Password has been updated successfully!', type: 'success' });
    }, 1500);
  };
  
  const handleCancel = () => {
    setPasswords(initialPasswordData);
    setErrors({});
    setNotification(null);
  };

  return (
    // Main container with modern styling
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#8053C6]">
            🔑 Change Password
            </h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
            {/* Form Content Section */}
            <div className="p-6">
            {notification && <Notification {...notification} onDismiss={() => setNotification(null)} />}
            
            <fieldset className="border border-gray-200 p-4 rounded-lg">
                <legend className="px-2 text-sm font-medium text-gray-500">Credentials</legend>
                <div className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className={labelStyle}>Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" value={passwords.currentPassword} onChange={handleChange} className={inputStyle} required />
                </div>
                <div>
                    <label htmlFor="newPassword" className={labelStyle}>New Password</label>
                    <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handleChange} className={inputStyle} required />
                    {errors.newPassword && <p className={errorTextStyle}>{errors.newPassword}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className={labelStyle}>Confirm New Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} className={inputStyle} required />
                    {errors.confirmPassword && <p className={errorTextStyle}>{errors.confirmPassword}</p>}
                </div>
                </div>
            </fieldset>

            </div>
            
            {/* Footer / Button Section */}
            <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t border-gray-200">
            <button type="button" onClick={handleCancel} className={secondaryButtonStyle} disabled={isLoading}>
                Cancel
            </button>
            <button type="submit" className={primaryButtonStyle} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            </div>
        </form>
    </div>
  );
}