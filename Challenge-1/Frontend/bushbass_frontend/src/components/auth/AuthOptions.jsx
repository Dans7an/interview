import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <>
      {userData.user ? (
        <>
          <Link to='/'>Home</Link>
          
          <Link to='/Search'>Search</Link>

          <Link to='/favorites'>Favorites</Link>
          <Link to='/' onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to='/'>Home</Link>

          <Link to='/Search'>Search</Link>

          <Link to='/register'>Register</Link>

          <Link to='/login'>Login</Link>
        </>
      )}
    </>
  );
}

export default AuthOptions;
