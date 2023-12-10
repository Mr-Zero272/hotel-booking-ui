import React, { useState, useEffect } from 'react';
import './Room_Add.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import validation from './Room_AddValidation';

function Room_AddForm() {

    let navigate = useNavigate();

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
          url: "http://localhost:8080/api/utilities/list",
          method: "GET"
        }).then((res)=>{
          setUti(res.data)
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
        

            let hotel = {
                id : values.hotel
            }
            
            let room = { hotel,
                        name : values.name,
                        description: values.description,
                        currentPrice: values.currentPrice,
                        roomTypeId: values.roomTypeId,
                        state: 1,
                        capacity: values.capacity,
                        ratingAvg: 0,
                        utilities: util,
                        };

            console.log('room =>' + JSON.stringify(room));
            
            axios({
            url: "http://localhost:8080/api/room/add",
            method: "POST",
            data: room,
            headers: {
                "Content-Type" : "application/json"
            } 
            }).then((res)=>{
                console.log("Successfully !")
            }).catch(function(err){
            console.log(err + 'handleSubmit');
            })
        }
    }

    return (
        <div className="login_container">
            <div className="login-form">
                <h1>Edit Room #</h1>
                {/* <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className='row g-3'>
                            <div className='col-sm'>
                                <label htmlFor="hotel">
                                    <b>Hotel</b>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Hotel ID"
                                    value={values.hotel}
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


                            <div className='row g-3'>
                                <div className='col-sm'>

                                    <label htmlFor="currentPrice">
                                        <b>Price</b>
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
                           
                                <div className='col-sm'>
                                    <label htmlFor="roomTypeId">
                                        <b>Type</b>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        value={values.roomTypeId}
                                        name="roomTypeId"
                                        onChange={handleChange}
                                    />

                                    <select name="roomTypeId" className='form-select' onChange={handleChange}>
                                        <option selected value={0}>SELECT</option>
                                        
                                        {options.map(option => (
                                            <option value={option.label}>{option.label}</option>
                                        ))}
                                    </select>

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
                        <button type="submit">Create</button>
                    </div>
                </form> */}






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
                                    {/* <input
                                        type="text"
                                        placeholder="Enter Type"
                                        value={values.roomTypeId}
                                        name="roomTypeId"
                                        onChange={handleChange}
                                    /> */}

                                    <select name="roomTypeId" className='form-select' onChange={handleChange}>
                                        <option selected defaultValue={1}>SELECT</option>
                                        
                                        {options.map(option => (
                                            <option value={option.label}>{option.label}</option>
                                        ))}
                                    </select>

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







                <div className='row'>
                    <div className='col-6'>
                    {uti.map((name) =>{
                        if(util.includes(name)) return null;
                        return <li key={name.id} className='list-group-item justify-content-between align-items-center'>
                            {name.name}
                            <button onClick={()=> addToUti(name)} className='btn btn-sm btn-success'>
                                Add
                            </button>
                        </li>
                        }

                    )}
                    </div>

                    <div className='col-6'>
                    {util.map((name) =>{
                        return <li key={name.id} className='list-group-item justify-content-between align-items-center'>
                            {name.name}
                            <button onClick={()=> removeFromUtil(name)} className='btn btn-sm btn-danger'>
                                Remove
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
