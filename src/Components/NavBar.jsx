import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInput)
    window.location.href=`/search/${userInput}`
  }

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="text-4xl font-bold text-white mr-6">
              Album & EP Discussion Board
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <form
               onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Search comments by title"
                  onChange={(e) => setUserInput(e.target.value)}
                  className="px-2 py-1 text-sm placeholder-gray-400"
                  style={{ width: '12rem' }}
                />
              </form>
            </li>
            <li key="home-button">
              <Link
                to="/"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-md font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search-artist"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-md  font-medium"
              >
                Add Album
              </Link>
            </li>
            <li>
              <Link
                to="/comments"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-md font-medium"
              >
                View Comments
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-white text-black hover:bg-green-400 hover:text-white px-4 py-2 rounded-full text-md  font-medium"
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
