/* eslint-disable linebreak-style */
import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blog";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, errorMessage, setErrorMessage, setNotification } = props;

  const handleloginClick = async (event) => {
    event.preventDefault();

    try {
      const loginUser = await loginService.login({ username, password });
      if (loginUser) {
        console.log(loginUser);
        window.localStorage.setItem(
          "loginUserDetails",
          JSON.stringify(loginUser)
        );
        blogService.generateToken(loginUser.token);
        setUser(loginUser);
        setNotification(`${loginUser.name} logged in`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setUsername("");
        setPassword("");
      } else {
        console.log("invalid username or password");
      }
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <div>
        <h2>log in to application</h2>
      </div>
      <div>{errorMessage}</div>
      <div>
        <form onSubmit={handleloginClick}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <br />
          <div>
            Password:
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
