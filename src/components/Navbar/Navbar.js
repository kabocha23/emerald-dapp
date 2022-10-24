import * as fcl from "@onflow/fcl";
import "../../flow/config.js";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState({ loggedIn: false });

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
      <button onClick={handleAuthentication}>
        {user.loggedIn ? user.addr : "Log In"}
      </button>
    </nav>
  );
};

export default Navbar;
