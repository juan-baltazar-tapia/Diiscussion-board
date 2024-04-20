import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li className="home-link" key="home-button">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addalbum">Add new album</Link>
          </li>
          {/* <li>
            <Link to="/login">Login</Link>
          </li> */}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
