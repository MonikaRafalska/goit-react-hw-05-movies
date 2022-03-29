import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <ul className={styles.navigation_list}>
      <li>
        <Link className={styles.navigation_link} to={"/"}>
          Home
        </Link>
      </li>
      <li>
        <Link className={styles.navigation_link} to={"/movies"}>
          Movies
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
