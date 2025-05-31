import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface SignInSignUpModalProps {
  onClose: () => void;
  onAuthSuccess?: () => void;
}

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  dateOfBirth: string;
}

const SignInSignUpModal: React.FC<SignInSignUpModalProps> = ({
  onClose,
  onAuthSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    dateOfBirth: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    const {
      email,
      password,
      firstName,
      lastName,
      username,
      address,
      dateOfBirth,
    } = formData;

    try {
      if (isSignUp) {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) throw signUpError;

        const userId = signUpData.user?.id;

        if (userId) {
          const { error: profileError } = await supabase.from("users").insert([
            {
              id: userId,
              email,
              first_name: firstName,
              last_name: lastName,
              username,
              address,
              date_of_birth: dateOfBirth,
            },
          ]);

          if (profileError) throw profileError;
        }

        toast.success("User account created successfully");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        toast.success("Login successful");
      }

      onAuthSuccess?.();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
        toast.error(err.message || "An error occurred");
      } else {
        setErrorMsg("An error occurred");
      }
    }
  };

  return (
    <div className="text-gray-800 flex flex-col items-center justify-between mx-auto">
      <div className="relative w-full mb-4">
        <div className="absolute left-0 top-0">
          <Link to="/" className="flex items-center space-x-2">
            <img src="logo.png" alt="Logo" className="h-5 w-auto" />
          </Link>
        </div>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="w-full px-4 py-2 border rounded"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="w-full px-4 py-2 border rounded"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="User Name"
              required
              className="w-full px-4 py-2 border rounded"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="w-full px-4 py-2 border rounded"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              required
              className="w-full px-4 py-2 border rounded"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      </form>
      <p className="mt-4 text-sm text-center">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default SignInSignUpModal;
