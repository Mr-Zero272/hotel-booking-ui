import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import styles from './CreatePost.module.scss';
function CreatePost() {
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    const [imageUpload, setImageUpload] = useState(null);
    const inputRef = useRef(null);
    const [saveImagePost, setSaveImagePost] = useState(false);
    const [postValue, setPostValue] = useState({
        hotelId: '',
        title: '',
        description: '',
        idroomDto: '',
        discount: '',
    });
    const [rooms, setRooms] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [availableRooms, setAvailableRooms] = useState([]);
    // const [roomImageUpload, setRoomImageUpload] = useState(null);
    const [startTime, setStartTime] = useState(getTodayDate());
    const [endTime, setEndTime] = useState(getTodayDate());
    useEffect(() => {
        fetchHotelData();
    }, []);

    const IsValidDate = (date) => {
        const today = new Date();
        return date instanceof Date && !isNaN(date) && date >= today;
    };
    const fetchHotelData = async () => {
        try {
            const hotelResponse = await axios.get('http://localhost:8082/api/post/listHotel');

            setHotels(hotelResponse.data);
        } catch (error) {
            console.error('Error fetching data', error.message);
        }
    };
    const fetchRoomData = async () => {
        try {
            console.log(postValue.hotelId);
            const roomResponse = await axios.get(`http://localhost:8082/api/post/roomhotel/${postValue.hotelId}`);
            setAvailableRooms(roomResponse.data);
        } catch (error) {
            console.log('Error fetching data', error.message);
        }
    };

    useEffect(() => {
        fetchRoomData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postValue.hotelId]);

    const handleReview = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = { preview: e.target.result };
                setImageUpload(imageData);
            };
            reader.readAsDataURL(file);
            setSaveImagePost(true);
        }
    };

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', inputRef.current.files[0]);

            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image', error.message);
            alert('Error uploading image');
        }
    };

    const handleSelectStartDate = (e) => {
        const selectStartDay = new Date(e.target.value);
        if (IsValidDate(selectStartDay)) {
            //  setPostValue((preValue) => ({ ...preValue, start_time: format(selectStartDay, 'yyyy/MM/dd') }));
            setStartTime(selectStartDay.toISOString().split('T')[0]);
        } else {
            alert('Set start time error');
        }
    };
    // console.log(postValue);
    const handleSelectEndDate = (e) => {
        const selectStartDay = new Date(e.target.value);
        if (IsValidDate(selectStartDay) && selectStartDay >= new Date(startTime)) {
            //setPostValue((postValue.end_time = selectStartDay));
            setEndTime(selectStartDay.toISOString().split('T')[0]);
        } else {
            alert('set end time error');
        }
    };
    const handleChangeInput = (e, fieldName) => {
        const { value } = e.target;
        console.log(`Updating ${fieldName} to ${value}`);
        setPostValue((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const handleAddRoom = () => {
        // console.log('selecttec room', postValue.hotelId);
        // console.log('selecttec room', postValue.description);
        // console.log('selecttec room', postValue.title);
        // console.log('selecttec room', postValue.roomNameDto);

        if (
            postValue.hotelId &&
            postValue.title &&
            postValue.description &&
            postValue.idroomDto &&
            postValue.discount &&
            startTime &&
            endTime
        ) {
            const selectedRoom = availableRooms.find((room) => (room.idroomDto = postValue.idroomDto));
            // console.log('selecttec room', selectedRoom);
            if (selectedRoom) {
                // console.log('selecttec room', selectedRoom);
                const newRoom = {
                    idroomDto: selectedRoom.idroomDto,
                    roomName: selectedRoom.roomNameDto,
                };

                setRooms((prevalue) => [...prevalue, newRoom]);
                // console.log('selecttec room', selectedRoom.idroomDto);
                setPostValue((prevValues) => ({
                    ...prevValues,
                    idroomDto: '', // Updated property to idroomDto
                }));
            }
        }
    };

    const handleSave = async () => {
        if (postValue.title.length < 7) {
            alert('Title must be at least 7 characters long.');
        }
        if (postValue.description.length < 15) {
            alert('Title must be at least 15 characters long.');
        }
        console.log('Fetch data', {
            hotelId: postValue.hotelId,
            title: postValue.title,
            description: postValue.description,
            discount: postValue.discount,
            end_time: startTime,
            start_time: endTime,
            roomId: rooms.map((room) => room.idroomDto),
        });
        try {
            const requestData = {
                hotelId: postValue.hotelId,
                title: postValue.title,
                description: postValue.description,
                discount: postValue.discount,
                end_time: endTime,
                start_time: startTime,
                roomId: rooms.map((room) => room.idroomDto),
            };
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8082/api/post/createPost', requestData, {
                headers: { Authorization: 'Bearer ' + token },
            });
            alert(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error creating post', error.message);
            alert('Error creating post');
        }
    };

    return (
        <div>
            <div>
                <div className={styles.cratePostHeader}>
                    {imageUpload ? (
                        <img className={styles.postImage} src={imageUpload.preview} alt="ImagePost" />
                    ) : (
                        <img className={styles.postImage} src={postValue.roomImage} alt="ImagePost" />
                    )}
                    <div>
                        <button className={styles.btn1} onClick={handleButtonClick}>
                            {saveImagePost ? 'Change' : 'Upload'}
                        </button>
                        <button className={saveImagePost ? styles.btn1 : styles.hiddenSave} onClick={handleUpload}>
                            Save
                        </button>
                    </div>
                </div>
                <input type="file" ref={inputRef} onChange={handleReview} style={{ display: 'none' }} />
                <div className={styles.cratePostBody}>
                    <div>
                        <label>Hotel Name</label>
                        <select
                            className={styles.cratePostBodyInput}
                            value={postValue.hotelId}
                            onChange={(e) => handleChangeInput(e, 'hotelId')}
                        >
                            <option value="" disabled>
                                Select a hotel
                            </option>
                            {hotels.map((hotel, index) => (
                                <option key={index} value={hotel.idDto}>
                                    {hotel.hotelName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Title</label>
                        <input
                            className={styles.cratePostBodyInput}
                            type="text"
                            value={postValue.title}
                            onChange={(e) => handleChangeInput(e, 'title')}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            className={styles.cratePostBodyInput}
                            value={postValue.description}
                            onChange={(e) => handleChangeInput(e, 'description')}
                        />
                    </div>
                    <div>
                        <label>Discount</label>
                        <input
                            type="number"
                            min={0.1}
                            step={0.1}
                            max={1}
                            className={styles.cratePostBodyInput}
                            value={postValue.discount}
                            onChange={(e) => handleChangeInput(e, 'discount')}
                        />
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input
                            type="date"
                            className={styles.cratePostBodyInput}
                            value={startTime}
                            min={getTodayDate()}
                            onChange={handleSelectStartDate}
                        />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input
                            type="date"
                            className={styles.cratePostBodyInput}
                            value={endTime}
                            min={startTime}
                            onChange={handleSelectEndDate}
                        />
                    </div>

                    {postValue.hotelId && postValue.title && postValue.description && (
                        <>
                            <div>
                                <label>Room</label>
                                <select
                                    className={styles.cratePostBodyInput}
                                    value={postValue.idroomDto}
                                    onChange={(e) => handleChangeInput(e, 'idroomDto')}
                                >
                                    <option value="" disabled>
                                        Select a room
                                    </option>
                                    {availableRooms.map((room, index) => (
                                        <option key={index} value={room.idroomDto}>
                                            {room.roomNameDto}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleAddRoom}>Add Room</button>
                        </>
                    )}

                    {rooms.length > 0 && (
                        <div>
                            <h3>Rooms:</h3>
                            <ul>
                                {rooms.map((room, index) => (
                                    <li key={index} className={styles.inFoRoom}>
                                        <p>Room Name: {room.idroomDto}</p>
                                        <p>Room Name: {room.roomName}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className={styles.cratePostFooter}>
                    <button onClick={handleSave}>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
