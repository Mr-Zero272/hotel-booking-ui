import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import RoomState from '~/components/Modal/RoomState/RoomState';
import styles from './Room.module.scss';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

function ListRoom() {

    let navigate = useNavigate();

    const {id} = useParams();

    const [rooms, setRooms ] = useState([]);

    const initialHotel = {
        id: null,
        name: '',
        address: '',
        description: '',
        ratingAvg: null,
        stars: null,
        rooms: [],
    };

    const [hotel, setHotel] = useState(initialHotel);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState('Hello World')

    useEffect(()=>{
        getAllRoom()
    }, [])

    const getAllRoom = ()=>{
        axios({
          url: `http://localhost:8082/api/room/hotel-id/${id}`,
          method: "GET"
        }).then((res)=>{
            setHotel(res.data);
            setLoading(false);
            console.log(res.data);

            const data_res = res.data;
            setRooms(data_res.rooms);
            console.log(rooms);
        }).catch(function(err){
          console.log(err + 'getAllRoom');
        })
    }

    const deleteRoom = (item) =>{
        axios({
          url: "http://localhost:8082/api/room/delete/" + item.id,
          method: "DELETE" 
        }).then((res)=>{
            getAllRoom();
        }).catch(function(err)
        {
          console.log(err + ' deleteRoom');
        })
      }

    return (
        <div className='container'>
            <br></br>
            <h2 className='text-center'>DANH SÁCH PHÒNG</h2>
            <div className={cx('action')}>
                                <Button style={{width: 150, height: 40}} className='btn btn-primary' text to={'/room-add'}>
                                    <h4>THÊM PHÒNG</h4>
                                </Button>
                            </div>
            <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead className="table-dark">
                        <tr>
                            <th>Tên phòng</th>
                            <th>Mô tả</th>
                            <th>Diện tích</th>
                            <th>Tình trạng phòng</th>
                            <th colSpan="2">Thao tác</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        { rooms?.map((item, index)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.capacity} m2</td>
                                    <td>
                                        <RoomState data={item.id} /> 
                                    </td>
                                    <td>
                                        <Link style={{width: 110, height: 40,}} className='btn btn-warning' 
                                            to = {`/room-edit/${item.id}`}>
                                            <h4>CHỈNH SỬA</h4>
                                        </Link>
                                    </td>
                                    <td>
                                        <button style={{width: 110, height: 40,}} type='button' className='btn btn-danger' onClick={() => deleteRoom(item)}><h4>XÓA</h4></button>                                         
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
