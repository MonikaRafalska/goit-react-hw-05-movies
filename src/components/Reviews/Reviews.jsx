import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./Reviews.module.css";

const Review = ({ id, author, content }) => {
  return (
    <li id={id}>
      <h3>Author: {author}</h3>
      <p>`{content}`</p>
    </li>
  );
};

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const API = "48f8099128363ad9da0084b214add4d2";

  const fetchReviews = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchReviews(id);
  }, [id, setReviews]);

  return (
    <>
      <h2 className={styles.reviews_title}>Revievs</h2>
      <ul className={styles.reviews_list}>
        {reviews.length !== 0 ? (
          reviews.map(({ id, author, content }) => (
            <Review key={id} id={id} author={author} content={content} />
          ))
        ) : (
          <p className={styles.reviews_err}>No reviews</p>
        )}
      </ul>
    </>
  );
};

export default Reviews;
