import React, { useState } from "react";
import styled from "styled-components";
import ButtonComponent from "../../components/button";
import { useNavigate } from "react-router-dom";
import { Message, message } from "antd";

const MainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000c4b;
  color: white;
`;

const FormContainer = styled.div`
  background-color: #04346c;
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 400px; /* Set the width of the form container */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 100%; /* Set the width of the input fields */
`;

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        username: name,
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User signed up successfully");
        message.success("User signed up successfully");
        navigate("/login");
        // Optionally, you can redirect the user to another page after signup
      } else {
        console.error("Failed to sign up");
        message.error("Failed to sign up");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error);
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <h2>Signup</h2>
        <Form onSubmit={handleSignup}>
          <Label>
            Name:
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />
          </Label>
          <Label>
            Email:
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </Label>
          <Label>
            Password:
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </Label>
          <ButtonComponent buttonLabel="Signup" type="submit" />
        </Form>
      </FormContainer>
    </MainContainer>
  );
};

export default Signup;
