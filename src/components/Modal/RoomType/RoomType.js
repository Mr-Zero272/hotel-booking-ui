import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./RoomType.scss";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RoomType = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ value, setValue] = useState('');

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

  useEffect(()=>{
    loadRoom()
    console.log(props.data);
  }, [])

  const loadRoom = async()=>{
    const result = await axios.get(`http://localhost:8080/api/room/` + props.data)
    setValues(result.data);

    setValue(result.data.roomTypeId);
  }

  const options = [
    {label: "NORMAL", value : 1},
    {label: "VIP", value : 2},
  ]

  function handleSelect(event){
    setValue(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let room = {  hotel: values.hotel,
                  name : values.name,
                  description: values.description,
                  currentPrice: values.currentPrice,
                  roomTypeId: value,
                  state: values.state,
                  capacity: values.capacity,
                  ratingAvg: values.ratingAvg
                  };

      console.log('room =>' + JSON.stringify(room));

      axios({
      url: `http://localhost:8080/api/room/room-type/` + props.data,
      method: "PUT",
      data: room,
      headers: {
      "Content-Type" : "application/json"
      } 
      }).then((res)=>{
        handleClose();
        console.log("Successfully !")
        loadRoom();
        navigate("/room-list");
      }).catch(function(err){
      console.log(err + 'handleSubmit');
      })
}

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change
      </Button>

      <Modal
        style={{
          marginTop: 200,
        }}
        show={show} onHide={handleClose}>
        <div className='div-modal'>
          <form method="post" onSubmit={handleSubmit}
            className='form-modal'>
              <input
                  type="text"
                  placeholder="Enter Hotel ID"
                  value={values.hotel.id}
                  name="hotel"
                  //onChange={handleChange}
              />

              <input
                  type="text"
                  placeholder="Enter Hotel ID"
                  value={values.name}
                  name="name"
                  //onChange={handleChange}
              />
            <div className='d-flex justify-content-center mt-5'>
              <div className='w-10 p-3 border rounded'>
                <h4>Get Selected Value</h4>
                <select className='form-select' onChange={handleSelect}>

                  {/* { values.state == 1 && (
                    <option selected value={values.state}>Empty</option>  
                  )}

                  { values.state == 2 && (
                    <option selected value={values.state}>Full</option>  
                  )}

                  { values.state == 3 && (
                    <option selected value={values.state}>Ordered</option>  
                  )} */}

                  <option selected value={values.roomTypeId}>{values.roomTypeId}</option>  
                  
                  {options.map(option => (
                    <option value={option.label}>{option.label}</option>
                  ))}
                </select>

                {/* <p>{value}</p> */}
              </div>
              <button type="submit">OK</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default RoomType;