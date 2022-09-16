import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({user}) {
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
  };

  return (
    <div>
      <button onClick={openMenu}>
        <i class="fa-solid fa-bars"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
