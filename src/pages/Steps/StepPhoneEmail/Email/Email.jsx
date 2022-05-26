import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/shared/Button/Button';
import Card from '../../../../components/shared/Card/Card';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import { sendOtpEmail } from '../../../../http';
import { setOtp } from '../../../../store/authSlice';
import styles from '../StepPhoneEmail.module.css';
import {NotificationManager} from 'react-notifications'


const Email = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const submit = async () => {

    if(!email) {
      NotificationManager.error('Please Enter Email address !');
      return;
    };
    try {
      const { data } = await sendOtpEmail({ email });
      NotificationManager.success('OTP has been sent on your email !');
      // console.log(data);
      if(!data) {
        NotificationManager.error('Invalid email address !');
        return;
      };
      dispatch(setOtp({ email: data.email, hash: data.hash }));
      onNext();
    } catch(err) {
      NotificationManager.error('Something went wrong !!');
      // console.log(err);
    }
    
  }

  return (
    <Card title="Enter your Email Address" icon="email-emoji">
        
        <TextInput value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
        <div>
          <div className={styles.actionButtonWrap}>
              <Button text="Next" onClick={submit} />
          </div>
            <p className={styles.buttonParagraph}>By entering your email, you'are agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
        </div>

    </Card>
  )
}

export default Email;