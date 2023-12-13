import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./RoomState.scss";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fontWeight } from '@mui/system';

const RoomState = (props) => {
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
    const result = await axios.get(`http://localhost:8082/api/room/` + props.data)
    setValues(result.data);

    setValue(result.data.state);
  }

  const options = [
    {label: "TRỐNG", value : 0},
    {label: "ĐẦY", value : 1}
  ]

  function handleSelect(event){
    setValue(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let room = {  name : values.name,
                  description: values.description,
                  currentPrice: values.currentPrice,
                  roomTypeId: values.roomTypeId,
                  state: value,
                  capacity: values.capacity,
                  ratingAvg: values.ratingAvg
                  };

      console.log('room =>' + JSON.stringify(room));

      axios({
      url: `http://localhost:8082/api/room/room-state/` + props.data,
      method: "PUT",
      data: room,
      headers: {
      "Content-Type" : "application/json"
      } 
      }).then((res)=>{
        handleClose();
        console.log("Successfully !")
        loadRoom();
      }).catch(function(err){
      console.log(err + 'handleSubmit');
      })
}

  return (
    <>
      
      { values.state == 0 && (
        <Button variant="success" style={{width: 110, height: 40,}} onClick={handleShow}>
          <h4>THAY ĐỔI</h4>
        </Button>
      )}

      { values.state == 1 && (
        <Button variant="danger" style={{width: 110, height: 40,}} onClick={handleShow}>
          <h4>THAY ĐỔI</h4>
        </Button>
      )}

      <Modal
        style={{
          marginTop: 200,
        }}
        show={show} onHide={handleClose}>
        <div className='div-modal'>
          <form method="post" onSubmit={handleSubmit}
            className='form-modal'>
            <div className='d-flex justify-content-center mt-5'>
              <div className='w-10 p-3 border rounded'
              style={{
                width: '100%',
                height: '120%'
              }}>
                <h4 class="text-center" style={{fontSize: 30, fontWeight: 'bold',}}>Chọn Trạng Thái Phòng</h4>
                <div className="row">
                  <div className='col'>
                    <select style={{
                      height: 40,
                    }} className='form-select' defaultValue={values.state} onChange={handleSelect}>

                      { values.state == 0 && (
                        <option value={values.state}>TRỐNG</option>  
                      )}

                      { values.state == 1 && (
                        <option  value={values.state}>ĐẦY</option>  
                      )}
                      
                      {options.map(option => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col'>
                    <button className='btn btn-primary' type="submit" style={{width: '100%', height: '100%'}}>OK</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default RoomState;