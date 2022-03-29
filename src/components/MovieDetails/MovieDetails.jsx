import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MovieDetails.module.css";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const API = "48f8099128363ad9da0084b214add4d2";

  const fetchApi = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    fetchApi(id);
  }, [id, setMovie]);

  const {
    original_title,
    poster_path,
    vote_average,
    overview,
    genres,
  } = movie;

  return (
    <>
      <button className={styles.button} onClick={goBack}>
        ← back
      </button>
      {poster_path !== null ? (
        <img
          src={
            poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : ""}
          alt="poster"
          className={styles.img}
        />
      ) : (
        <img
          src={`https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`}
          alt="poster"
        />
      )}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{original_title}</h2>
        <p>User Score: {vote_average}</p>
        <h3 className={styles.overview_title}>Overview:</h3>
        <p className={styles.overview}>{overview}</p>
        <h4 className={styles.genres_title}>Genres: </h4>
        <ul className={styles.genres_list}>
          {genres !== undefined ? (
            genres.map(({ id, name }) => <li key={id}> {name}</li>)
          ) : (
            <p className={styles.genres_err}>`no genres`</p>
          )}
        </ul>
      </div>
      <ul className={styles.description_list}>
        <li>
          <Link className={styles.description_link} to={`/movies/${id}/cast`}>
            Cast
          </Link>
        </li>
        <li>
          <Link
            className={styles.description_link}
            to={`/movies/${id}/reviews`}>
            Reviews
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MovieDetailsPage;
