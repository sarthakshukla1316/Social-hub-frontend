import React, { useState } from 'react';
import TextInput from '../shared/TextInput/TextInput';
import styles from './AddRoomModal.module.css';
import { createRoom as create } from '../../http';
import { useNavigate } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

const AddRoomModal = ({ onClose }) => {
    const [roomType, setRoomType] = useState('open');
    const [topic, setTopic] = useState('');
    const navigate = useNavigate();

    const createRoom = async () => {
        if(!topic) {
            NotificationManager.error('Enter topic of room !');
            return;
        }
        try {
            const { data } = await create({ roomType, topic });
            // console.log(data);
            if(data) {
                NotificationManager.success('Room created successfully !');
                navigate(`/room/${data.id}`);
            }
        } catch(err) {
            NotificationManager.error('Something went wrong !');
            // console.log(err);
        }
    }

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalBody}>

                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="" />
                </button>

                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>Enter the topic to be discussed</h3>
                    <TextInput value={topic} onChange={(e) => setTopic(e.target.value)} type="text" fullWidth="true" />

                    <h2 className={styles.subHeading}>Room Types</h2>

                    <div className={styles.roomTypes}>

                        <div onClick={() => setRoomType('open')} className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ''}`}>
                            <img src="/images/globe.png" alt="" />
                            <span>Open</span>
                        </div>
                        <div onClick={() => setRoomType('social')} className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ''}`}>
                            <img src="/images/social.png" alt="" />
                            <span>Social</span>
                        </div>
                        <div onClick={() => setRoomType('private')} className={`${styles.typeBox} ${roomType === 'private' ? styles.active : ''}`}>
                            <img src="/images/lock.png" alt="" />
                            <span>Private</span>
                        </div>

                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <h2>Start a room, open to everyone</h2>
                    <button onClick={createRoom} className={styles.footerButton}>
                        <img src="/images/celebration.png" alt="Celebration" />
                        <span>Let's go</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddRoomModal