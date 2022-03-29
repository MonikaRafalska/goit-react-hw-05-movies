import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./MovieSearch.module.css";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const query = searchQuery.get("query");
  const API = "48f8099128363ad9da0084b214add4d2";

  const fetchSearchMovies = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const formQuery = form.elements.query.value;
    if (formQuery === "") {
      return;
    } else {
      setSearchQuery({ query: formQuery });
      fetchSearchMovies(query);
    }
    form.reset();
  };

  useEffect(() => {
    if (query === null || query === "") {
      setMovies([]);
      return;
    }
    fetchSearchMovies(query);
  }, [query, setSearchQuery]);

  return (
    <>
    <form onSubmit={onSubmit}>
      <div className={styles.wrap}>
        <input
          placeholder="Movie title"
          type="text"
          name="query"
          className={styles.input}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
        </div>
      </form>
      <ul className={styles.search_list}>
        {movies.map(({ id, original_title }) => (
          <li key={id}>
            <Link className={styles.search_link} to={`/movies/${id}`}>{original_title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieSearch;
