import React, { useState } from "react";
import styled from "styled-components";
import ButtonComponent from "../../components/button";
import { Button, Message, message } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    console.log(formData, "formdta");
    try {
      const response = await fetch("http://localhost/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // body: JSON.stringify({
        //   email: email, // Assuming email is sent as username
        //   password: password,
        // }),
      });
      if (response.ok) {
        console.log("User login successfull");
        Cookies.set('user', email)
        message.success("User login successfull");
        navigate("/home");
        // Optionally, you can redirect the user to another page after signup
      } else {
        console.error("Failed to login");
        message.error("Failed to login ");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error);
    }
    // Add your login logic here
  };

  return (
    <MainContainer>
      <FormContainer>
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ButtonComponent size="100" buttonLabel="Login" onClick={() => handleLogin}/>
            {/* <Button className=""  onClick={handleLogin}>Login</Button> */}
            <NavLink to="/signup">
              <ButtonComponent size="100" buttonLabel="Signup" />
            </NavLink>
          </div>
        </Form>
      </FormContainer>
    </MainContainer>
  );
};

export default Login;
