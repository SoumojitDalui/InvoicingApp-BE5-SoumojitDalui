import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/user/login/", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 200) {
          setError(true);
        } else {
          localStorage.setItem("username", res.username);
          localStorage.setItem("loggedIn", true);
          navigate("/invoices");
        }
      });
  }
  return (
    <div className="container w-50 mb-5 mt-3">
      <h1 className="pb-5">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onInput={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
          />
        </div>

        <div className="form-group my-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onInput={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg mb-3">
          Sign In
        </button>
        {error ? (
          <div className="h6 text-danger">"Something went wrong..."</div>
        ) : (
          ""
        )}
      </form>
      Already have an account?{" "}
      <Link to={"/user/signup"}>
        <button className="btn btn-success btn-sm">Signup</button>
      </Link>
    </div>
  );
}
