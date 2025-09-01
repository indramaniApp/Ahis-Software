import React, { useState } from "react";

// This is just a wrapper to display the form.
// In your app, you'd render AddUserForm inside your modal.
export default function App() {
  return (
    <div className="bg-[#FAF7FF] min-h-screen font-sans p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <AddUserForm />
      </div>
    </div>
  );
}

function AddUserForm() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    department: "Administration",
    designation: "",
    role: "Employee",
    status: "Active",
    address: "",
    joiningDate: "",
    profilePicture: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    // Hide the success message after 4 seconds
    setTimeout(() => setSubmitted(false), 4000); 
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setSubmitted(false);
  };

  // Consistent styling matching the application's theme
  const inputStyle =
    "w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-sm h-9 focus:outline-none focus:ring-2 focus:ring-[#8053C6] focus:border-transparent transition";
  const labelStyle = "block text-gray-700 mb-1 text-sm font-medium";
  const primaryButtonStyle =
    "bg-[#D055D5] text-white font-bold py-2 px-5 rounded-lg shadow-md hover:opacity-90 transition-all transform hover:-translate-y-0.5";
  const secondaryButtonStyle =
    "bg-gray-200 text-gray-700 font-bold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-[#8053C6] text-xl font-bold mb-4 border-b pb-2">
        👤 Add New User
      </h2>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 text-sm px-4 py-3 rounded-lg mb-4" role="alert">
          <strong>Success!</strong> User data has been logged to the console. Press F12 to see it.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* First Name */}
        <div>
          <label className={labelStyle}>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Last Name */}
        <div>
          <label className={labelStyle}>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Username */}
        <div>
          <label className={labelStyle}>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Password */}
        <div>
          <label className={labelStyle}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Email */}
        <div>
          <label className={labelStyle}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Phone */}
        <div>
          <label className={labelStyle}>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Gender */}
        <div>
          <label className={labelStyle}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className={inputStyle}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className={labelStyle}>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Department */}
        <div>
          <label className={labelStyle}>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} className={inputStyle}>
            <option>Administration</option>
            <option>Doctor</option>
            <option>Nursing</option>
            <option>Lab</option>
            <option>Pharmacy</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className={labelStyle}>Designation</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Role */}
        <div>
          <label className={labelStyle}>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className={inputStyle}>
            <option>Admin</option>
            <option>Doctor</option>
            <option>Employee</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className={labelStyle}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={inputStyle}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Address */}
        <div className="sm:col-span-2 md:col-span-4">
          <label className={labelStyle}>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className={`${inputStyle} h-20`}></textarea>
        </div>

        {/* Joining Date */}
        <div>
          <label className={labelStyle}>Joining Date</label>
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className={inputStyle} />
        </div>

        {/* Profile Picture */}
        <div className="sm:col-span-1 md:col-span-3">
          <label className={labelStyle}>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#8053C6] hover:file:bg-purple-100 cursor-pointer"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-3 border-t pt-4">
        <button type="button" onClick={handleCancel} className={secondaryButtonStyle}>
          Cancel
        </button>
        <button type="submit" className={primaryButtonStyle}>
          Save User
        </button>
      </div>
    </form>
  );
}