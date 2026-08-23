import { useState } from "react";
import "./Login.css";

function Login({
  heading = "Login",
  submitBtnLabel = "Login",
  submittingBtnLabel = "Logging in..."
}) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid username or password");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (user) {
    return <p className="login__status login__status--success">Welcome back, {user.firstName}!</p>;
  }

  return (
    <div className="login">
      <h1 className="login__heading">{heading}</h1>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} />
        </div>

        <div className="login__field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
        </div>

        {error && <p className="login__error">{error}</p>}

        <button type="submit" className="login__submit-btn" disabled={loading}>
          {loading ? submittingBtnLabel : submitBtnLabel}
        </button>
      </form>
    </div>
  );
}

export default Login;