import "../../flow/config.js";
import { useEffect } from "react";

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
      <p>Logged in as {user.addr}</p>
      <button onClick={handleAuthentication}>
        {user.loggedIn ? "Log Out" : "Log In"}
      </button>
    </nav>
  );
};

export default Navbar;
