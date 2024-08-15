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
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-[#16171C] text-center">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="flex-1 p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="flex-1 p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
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
              className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
            />
            <textarea
              name="skills"
              value={formData.skills.join(", ")}
              onChange={(e) => handleArrayChange(e, "skills")}
              placeholder="Skills (comma separated)"
              className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              rows="4"
            />
            <textarea
              name="interestedSkills"
              value={formData.interestedSkills.join(", ")}
              onChange={(e) => handleArrayChange(e, "interestedSkills")}
              placeholder="Interested Skills (comma separated)"
              className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              rows="4"
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
              className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
            />
            <textarea
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              placeholder="Company Description"
              className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
              rows="4"
            />
          </>
        )}
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-lg text-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
        />
        <button
          type="submit"
          className="w-full py-3 bg-[#F2994A] text-white rounded-lg shadow-md hover:bg-[#e67e22] focus:outline-none focus:ring-2 focus:ring-[#F2994A]"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
