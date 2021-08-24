import React, { useState } from "react";
import { Redirect } from "react-router";

function Login() {
  const [email, setEmail] = useState("candidate@sigmoid.com");
  const [password, setPassword] = useState("Sigmoid#123");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState("");
  const login = () => {
    fetch("https://sigviewauth.sigmoid.io/signIn", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        rememberMe: true,
      }),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        debugger
        localStorage.setItem("token", data.token);
        setToken(data.token);
      })
      .catch((e) => setError(e.message));
  };
  if (token) {
    return <Redirect to="/home" />;
  }
  console.log(token)
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label htmlFor="passowrd">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={login}>
        Submit
      </button>
      {error}
    </div>
  );
}

export default Login;
