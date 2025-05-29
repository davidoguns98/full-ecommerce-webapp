import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { supabase } from "../supabaseClient";

const FeedbackCTA = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const { name, email, message } = form;

    const { error } = await supabase
      .from("feedbacks")
      .insert([{ name, email, message }]);

    if (error) {
      setStatusMessage("❌ Failed to send feedback. Please try again.");
      console.error("Supabase error:", error.message);
    } else {
      setStatusMessage("✅ Feedback sent successfully!");
      setForm({ name: "", email: "", message: "" }); // Clear form
    }

    setIsSubmitting(false);
  };

  return (
    <section className="bg-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          We'd love to hear from you!
        </h2>
        <p className="text-gray-600 mb-6">
          Send us your thoughts, questions, or feedback using the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </button>
          {statusMessage && (
            <p
              className={`text-sm mt-2 ${
                statusMessage.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default FeedbackCTA;
