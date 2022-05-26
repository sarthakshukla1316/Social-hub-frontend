import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import { verifyOtp, verifyOtpEmail } from '../../../http';
import styles from './StepOtp.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';
import {NotificationManager} from 'react-notifications'
import OtpTimer from 'otp-timer';
import { useNavigate } from 'react-router-dom';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate('/');
  const { phone, email, hash } = useSelector((state) => state.auth.otp);

  const submit = async () => {
    
    if(!otp || (!phone && !email) || !hash) {
      NotificationManager.error('Please Enter Otp !');
      return;
    };

    if(phone) {
      setLoading(true);
      try {
        const { data } = await verifyOtp({ otp, phone, hash });
        // console.log(data);
        NotificationManager.success('OTP has been verified !!');
        dispatch(setAuth(data));
        
      } catch(err) {
        NotificationManager.error('Invalid OTP !!');
        // console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    else if(email) {
      setLoading(true);
      try {
        const { data } = await verifyOtpEmail({ otp, email, hash });
        // console.log(data);
        NotificationManager.success('OTP has been verified !!');
        dispatch(setAuth(data));
        
      } catch(err) {
        NotificationManager.error('Invalid OTP !!');
        // console.log(err);
      } finally {
        setLoading(false);
      }
    } 
    
  }

  const ResendOtp = () => {
    navigate('/');
  }

  if(loading) return <Loader message='Verifying Otp...' />
  return (
    <>

      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">

          <TextInput value={otp} type="text" onChange={(e) => setOtp(e.target.value)} />

          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
          </div>

          <div className={styles.timer}>
            <OtpTimer className={styles.timer}
                seconds={0} minutes={2} resend={ResendOtp} 
                textColor={"#ff0000"} background={"#20bd5f"} text="Otp will expire in " ButtonText="Try again"
              />
          </div>

          <p className={styles.buttonParagraph}>By entering your number, you'are agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
        </Card>
      </div>

    </>
  )
}

export default StepOtp