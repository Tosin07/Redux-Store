import React from "react";
import Cart from "./Cart";
import "./Header.css";
import {authActions} from '../store/auth-slice'
import { useDispatch } from "react-redux";
const Header = () => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(authActions.logout())
  } 
  return (
    <header>
      <nav className="header-nav">
        <ul className="header-ul">
          <li>
            <h2
              className="header-h2"
              style={{ fontFamily: "monospace", fontSize: "30px" }}
            >
              Redux Shopping App
            </h2>
          </li>
          <li>
            <Cart />
          </li>
          <button onClick={logout} className="logout-btn">Logout</button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
