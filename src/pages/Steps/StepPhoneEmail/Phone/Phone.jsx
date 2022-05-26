import React, { useEffect, useState } from 'react';
import Button from '../../../../components/shared/Button/Button';
import Card from '../../../../components/shared/Card/Card';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import { sendOtp } from '../../../../http';
import styles from '../StepPhoneEmail.module.css';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';
import { NotificationManager } from 'react-notifications';
import ReactFlagsSelect from "react-flags-select";
import { CountryCodes } from '../../../../countrycode';

const codes = [];


const Phone = ({ onNext }) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    CountryCodes.map(country => {
      codes[country.code] = country.dial_code;
    })
  }, []);

  const submit = async () => {
    if(!countryCode) {
      NotificationManager.error('Please Enter Country code !');
      return;
    };
    const code = codes[countryCode];
    if(!code) {
      NotificationManager.error('Please Enter Valid Country code !');
      return;
    };
    if(!phoneNumber) {
      NotificationManager.error('Please Enter Phone Number !');
      return;
    };
    try {
      const { data } = await sendOtp({ phone: phoneNumber, code });
      NotificationManager.success('OTP has been sent on phone number !');
      // console.log(data);
      if(data.message === 'Otp Sending failed') {
        NotificationManager.error('Invalid phone number');
        return;
      }
      dispatch(setOtp({ phone: data.phone, hash: data.hash }));
      onNext();
    } catch(err) {
      NotificationManager.error('Invalid phone number !!');
      // console.log(err);
    }
    
  }

  const changeCode = (country) => {
    setCountryCode(country);
    console.log(country);
  }

  return (
    <Card title="Enter your phone number" icon="phone">
        
        <div className={styles.codeWrapper}>

          <ReactFlagsSelect className={styles.codeBox}
            selected={countryCode}
            onSelect={(country) => changeCode(country)}
            searchable
            searchPlaceholder='search...'
            placeholder='Select country code'
          />
          <TextInput value={phoneNumber} type="text" onChange={(e) => setphoneNumber(e.target.value)} />
        </div>
        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
          </div>
          <p className={styles.buttonParagraph}>By entering your number, you'are agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
        </div>

    </Card>
  )
}

export default Phone;