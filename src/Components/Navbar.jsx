import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      {/* <span className="logo">Leso Chat</span> */}
      <div className="user">
        <div className="user-info">
          <img
            src={currentUser.photoURL}
            alt=""
          />
          <span>{currentUser.displayName}</span>
        </div>

        <button onClick={() => signOut(auth)}>LogOut</button>
      </div>
    </div>
  );
};
