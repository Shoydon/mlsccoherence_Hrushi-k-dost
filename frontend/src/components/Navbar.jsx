import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        DfinanceApp
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
        <CustomLink to="/signin">Sign In</CustomLink>
        <CustomLink to="/payments">Payments</CustomLink>
        <CustomLink to="/borrow">Borrow</CustomLink>
        <CustomLink to="/lending">Lending</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
