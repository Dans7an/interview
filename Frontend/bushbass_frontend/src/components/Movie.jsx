import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../context/UserContext';

import './movie.css';

function Movie() {
  const { BACKEND_URL } = useContext(UserContext);

  const [currentMovie, setCurrentMovie] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [renderToggle, setRenderToggle] = useState(true);

  let { id } = useParams();
  let connectionString = `https://api.themoviedb.org/3/movie/${id}?api_key=dff2ace9d4fe143fc9aad06522638b5c`;

  useEffect(() => {
    fetch(connectionString)
      .then((response) => response.json())
      .then((data) => setCurrentMovie(data));
  }, [connectionString]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth-token');
      const getAllResponse = await Axios.get(`${BACKEND_URL}/favorites`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setFavorites(getAllResponse.data);
    }
    fetchData();
  }, [BACKEND_URL, renderToggle]); // Or [] if effect doesn't need props or state

  const addFavorite = async (id) => {
    try {
      const token = localStorage.getItem('auth-token');
      const addFavoriteResponse = await Axios.post(
        `${BACKEND_URL}/favorites`,
        {
          movieId: id,
          movieTitle: currentMovie.title,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      console.log(addFavoriteResponse);
      setRenderToggle(!renderToggle);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='single-movie-card-container'>
      <div className='single-movie-card-title'>
        <h2>
          {currentMovie.title} -{' '}
          {currentMovie.release_date
            ? currentMovie.release_date.substring(0, 4)
            : currentMovie.release_date}
        </h2>
      </div>
      <div className='single-movie-main-container'>
        <div>
          <img
            className='single-movie-image'
            src={`https://image.tmdb.org/t/p/w300${currentMovie.poster_path}`}
            alt={currentMovie.title}
          />
        </div>
        <div className='single-movie-overview-container'>
          <p className='single-movie-overview'>{currentMovie.overview}</p>

          {favorites.some(
            (fave) => fave.movieId === currentMovie.id.toString()
          ) ? (
            <button className='addFavoriteButton'>Already in favorites</button>
          ) : (
            <button
              className='addFavoriteButton'
              onClick={() => addFavorite(id, currentMovie.title)}
            >
              Add to favorites{' '}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie;
