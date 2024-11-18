import React, { ChangeEvent, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const initContactForm = {
  Username: "",
  email: "",
  comment: "",
};

const Helps: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState(initContactForm);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    comment: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // ''''

  const handleChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    let isValid = true;
    const newErrors = { email: "", username: "", comment: "" };

    if (!user.Username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (!validateEmail(user.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!user.comment) {
      newErrors.comment = "Please tell us about your project.";
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) {
      emailjs
        .sendForm(
          "service_nzcvp3l", // Update with your service ID
          "template_qmw2qlg", // Update with your template ID
          form.current!,
          "hVvaUjpN8LnR1QX7o" // Update with your public key
        )
        .then((result) => {
          console.log(result.text);
        })
        .catch((error) => {
          console.log(error.text);
        });

      console.log("Form submitted successfully: ", user);
      setUser(initContactForm); // Reset form after successful submission
    }
  };

  const isFormValid = user.Username && user.email && user.comment;

  return (
    <div className="p-8 ml-4 bg-white min-h-screen w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Helps</h2>

      <div className="bg-gray-50 shadow-sm rounded-lg pt-3 mb-9 border-2 border-gray-200">
        <h2 className="text-lg font-medium text-gray-700 px-5">Contact Us</h2>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="space-y-4 px-5 py-4 bg-white border-t-2 rounded-br-lg rounded-bl-lg border-gray-200"
        >
          {/* Username */}
          <div>
            <label
              className="block text-base font-normal text-gray-600 mb-1"
              htmlFor="Username"
            >
              Username
            </label>
            <input
              type="text"
              name="Username"
              id="Username"
              value={user.Username}
              onChange={handleChanged}
              className="mt-1 w-full text-gray-700 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-base font-normal text-gray-600 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChanged}
              className="mt-1 w-full text-gray-700 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Tell us about the problem */}
          <div>
            <label
              className="block text-base font-normal text-gray-600 mb-1"
              htmlFor="comment"
            >
              Tell Us About Your Problem
            </label>
            <textarea
              name="comment"
              id="comment"
              value={user.comment}
              onChange={handleChanged}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter details to visualize and showcase your product information efficiently"
              rows={4}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Describe the issue you’re experiencing. Our team will review your
            message and respond as soon as possible to help resolve your
            concern.
          </p>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg text-white ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid} // Disable button if form is incomplete
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Helps;
