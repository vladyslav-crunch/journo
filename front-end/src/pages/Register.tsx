import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

const registerSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .refine((val) => val.length >= 6, {
      message: "Password must be at least 6 characters.",
    }),
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState("");

  const { login } = useAuth(); // ✅ get login from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = registerSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    try {
      const res = await registerUser({ email, password });

      // ✅ If backend returns a token
      if (res.token) {
        login(res.token); // Automatically logs in and redirects
      } else {
        setServerError(res.message || "Registration failed");
      }
    } catch {
      setServerError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold">Register</h2>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <div>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
