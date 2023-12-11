import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Ticket.module.scss';
import { Button } from 'react-bootstrap';

import CartItem from './CartItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const cx = classNames.bind(styles);
function Cart() {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user);
    const cartInfo = useSelector((state) => state.cart);
    const [listTicket, setListTicket] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get('http://localhost:8082/api/v1/cart', {
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

    // const handleDeleteItemInCart = useCallback(() => {
    //     const fetchApi = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             const result = await axios.get('http://localhost:8082/api/v1/cart', {
    //                 headers: { Authorization: 'Bearer ' + token },
    //             });
    //             setListTicket(result);
    //         } catch (error) {
    //             alert('cart fetch error!');
    //         }
    //     };

    //     fetchApi();
    //     // dispatch(fetchQuantityCart());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const handleCheckOut = () => {
        const listTicketChecked = cartInfo.listCartItemChecked;
        let url = '/checkout?step=1&';
        listTicketChecked.forEach((element) => {
            url += 'ids=' + element.id + '&';
        });

        url = url.slice(0, -1);
        //console.log(url);
        navigate(url);
    };
    console.log(cartInfo);

    return (
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
                        {listTicket?.length > 0 && listTicket.map((data) => <CartItem key={data.id} {...data} />)}
                    </div>
                </div>
                <div className={cx('checkout-detail', 'border')}>
                    <div className={cx('checkout-detail-content')}>
                        <h4>
                            Total price{' '}
                            <span id="total-price-checkout">
                                {cartInfo.totalPrice > 0 && ': ' + VND.format(cartInfo.totalPrice)}
                            </span>
                        </h4>
                        {cartInfo.listCartItemChecked.length === 0 ? (
                            <p>No items select yet!</p>
                        ) : (
                            <p>{cartInfo.listCartItemChecked.length} item, including taxes & fees</p>
                        )}
                    </div>
                    <Button
                        variant="outline-dark"
                        id="checkout-btn"
                        disabled={cartInfo.listCartItemChecked.length === 0}
                        size="lg"
                        className={cx('checkout-btn-next-step')}
                        onClick={handleCheckOut}
                    >
                        {cartInfo.listCartItemChecked.length === 0 ? 'Next' : 'Checkout now!'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
