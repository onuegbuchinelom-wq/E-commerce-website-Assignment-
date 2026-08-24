import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const DB = {
    email: "onuegbuchinelo@gmail.com",
    password: "1234567",
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (password === "") {
      alert("Please enter your password");
      return;
    }
    if (password.length <= 6) {
      alert("Password must be greater than 6 characters");
      return;
    }

    if (email === DB.email && password === DB.password) {
      alert("Login successful!");
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/checkout");
      return;
    }

    alert("Incorrect email or password");
  }

  return (
    <div className="login">
      <h1 className="login__heading">Login</h1>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="login__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="login__submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}