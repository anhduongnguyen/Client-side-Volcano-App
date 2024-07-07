import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { ToastContainer, toast } from 'react-toastify';

// Log in page where the user's login process is handeled
export default function LogIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleLogIn = async () => {

    const requestBody = {
      email: email,
      password: password
    };

    /* post the login details to the API and handle 
    each response status accordingly */
    try {
      const response = await fetch("http://4.237.58.241:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 200) {

        const responseData = await response.json();

        // Calculate when the token will expire
        const loginTime = Math.floor(new Date().getTime() / 1000);
        const expirationTime = loginTime + responseData.expires_in;

        // Store token, token expiration time, login time, and token duration
        window.localStorage.setItem("token", responseData.token);
        window.localStorage.setItem("tokenExpirationTime", expirationTime);
        window.localStorage.setItem("loginTime", loginTime);
        window.localStorage.setItem("tokenDuration", responseData.expires_in);
        window.localStorage.setItem("loggedIn", true);

        toast.success("Login successful!", { autoClose: 2000 });
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);

      } else if (response.status === 401) {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("an error has occurred, unable to submit");
    }
  };

  // Handle the log in
  return (
    <div>
      <UserForm
        title="Log In"
        email={email}
        setEmail={setEmail}
        error={error}
        setError={setError}
        password={password}
        setPassword={setPassword}
        isSubmitDisabled={isSubmitDisabled}
        setIsSubmitDisabled={setIsSubmitDisabled}
        onSubmit={handleLogIn}
      />
      <ToastContainer />
    </div>
  );
}