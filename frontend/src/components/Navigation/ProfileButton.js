import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import * as songsActions from '../../store/songs';
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  //set up showMenu state
  const [showMenu, setShowMenu] = useState(false);

  //openMenu Button
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  //run every time you openMenu
  useEffect(() => {
    //if menu is closed, return
    if (!showMenu) return;

    //if menu if open, close it
    const closeMenu = () => {
      setShowMenu(false);
    };

    //add event listener for closeMenu
    document.addEventListener("click", closeMenu);
    //clean up function to remove the event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  const profile = (e) => {
    e.preventDefault();
    dispatch(songsActions.fetchUserSongs(Number(user.id)));
    history.push("/profile");
  };

  return (
    <div id="menuContainer">
      <button className="menuButton" onClick={openMenu}>
        <i id="menu" className="fa-solid fa-ellipsis"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <li>{user.username}</li>
          <li>{user.email}</li> */}
          <li className="profileButtonContainer">
            <button className="profileButton" onClick={profile}>
              Profile
            </button>
          </li>
          <li className="profileButtonContainer">
            <button className="profileButton" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
