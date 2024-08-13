import { User } from "../model/user.js";

export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      companyName,
      companyDescription,
      jobType,
      skills,
      interestedSkills,
    } = req.body;

    if (role === "employee" && (!jobType || !skills || !interestedSkills)) {
      return res
        .status(400)
        .json({ message: "Employee details including job type skills," });
    }
    if (role === "emloyer" && (!companyName || !companyDescription)) {
      return res.status(400).json({
        message:
          "Employee details including jon type, skills, and interseted skills are requird",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      ...(role === "employee"
        ? {
            employeeDetails: {
              jobType,
              skills,
              interestedSkills,
            },
          }
        : {}),
      ...(role === "employer"
        ? {
            employerDetails: {
              companyName,
              companyDescription,
            },
          }
        : {}),
    });
    await newUser.save();
    const token = newUser.createJWT();
    console.log(token);
    res.status(201).json({ user: newUser, token });
    console.log(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    const ismatch = await user.comparePassword(password);
    if (!ismatch) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = user.createJWT();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      location,
      jobType,
      skills,
      interstedSkills,
      companyName,
      companyDescription,
    } = req.body;
    const userId = req.user.userId;
    const userRole = req.user.role;
    const updateFields = { firstName, lastName, location };

    if (userRole === "employee") {
      updateFields.employeeDetails = {
        jobType,
        skills,
        interstedSkills,
      };
    }
    if (userRole === "employer") {
      updateFields.employerDetails = {
        companyName,
        companyDescription,
      };
    }
    const updateUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};
