import React, { useEffect, useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import styles from './Room.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteRoom, getRoom } from '../../http';
import {NotificationManager} from 'react-notifications';
 
const Room = () => {
  const [room, setRoom] = useState('');
  const [isMute, setIsMute] = useState(null);
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const user = useSelector(state => state.auth.user);
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  const handleManualLeave = () => {
    navigate('/rooms');
  }

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom((prev) => data);
    }

    fetchRoom();
  }, [roomId]);

  const handleMuteClick = (clientId) => {
    if(clientId !== user.id) return;
    setIsMute((isMute) => !isMute);
  }

  const deleteThis = async () => {
    try {
        await deleteRoom(roomId);
        NotificationManager.success('Room deleted successfully !');
        navigate('/rooms');
    } catch(err) {
       NotificationManager.success('Something went wrong !');
    }
  }

  return (
    <div>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt="arrow left" />
          <span>All voice rooms</span>
        </button>
      </div>

      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room?.topic}</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm" />
            </button>
            <div className={styles.deleteBox}>
              {user.id === room?.ownerId && <i onClick={deleteThis} className={`${styles.deleteRoom} fa-solid fa-trash-can`}></i>}
            </div>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>
          
        <div className={styles.clientsList}>
          {
            Array.from(new Set(clients.map(a => a.id))).map(id => (
              clients.find(a => a.id === id)))
              .map((client) => (
              <div key={client.id} className={styles.client}>

                <div className={styles.userHead}>
                  <audio ref={(instance) => provideRef(instance, client.id)} 
                  autoPlay></audio>
                  <img src={client.avatar} className={styles.userAvatar} alt="" />

                  <button onClick={() => handleMuteClick(client.id)} className={styles.micBtn}>
                    {
                      client.muted ? <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                      : <img src="/images/mic.png" alt="mic-icon" />
                    }
                  </button>
                </div>
                <h4>{client.name}</h4>

              </div>
            ))
          }
        </div>

        <div>

        </div>
      </div>
    </div>
  )
}

export default Room