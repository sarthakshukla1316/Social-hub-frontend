import React from 'react';
import styles from './RoomCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {NotificationManager} from 'react-notifications'

const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const openRoom = () => {
        if(room.roomType === 'private') {
            if(user.id === room.ownerId.id) {
                navigate(`/room/${room.id}`)
            } else {
                NotificationManager.info('This is a private room. You cannot enter this room !');
                return;
            }
        } else {
            navigate(`/room/${room.id}`);
        }
    }

    return (
        <div onClick={openRoom} className={styles.card}>
            <h3 className={styles.topic}>{room.topic}</h3>
            <div className={`${styles.speakers} ${room.speakers.length === 1 ? styles.singleSpeaker : ''}`}>
                <div className={styles.avatars}>
                    {room.speakers.map(speaker => (
                        <img key={speaker.id} src={speaker.avatar} alt="" />
                    ))}
                </div>
                <div className={styles.names}>
                    {room.speakers.map(speaker => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                            <img src="/images/chat-bubble.png" alt="chat" />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.peopleCount}>
                <span>{room.roomType}</span>
                
            </div>
        </div>
    )
}

export default RoomCard