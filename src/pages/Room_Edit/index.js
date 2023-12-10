import React, { useState, useEffect } from 'react';
import './Room_Add.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import validation from './Room_AddValidation';

function Room_EditForm() {

    let navigate = useNavigate();

    const {id} = useParams()

    const [values, setValues] = useState({
        name: '',
        description: '',
        hotel: '',
        currentPrice: '',
        roomTypeId: '',
        state: '',
        capacity: '',
        ratingAvg: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(()=>{
        loadRoom()
    }, [])

    const loadRoom = async()=>{
        const result = await axios.get(`http://localhost:8080/api/room/${id}`)
        setValues(result.data);
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
        
        let room = { hotel: values.hotel,
                     name : values.name,
                     description: values.description,
                     currentPrice: values.currentPrice,
                     roomTypeId: values.roomTypeId,
                     state: values.state,
                     capacity: values.capacity,
                     ratingAvg: values.ratingAvg
                     };

         console.log('room =>' + JSON.stringify(room));
        
        axios({
          url: `http://localhost:8080/api/room/edit/${id}`,
          method: "PUT",
          data: room,
          headers: {
            "Content-Type" : "application/json"
          } 
        }).then((res)=>{
            console.log("Successfully !")
            navigate("/");
        }).catch(function(err){
          console.log(err + 'handleSubmit');
        })
    }

    return (
        <div className="login_container">
            <div className="login-form">
                <h1>Edit Room #</h1>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className='row g-3'>
                            <div className='col-sm'>
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
                            </div>
                            <div className='col-sm'>
                                <label htmlFor="name">
                                    <b>Name</b>
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

                            <label htmlFor="description">
                                    <b>Description</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Description"
                                    value={values.description}
                                    name="description"
                                    onChange={handleChange}
                                />
                                {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}


                            <label htmlFor="currentPrice">
                                <b>Current Price</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Price"
                                value={values.currentPrice}
                                name="currentPrice"
                                onChange={handleChange}
                            />
                            {errors.currentPrice && <p style={{ color: 'red' }}>{errors.currentPrice}</p>}
                            
                            <div className='row g-3'>
                                <div className='col-sm'>
                                    <label htmlFor="roomTypeId">
                                        <b>Type</b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Type"
                                        value={values.roomTypeId}
                                        name="roomTypeId"
                                        onChange={handleChange}
                                    />
                                    {errors.roomTypeId && <p style={{ color: 'red' }}>{errors.roomTypeId}</p>}
                                </div>
                                <div className='col-sm'>
                                    <label htmlFor="state">
                                        <b>State</b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter State"
                                        value={values.state}
                                        name="state"
                                        onChange={handleChange}
                                    />
                                    {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
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
                                <div className='col-sm'>
                                    <label htmlFor="ratingAvg">
                                        <b>Rating</b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Rating"
                                        value={values.ratingAvg}
                                        name="ratingAvg"
                                        onChange={handleChange}
                                    />
                                    {errors.ratingAvg && <p style={{ color: 'red' }}>{errors.ratingAvg}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Room_EditForm;
