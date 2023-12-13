import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import validation from './Room_AddValidation';

function Room_EditForm() {

    let navigate = useNavigate();

    const {id} = useParams()

    const [values, setValues] = useState({
        hotel_id: '',
        id: '',
        name: '',
        description: '',
        hotel: '',
        currentPrice: '',
        roomType: '',
        state: '',
        capacity: '',
        ratingAvg: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(()=>{
        loadRoom()
    }, [])

    const loadRoom = async()=>{
        const result = await axios.get(`http://localhost:8082/api/room/room-id/${id}`)
        setValues(result.data);
        console.log(result.data);
    }

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        if (Object.keys(validation(values)).length === 0) {
            alert('Form Submitted successfully');
        }
        
        let room = { name : values.name,
                     description: values.description,
                     currentPrice: values.currentPrice,
                     roomType: values.roomType,
                     state : values.state,
                     capacity: values.capacity,
                     ratingAvg: values.ratingAvg
                     };

         console.log('room =>' + JSON.stringify(room));
        
        axios({
          url: `http://localhost:8082/api/room/edit/${id}`,
          method: "PUT",
          data: room,
          headers: {
            "Content-Type" : "application/json"
          } 
        }).then((res)=>{
            console.log("Successfully !")
            navigate("/room-list/" + values.hotel_id);
        }).catch(function(err){
          console.log(err + 'handleSubmit');
        })
    }

    return (
        <div className="addroom_container">
            <div className="addroom_form">
                <h1>Chỉnh Sửa Thông Tin Phòng</h1>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className='row g-3'>
                            {/* <div className='col-sm'>
                                <label htmlFor="hotel">
                                    <b>Hotel</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Hotel ID"
                                    value={values.hotel.id}
                                    name="hotel"
                                    onChange={handleChange}
                                />
                                {errors.hotel && <p style={{ color: 'red' }}>{errors.hotel}</p>}
                            </div> */}
                            <div className='col-sm'>
                                <label htmlFor="name">
                                    <b>Tên Phòng</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={values.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                            </div>

                            <div className='col-sm'>
                                <label htmlFor="currentPrice">
                                    <b>Giá</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Price"
                                    value={values.currentPrice}
                                    name="currentPrice"
                                    onChange={handleChange}
                                />
                                {errors.currentPrice && <p style={{ color: 'red' }}>{errors.currentPrice}</p>}
                            </div>

                            <label htmlFor="description">
                                    <b>Mô Tả</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Description"
                                    value={values.description}
                                    name="description"
                                    onChange={handleChange}
                                />
                                {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
                            
                            <div className='row g-3'>
                                <div className='col-sm'>
                                    <label htmlFor="roomTypeId">
                                        <b>Loại</b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Type"
                                        value={values.roomType}
                                        name="roomType"
                                        onChange={handleChange}
                                    />
                                    {errors.roomTypeId && <p style={{ color: 'red' }}>{errors.roomTypeId}</p>}
                                </div>
                            </div>

                            <div className='row g-3'>
                                <div className='col-sm'>
                                    <label htmlFor="capacity">
                                        <b>Capacity</b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Capacity"
                                        value={values.capacity}
                                        name="capacity"
                                        onChange={handleChange}
                                    />
                                    {errors.capacity && <p style={{ color: 'red' }}>{errors.capacity}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <button type="submit">XÁC NHẬN</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Room_EditForm;
