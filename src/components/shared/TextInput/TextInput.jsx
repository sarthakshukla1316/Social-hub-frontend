import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({ type, fullWidth, ...props}) => {
  return (
    <input className={styles.input} style={{ width: fullWidth === 'true' ? '100%' : '' }} type={type} {...props} />
  )
}

export default TextInput;