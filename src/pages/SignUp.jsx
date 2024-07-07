import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { ToastContainer, toast } from 'react-toastify';

// Sign up page where the user's sign up process is handeled
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSignUp = async (props) => {

    const requestBody = {
      email: email,
      password: password
    };

    /* Post the user's email and password to the API
    and handle each error accordingly */
    try {
      const response = await fetch("http://4.237.58.241:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 201) {
        toast.success("User registered succesfully", { autoClose: 2000 });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);

      } else if (response.status === 409) {
        toast.error("User already exists");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error has occured, unable to submit");
    }
  };

  // Handle the sign up 
  return (
    <div>
      <UserForm
        title="Sign Up"
        email={email}
        setEmail={setEmail}
        error={error}
        setError={setError}
        password={password}
        setPassword={setPassword}
        isSubmitDisabled={isSubmitDisabled}
        setIsSubmitDisabled={setIsSubmitDisabled}
        onSubmit={handleSignUp}
      />
      <ToastContainer />
    </div>
  );
}

