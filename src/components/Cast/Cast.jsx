import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Cast.module.css";

const CastItem = ({ id, character, name, profile_path }) => {
  return (
    <li key={id}>
      {profile_path !== null ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${profile_path}`}
          alt={name}
          className={styles.cast_img}
        />
      ) : (
        <img
          src={`https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`}
          alt={name}
          className={styles.cast_img}
        />
      )}
      <h3 className={styles.cast_name}>{name}</h3>
      <p className={styles.cast_character}>Character: {character}</p>
    </li>
  );
};

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const API = "48f8099128363ad9da0084b214add4d2";
  const fetchCast = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API}`)
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCast(id);
  }, [id, setCast]);

  return (
    <>
      <h2 className={styles.cast_title}>Cast</h2>
      <ul className={styles.cast_list}>
        {cast !== null
          ? cast.map(({ id, character, name, profile_path }) => (
              <CastItem
                key={id}
                id={id}
                character={character}
                name={name}
                profile_path={profile_path}
              />
            ))
          : `Sorry, no cast here`}
      </ul>
    </>
  );
};

export default Cast;
