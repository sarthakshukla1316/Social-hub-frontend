import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from './StepName.module.css';
import { setName } from '../../../store/activateSlice'

const StepName = ({ onNext }) => {
  const { name } = useSelector(state => state.activate);
  const [fullName, setFullName] = useState(name);
  const dispatch = useDispatch();
  
  const nextStep = () => {
    if(!fullName) {
      return;
    }
    dispatch(setName(fullName));
    onNext();
  }
  
  return (
    <>

      <Card title="What's your full name ?" icon="goggle-emoji">
        <TextInput value={fullName} type="text" onChange={(e) => setFullName(e.target.value)} />

        <p className={styles.paragraph}>People use real names at Social Hub :) !</p>

        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={nextStep} />
        </div>

      </Card>
    
    </>
  )
}

export default StepName