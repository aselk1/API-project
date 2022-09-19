import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ul><ProfileButton user={sessionUser} /></ul>;
  } else {
    sessionLinks = (
      <ul className="links">
        <li>
          {/* <NavLink to="/login">Log In</NavLink> */}
          <LoginFormModal />
        </li>
        <li>
          <SignupFormModal />
        </li>
      </ul>
    );
  }
  return (
    <div>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
