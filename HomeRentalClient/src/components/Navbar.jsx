import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { setLogout } from "../redux/state";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const pinkred = getComputedStyle(document.documentElement)
    .getPropertyValue("--pinkred")
    .trim();
  const darkgrey = getComputedStyle(document.documentElement)
    .getPropertyValue("--darkgrey")
    .trim();

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/homelogo8.png" alt="logo" />
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <IconButton  disabled={search === ""} >
          <Search sx={{ color: pinkred }} onClick={() => {navigate(`/properties/search/${search}`)}} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: darkgrey }} />
          {!user ? (
            <Person sx={{ color: darkgrey }} />
          ) : (
            <img
              src={`https://homyrentalserver2.onrender.com/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Login</Link>
            <Link to="/register">SignUp</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              LogOut
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
