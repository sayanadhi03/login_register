import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    number: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.number
    ) {
      alert("Please fill in all fields!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("User with this email already exists!");
      return;
    }

    // Save new user to localStorage
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.number,
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    console.log("User registered:", newUser);
    alert("Account created successfully! Redirecting to dashboard...");

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-200 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-gray-600">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              placeholder="Enter your number"
              required
              value={formData.number}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00-.007 4.243m4.249-4.25l1.414-1.414M14.121 14.121L15.535 15.535M14.121 14.121a3 3 0 01-4.243 0m6.036-4.036L7.757 21.757"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition duration-200 hover:cursor-pointer shadow-lg"
          >
            Create Account
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-medium transition duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
