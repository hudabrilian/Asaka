import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { AuthContext } from "../utils/context/AuthContext";
import { logoutUser } from "../utils/api";

const Header = () => {
  const navigate = useNavigate();
  const { user, updateUser, updateLoggedIn } = useContext(AuthContext);

  const [navbar, setNavbar] = useState(false);
  const [popup, setPopup] = useState(false);

  return (
    <header className="bg-stone-800 shadow-md text-white py-10 lg:px-32 flex flex-col md:flex-row items-center justify-center md:justify-between sticky top-0 z-20">
      <div className="flex justify-around md:justify-between w-full">
        <Link to="/" className="text-2xl font-bold select-none text-center">
          Asaka
        </Link>
        <button
          className="text-3xl md:hidden"
          onClick={() => setNavbar(!navbar)}
        >
          {!navbar ? <HiMenuAlt3 /> : <HiOutlineX />}
        </button>
      </div>

      <div className="md:flex md:w-full justify-end space-x-10 items-center hidden relative">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!user.discordTag ? (
          <button
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            onClick={() =>
              (window.location.href = "http://localhost:3001/api/auth/discord")
            }
          >
            Login with discord
          </button>
        ) : (
          <div>
            {user.avatar ? (
              <img
                className="rounded-full w-10 hover:outline hover:outline-offset-2 hover:outline-1 hover:outline-stone-600 relative"
                src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                alt={user.discordTag}
                onClick={() => setPopup(!popup)}
              />
            ) : (
              <div className="px-4 py-2 rounded-full border border-stone-600">
                {user.discordTag.charAt(0)}
              </div>
            )}

            {popup && (
              <div className="absolute mt-5 bg-stone-700 rounded-xl right-0 flex flex-col space-y-2 text-sm">
                <button
                  className="hover:bg-stone-600 px-7 py-2 rounded-xl"
                  onClick={() => {
                    navigate("/dashboard");
                    setPopup(false);
                  }}
                >
                  My Servers
                </button>
                <button
                  className="hover:bg-stone-600 px-7 py-2 rounded-xl"
                  onClick={async () => {
                    await logoutUser();
                    updateUser({});
                    updateLoggedIn(false);
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
          // <button
          //   className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          //   onClick={() => navigate("/dashboard")}
          // >
          //   Logged in as {user.discordTag}
          // </button>
        )}
      </div>

      {/* Mobile */}
      {navbar && (
        <div className="md:hidden flex flex-col space-y-4 mt-10 text-center items-center justify-center">
          <Link to="/" className="text-xl py-3">
            Home
          </Link>
          <Link to="/about" className="text-xl py-3">
            About
          </Link>
          {!user.discordTag ? (
            <button
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              onClick={() =>
                (window.location.href =
                  "http://localhost:3001/api/auth/discord")
              }
            >
              Login with discord
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              onClick={() => navigate("/dashboard")}
            >
              Logged in as {user.discordTag}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
