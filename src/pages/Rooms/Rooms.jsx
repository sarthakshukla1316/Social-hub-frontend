import React, { useEffect, useState } from 'react';
import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import RoomCard from '../../components/RoomCard/RoomCard';
import { getAllRooms } from '../../http';
import styles from './Rooms.module.css';

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      // console.log(data);
      setRooms(data);
    }
    fetchRooms();
  }, []);

  const openModal = () => {
    setShowModal(showModal => !showModal);
  }

  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="" />
              <input type="text" onChange={(e) => setSearchInput(e.target.value)} className={styles.searchInput} />
            </div>
          </div>

          <div className={styles.right}>
            <a href="https://codejointly.herokuapp.com" target="_blank" className={styles.startRoomButton1}>Code editor</a>
            <button onClick={openModal} className={styles.startRoomButton}>
              <img src="/images/add-room-icon.png" alt="add Room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {
            searchInput ?
            rooms?.filter(room => room.topic.toLowerCase().includes(searchInput.toLowerCase())).map(room => (
              <RoomCard key={room.id} room={room} />
            )) : rooms?.map(room => (
              <RoomCard key={room.id} room={room} />
            ))
          }
        </div>
      </div>

      {showModal && <AddRoomModal onClose={openModal} />}
    </>
  )
}

export default Rooms