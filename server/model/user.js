import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["employee", "employer", "admin"],
    required: [true, "Please provide role"],
  },
  employeeDetails: {
    jobType: [{ type: String }],
    skills: [{ type: String }], // Skills the employee has
    interestedSkills: [{ type: String }], // Skills the employee is interested in
  },
  employerDetails: {
    companyName: { type: String },
    companyDescription: { type: String },
  },
  location: {
    type: String,
    maxlength: 50, // Increased length for more detailed locations
    trim: true,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Generate JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
