import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory, Link } from 'react-router-dom';
import './favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { BACKEND_URL, userData } = useContext(UserContext);
  const history = useHistory();
  const [renderToggle, setRenderToggle] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('auth-token');
      const getFavoritesResponse = await Axios.get(`${BACKEND_URL}/favorites`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setFavorites(getFavoritesResponse.data);
    }
    fetchData();
  }, [BACKEND_URL, renderToggle]); // Or [] if effect doesn't need props or state

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  //delete favorite
  const deleteFavorite = async (id) => {
    try {
      const token = localStorage.getItem('auth-token');
      
      await Axios.delete(`${BACKEND_URL}/favorites/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setRenderToggle(!renderToggle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='favorites-page'>
      {favorites.length > 0 ? (
        <>
          <h2>My Favorites</h2>
          <div className='favorites-container'>
            {favorites.map((favorite) => {
              return (
                <div className='favorites-card' key={favorite._id}>
                  <Link to={`/${favorite.movieId}`}>
                    {' '}
                    {favorite.movieTitle}
                  </Link>
                  <button
                    onClick={() => deleteFavorite(favorite._id)}
                    className='delete-button'
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <h2>No favorites selected</h2>
          <p>Go back and pick your favorites!</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
