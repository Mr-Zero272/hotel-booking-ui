import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './YourTickets.module.scss';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TicketBooked from './TicketBooked';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function YourTickets() {
    const [listTicket, setListTicket] = useState([]);
    const userInfo = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get('http://localhost:8082/api/v1/checkout/booked', {
                    headers: { Authorization: 'Bearer ' + token },
                });
                setListTicket(result.data);
            } catch (error) {
                alert('cart fetch error!');
            }
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {/* <div className={cx('header-content')}>
            <NavStepper items={NAV_TICKET_PAGE} activeStep={1} onClick={handleActiveStep} />
        </div> */}
                <div className={cx('content-body')}>
                    <div className="cart-slide">
                        <div className={cx('cart-section')}>
                            <div className={cx('cart-part')}>
                                <div className={cx('cart-part-header', ' border')}>
                                    <div className={cx('cart-part-header-content')}>
                                        <h1>
                                            Your cart <span>({listTicket.length})</span>
                                        </h1>
                                        <div>
                                            <p>
                                                Hello user: <span>{userInfo.username}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('cart-part-body')}>
                                    {listTicket?.length === 0 && (
                                        <div className={cx('cart-item')}>
                                            <p>You do not have any items in cart!</p>
                                        </div>
                                    )}
                                    {listTicket?.length > 0 &&
                                        listTicket.map((data) => <TicketBooked key={data.id} {...data} />)}
                                </div>
                            </div>
                            <div className={cx('checkout-detail', 'border')}>
                                <div className={cx('checkout-detail-content')}>
                                    <h4>Navigate</h4>
                                    <p>No items select yet!</p>
                                </div>
                                <Button
                                    variant="outline-success"
                                    id="checkout-btn"
                                    size="lg"
                                    className={cx('checkout-btn-next-step')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/');
                                    }}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourTickets;
