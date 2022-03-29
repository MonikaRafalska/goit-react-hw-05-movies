import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const MovieItem = ({ id, title }) => {
  return (
    <li className={styles.home_item} key={id}>
      <Link className={styles.home_link} to={`/movies/${id}`}>
        {title}
      </Link>
    </li>
  );
};

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const API = "48f8099128363ad9da0084b214add4d2";

  async function fetchApi() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API}`
      );
      if (!response.ok) {
        setLoaded(false);
        throw new Error(response.status);
      } else {
        return response.json();
      }
    } catch (err) {
      setLoaded(false);
      return console.log(err);
    }
  }
  function renderMovies() {
    fetchApi()
      .then((response) => {
        setMovies(response);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!isLoaded) {
      renderMovies();
    } 
  });
  return (
    <>
      <h2 className={styles.home_title}>Top Trending Movies</h2>
      <ul className={styles.home_list}>
        {isLoaded === false ? (
          <p>ERROR</p>
        ) : (
          movies.results.map(({ id, original_title }) => (
            <MovieItem key={id} id={id} title={original_title} />
          ))
        )}
      </ul>
    </>
  );
};

export default HomePage;
