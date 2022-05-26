import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';
import {NotificationManager} from 'react-notifications';

const StepAvatar = ({ onNext }) => {
  const [image, setImage] = useState('/images/monkey-avatar.png');
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(state => state.activate);
  const [loading, setLoading] = useState(false);
  // const [unMounted, setUnMounted] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     setUnMounted(true);
  //   }
  // }, []);

  const submit = async () => {
    if(!name || !avatar) return;
    
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if(data.auth) {
        // if(!unMounted) {
          NotificationManager.success('Profile has been created !');
          dispatch(setAuth(data));
        // }
      }
    } catch(err) {
      NotificationManager.error('Something went wrong !!');
      // console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const captureImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    }
  }
  

  if(loading) return <Loader message='Activation in progress...' />

  return (
    <>

      <Card title={`Okay, ${name} !`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's this photo ?</p>

        <div className={styles.avatarWrapper}>
          <img src={image} className={styles.avatarImage} alt="Avatar" />
        </div>

        <div>
          <input onChange={captureImage} type="file" className={styles.avatarInput} id="avatarInput" />
          <label htmlFor="avatarInput" className={styles.avatarLabel}>Choose a different photo</label>
        </div>
        <div>
          <Button text="Next" onClick={submit} />
        </div>

      </Card>

    </>
  )
}

export default StepAvatar