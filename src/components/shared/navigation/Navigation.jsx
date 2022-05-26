import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {NotificationManager} from 'react-notifications'

const Navigation = () => {
  const dispatch = useDispatch();
  const brandStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center'
  };
  const logoText = {
    marginLeft: '10px'
  }

  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
      NotificationManager.success('Logged out successfully !');
    } catch(err) {
      console.log(err);
    }
  }

  const { isAuth, user } = useSelector(state => state.auth);

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to='/' style={brandStyle}>
        <img src="/images/logo.png" alt="Logo" />
        <span style={logoText}>Social Hub</span>
      </Link>

      <div>
        <div className="" id="google_element"></div>
      </div>

      {isAuth && <div className={styles.navRight}>
        <h3>{user?.name}</h3>

        <Link to='/'>
          <img className={styles.avatar} src={user.avatar ? user.avatar : '/images/monkey-avatar.png'} width="40" height="40" alt="avatar" />
        </Link>

        <button onClick={logoutUser} className={styles.logoutButton}>
          <img src="/images/logout.png" alt="" />
        </button>
      </div>}

    </nav>
  );
}

export default Navigation;