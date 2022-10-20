import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./SignupForm.css";

function SignupForm({setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    //check passwords match
    if (password === confirmPassword) {
      //reset errors array
      setErrors([]);
      //return dispatch of signup thunk
      return (
        dispatch(
          sessionActions.signup({
            email,
            username,
            password,
            firstName,
            lastName,
          })
        )
          //catch res and or errors
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(Object.values(data.errors));
            }
          })
      );
    } else setErrors(["Password field do not match."])
  };

  return (
    <div className="formContainer">
      <button onClick={() => setShowModal(false)} className="close">
        <i className="fa-duotone fa-x"></i>
      </button>
      <form onSubmit={handleSubmit} className="signIn">
        <h2>Create Account</h2>
        <ul>
          {errors.map((error, idx) => {
          return (
            <li key={idx}>{error}</li>
          )})}
        </ul>
        <label>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
