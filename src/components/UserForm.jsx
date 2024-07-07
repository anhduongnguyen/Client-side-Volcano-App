import React from "react";
import { Form, Button } from 'reactstrap';
import EmailInput from "../helpers/EmailInput";
import PasswordInput from "../helpers/PasswordInput";
import { Link } from "react-router-dom";

// Handle the user's login and sign up form input
export default function UserForm({ title, email, setEmail, error, setError,
  password, setPassword, isSubmitDisabled, setIsSubmitDisabled, onSubmit }) {
  
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  /* Enable to submit button if the email is in the correct format
  and a password is entered */
  const updateSubmitButton = () => {
    setIsSubmitDisabled(!(email && password));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit();
  };

  /* update the form as the user enters their username and password, 
  but don't render the form if the user is logged in already */
  return (
    <div className="form-container">
      {isLoggedIn ? (
        <h1>User is already logged in</h1>
      ) : (
        <>
          <h1>{title}</h1>
          <Form onSubmit={handleSubmit}>
            <EmailInput
              email={email}
              setEmail={setEmail}
              error={error}
              setError={setError}
              updateSubmitButton={updateSubmitButton}
            />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              updateSubmitButton={updateSubmitButton}
            />
            <p>{title === "Log In" ? "Don't have an account? " : "Already have an account? "}
              <Link to={title === "Log In" ? "/signup" : "/login"}>
                {title === "Log In" ? "Sign Up" : "Log In"}
              </Link>
            </p>
            <Button color="danger" disabled={isSubmitDisabled}>Submit</Button>
          </Form>
        </>
      )}
    </div>
  );
}