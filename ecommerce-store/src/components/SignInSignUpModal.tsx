import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const SignInSignUpModal = ({ onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { email, password } = formData;

    try {
      if (isSignUp) {
        // 1. Sign up
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (signUpError) throw signUpError;

        const userId = signUpData.user?.id;

        // 2. Insert into profiles table
        if (userId) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: userId,
                email,
              },
            ]);
          if (profileError) throw profileError;
        }
      } else {
        // Sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }

      onAuthSuccess?.();
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">
        {isSignUp ? "Create Account" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
