import React from 'react';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
  const navigation = useNavigate();
  const startRegister = () => {
    navigation('/authenticate');
  }

  return (
    <div className={styles.cardWrapper}>

      <Card title="Welcome to Social Hub" icon="logo">
        <p className={styles.text}>Social Hub is a place to speak & listen in fascinating conversations, talk with the world's most amazing people, and make new friends from all walks of life.</p>

        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>

        {/* <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text ? </span>
        </div> */}
      </Card>

    </div>
  )
}

export default Home;