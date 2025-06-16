import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginInput, string>>
  >({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginInput;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const data = await loginUser(form);
      if (data.token) login(data.token);
      else setErrorMessage(data.message || "Login failed");
    } catch {
      setErrorMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
