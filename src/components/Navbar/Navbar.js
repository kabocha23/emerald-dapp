import "../../flow/config.js";
import React, { useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ fcl, user, setUser }) => {
  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);

  const handleAuthentication = () => {
    if (user.loggedIn) {
      fcl.unauthenticate();
    } else {
      fcl.authenticate();
    }
  };

  return (
    <nav className="nav">
      <h1>Emerald DApp</h1>
      {user.loggedIn ? (
        <React.Fragment>
          <p>Logged in as {user.addr}</p>
          <button onClick={handleAuthentication}>Log Out</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button onClick={handleAuthentication}>Log In</button>
        </React.Fragment>
      )}
    </nav>
  );
};

export default Navbar;
