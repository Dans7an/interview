import Axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

import './card.css';

const Card = ({
  title,
  overview,
  vote_average,
  popularity,
  id,
  poster_path,
}) => {
  const { BACKEND_URL, userData } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [renderToggle, setRenderToggle] = useState(true);
  const history = useHistory();
  const handleLoginButton = () => history.push('/login');
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
          movieTitle: title,
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
    <div className='card'>
      <Link to={`/${id}`}>
        <h1>{title}</h1>
        <h3>{popularity}</h3>
        <h4>Average User Score: {vote_average}</h4>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
        />
        <p>{overview.substring(0, 50) + ' ... click for more '}</p>
      </Link>
      {userData.user ? (
        <LoggedInCardButton
          addFavorite={addFavorite}
          favorites={favorites}
          id={id}
          title={title}
        />
      ) : (
        <LoggedOutCardButton handleLoginButton={handleLoginButton} />
      )}
    </div>
  );
};

export default Card;

function LoggedInCardButton({ favorites, id, addFavorite, title }) {
  return (
    <>
      {favorites.some((fave) => fave.movieId === id.toString()) ? (
        <button className='addFavoriteButton'>Already in favorites</button>
      ) : (
        <button
          className='addFavoriteButton'
          onClick={() => addFavorite(id, title, addFavorite)}
        >
          Add to favorites{' '}
        </button>
      )}
    </>
  );
}
function LoggedOutCardButton({ handleLoginButton }) {
  return (
    <div>
      <button onClick={handleLoginButton} className='addFavoriteButton'>
        Log In to add favorites
      </button>
    </div>
  );
}
