import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if(!localStorage.loggedIn) {
      navigate('/user/login')
    }
  })

  function handleClick() {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Invoice App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/invoices"
              >
                Invoices
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/newInvoice">
                New Invoice
              </a>
            </li>
          </ul>
          <button
            className={isHovered ? "btn btn-warning" : "btn btn-primary"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleClick()}
          >
            { isHovered ? "Sign Out" : 'Hi '+localStorage.username+"!" }
          </button>
        </div>
      </div>
    </nav>
  );
}
