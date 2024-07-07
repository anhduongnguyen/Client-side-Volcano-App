import React from "react";
import { FormGroup, Label, Input, Col } from 'reactstrap';

// Handle the user's email input with validation in the forms
export default function EmailInput({ email, setEmail, error, setError, updateSubmitButton }) {

  // Check if the user's email is in the correct format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Set the email 
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (!isValidEmail(value)) {
      setError("Please enter a valid email");
    } else {
      setError("");
    }
    updateSubmitButton();
  };

  // Some of the code has been taken from reactstrap.github.io
  return (
    <div className="email-input">
      <FormGroup row>
        <Label for="email">Email</Label>
        <Col sm={3}>
          <Input
            id="email"
            name="email"
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Col>
        {error && <p className="error">{error}</p>}
      </FormGroup>
    </div>
  );
}
