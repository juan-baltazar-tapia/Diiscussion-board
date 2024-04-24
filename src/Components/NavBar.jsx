import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white mr-6">
              Album & EP Discussion Board
            </Link>
          </div>
          <ul className="flex space-x-8">
            <li key="home-button">
              <Link
                to="/"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search-artist"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Add Album
              </Link>
            </li>
            <li>
              <Link
                to="/comments"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                View Comments
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-white text-black hover:bg-green-400 hover:text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;