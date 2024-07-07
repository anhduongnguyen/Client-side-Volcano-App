import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import signOut from "./SignOut";

const notifySignOut = () => {
  toast.success("Logging out...");
};

const handleSignOut = () => {
  signOut();
  notifySignOut();
};

// navigation links depending on whether the user is logged in or out
export default function Navigation() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/volcanolist">Volcanoes List</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Button className="logout-button" color="danger" onClick={handleSignOut}>
              Log Out
            </Button>
            <ToastContainer />
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
