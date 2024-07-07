import React from "react";
import { FormGroup, Label, Input, Col } from 'reactstrap';

// Handle the user's password input in the forms
export default function PasswordInput({ password, setPassword, updateSubmitButton }) {

  // Set the password
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    updateSubmitButton();
  };

  // Some of the code has been taken from reactstrap.github.io
  return (
    <FormGroup row>
      <Label for="password">Password</Label>
      <Col sm={3}>
        <Input
          id="password"
          name="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Col>
    </FormGroup>
  );
}
