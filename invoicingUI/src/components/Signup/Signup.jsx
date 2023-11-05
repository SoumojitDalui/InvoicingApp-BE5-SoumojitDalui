import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupData, setSignupData] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/user/signup/", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 201) {
          setError(true);
        } else {
          navigate("/");
        }
      });
  }
  return (
    <div className="container w-50 mb-5 mt-3">
      <h1 className="pb-5">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            onInput={(e) => {
              setSignupData({ ...signupData, username: e.target.value });
            }}
          />
        </div>

        <div className="form-group my-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onInput={(e) => {
              setSignupData({ ...signupData, email: e.target.value });
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
              setSignupData({ ...signupData, password: e.target.value });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg mb-3">
          Sign Up
        </button>
        {error ? (
          <div className="h6 text-danger">"Something went wrong..."</div>
        ) : (
          ""
        )}
      </form>
      Already have an account?{" "}
      <Link to={"/user/login"}>
        <button className="btn btn-success btn-sm">Signin</button>
      </Link>
    </div>
  );
}
