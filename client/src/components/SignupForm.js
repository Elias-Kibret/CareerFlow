// src/SignupForm.js

import React, { useState } from "react";
import useUserStore from "../Store/userStore.js";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "employee", // Default role
    jobType: "",
    skills: [],
    interestedSkills: [],
    companyName: "",
    companyDescription: "",
    location: "",
  });

  const { signup, error } = useUserStore((state) => ({
    signup: state.signup,
    error: state.error,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      alert("Signup successful");
    } else {
      alert(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
        {formData.role === "employee" && (
          <>
            <input
              type="text"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              placeholder="Job Type"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="skills"
              value={formData.skills.join(", ")}
              onChange={(e) => handleArrayChange(e, "skills")}
              placeholder="Skills (comma separated)"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="interestedSkills"
              value={formData.interestedSkills.join(", ")}
              onChange={(e) => handleArrayChange(e, "interestedSkills")}
              placeholder="Interested Skills (comma separated)"
              className="w-full p-2 border rounded"
            />
          </>
        )}
        {formData.role === "employer" && (
          <>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              placeholder="Company Description"
              className="w-full p-2 border rounded"
            />
          </>
        )}
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
