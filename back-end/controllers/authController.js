import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min("Invalid password.", 6),
});

export const register = async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email is already registered." });

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    res.status(201).json({ token });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    res.json({ token });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: err.errors[0].message });
    }
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed." });
  }
};

export const validate = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found." });

    res.json({ user });
  } catch (err) {
    console.error("Token validation error:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
