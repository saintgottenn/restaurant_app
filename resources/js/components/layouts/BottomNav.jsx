import React from "react";
import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";

const Home = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <nav className={styles.bottomNav}>
        <Link to="/" className="nav-item">
          <img src="./img/icon_house.png" alt="" />
        </Link>
        <Link to="/favorites" className="nav-item">
          <img src="./img/icon_heart.png" alt="" />
        </Link>
        <Link to="/add" className="nav-item">
          <img src="./img/icon_plus.png" alt="" />
        </Link>
        <Link to="/settings" className="nav-item">
          <img src="./img/icon_gear.png" alt="" />
        </Link>
      </nav>
    </React.Fragment>
  );
};

export default Home;
