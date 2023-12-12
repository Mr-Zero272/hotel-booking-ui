import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import RoomType from '~/components/Modal/RoomType/RoomType';
import RoomState from '~/components/Modal/RoomState/RoomState';
import styles from './Room.module.scss';
import "./Room.scss";
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

function ListRoom() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [rooms, setRooms] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllRoom()
    }, [])

    const getAllRoom = () => {
        const id = 1;
        axios({
            url: "http://localhost:8080/api/room/list",
            method: "GET"
        }).then((res) => {
            setRooms(res.data)
            console.log(res.data)
        }).catch(function (err) {
            console.log(err + 'getAllRoom');
        })
    }

    const deleteRoom = (item) => {
        axios({
            url: "http://localhost:8080/api/room/delete/" + item.id,
            method: "DELETE"
        }).then((res) => {
            getAllRoom();
        }).catch(function (err) {
            console.log(err + ' deleteRoom');
        })
    }

    return (
        <div>
            <h2 className='text-center'>List Room of Hodel #</h2>
            <div className={cx('action')}>
                <Button text to={'/room-add'}>
                    Add Room
                </Button>
            </div>
            <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Capacity</th>
                            <th>Type</th>
                            <th>State</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms?.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.hotel.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.capacity} m2</td>
                                    <td> {item.roomTypeId}--
                                        <RoomType data={item.id} />
                                    </td>

                                    <td>

                                        {item.state == 1 && (
                                            <p>EMPTY</p>
                                        )}

                                        {item.state == 2 && (
                                            <p>FULL</p>
                                        )}

                                        {item.state == 3 && (
                                            <p>Ordered</p>
                                        )}

                                        <RoomState data={item.id} />
                                    </td>

                                    <td>
                                        <div className={cx('action')}>
                                            <Link className='btn btn-outline-primary mx-2'
                                                to={`/room-edit/${item.id}`}>
                                                Edit
                                            </Link>
                                        </div>
                                    </td>

                                    <td>
                                        <div className={cx('action')}>
                                            <button onClick={() => deleteRoom(item)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListRoom;
