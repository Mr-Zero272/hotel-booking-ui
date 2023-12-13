import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import validation from './Room_AddValidation';
import './Room_Add.scss';

function Room_AddForm() {

    let navigate = useNavigate();

    const [values, setValues] = useState({
        hotel: '',
        name: '',
        description: '',
        hotel: '',
        currentPrice: '',
        roomType: '',
        state: '',
        capacity: '',
        ratingAvg: '',
    });

    const options = [
        {label: "NORMAL", value : 1},
        {label: "VIP", value : 2},
    ]

    const [ uti, setUti] = useState([]);

    useEffect(()=>{
        getAllUti()
    }, [])

    const getAllUti = ()=>{
        axios({
          url: "http://localhost:8082/api/utilities/list",
          method: "GET"
        }).then((res)=>{
          setUti(res.data)
          console.log(res.data);
        }).catch(function(err){
          console.log(err + 'getAllRoom');
        })
    }

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const [util, setUtil] = useState([
        {
            id:'',
            name:'',
        }
    ]);

    const addToUti = (name) =>{
        setUtil((utilities) =>{
            return [...utilities, name];
        })
    }

    const removeFromUtil = (name)=>{
        setUtil((utilities) => {
            const result = [...utilities];
            result.splice(
                utilities.indexOf(name),
                1
            )
            return result;
        })
    }

    //console.log(util);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validation(values));
        if (Object.keys(validation(values)).length === 0) {
            alert('Form Submitted successfully');
        

            let hotell = {
                hotel_id : values.hotel
            }
            
            let room = {hotel : values.hotel,
                        name : values.name,
                        description: values.description,
                        currentPrice: values.currentPrice,
                        roomType: values.roomType,
                        state: 0,
                        capacity: values.capacity,
                        ratingAvg: 0,
                        utilities: util,
                        };

            console.log('room =>' + JSON.stringify(room));
            
            axios({
            url: "http://localhost:8082/api/room/add/" + values.hotel,
            method: "POST",
            data: room,
            headers: {
                "Content-Type" : "application/json"
            } 
            }).then((res)=>{
                console.log("Successfully !")
                navigate("/room-list/" + values.hotel);
            }).catch(function(err){
            console.log(err + 'handleSubmit');
            })
        }
    }

    return (
        <div className="addroom_container">
            <div className="addroom_form">
                <div className='row g-3'>
                    <div className='col-6'>
                        <h1>Thêm Phòng</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="container">
                                <div className='row g-3'>
                                    <div className='col-sm'>
                                        <label htmlFor="hotel">
                                            <b>Khách Sạn</b>
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
                                            <b>Tên phòng</b>
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
                                        <b>Mô tả</b>
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

                                            {errors.roomType && <p style={{ color: 'red' }}>{errors.roomType}</p>}
                                        </div>
                                        <div className='col-sm'>
                                            <label htmlFor="capacity">
                                                <b>Diện tích</b>
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
                                <button type="submit">THÊM  </button>
                            </div>
                        </form>
                    </div>

                    <div className='col-6'>
                    {uti.map((name) =>{
                        if(util.includes(name)) return null;
                        return <li key={name.id} className='list-group-item justify-content-between align-items-center'>
                            <button onClick={()=> addToUti(name)} className='btn btn-sm btn-success'>
                            {name.name}
                            </button>
                        </li>
                        }
                    )}
                    </div>

                    <div className='col-6'>
                    {util.map((name) =>{
                        return <li key={name.id} className='list-group-item justify-content-between align-items-center'>
                            <button onClick={()=> removeFromUtil(name)} className='btn btn-sm btn-danger'>
                            {name.name}
                            </button>
                        </li>
                        }

                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room_AddForm;
