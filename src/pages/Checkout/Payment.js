import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import { Col, Row } from 'react-bootstrap';

import baseUrl from '~/config/baseUrl';
import * as helpers from '~/helpers';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const contactDetailField = ['firstName', 'lastName', 'email', 'countryOrRegion', 'countryCode', 'mobileNumber'];

const generateRandomString = (length, key) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' + key;
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
};

function Payment({ totalPrices, totalDates, totalRoom, onNextStep }) {
    const userInfo = useSelector((state) => state.user);
    const checkoutInfo = useSelector((state) => state.checkout);
    const [searchParams] = useSearchParams();
    const [labelNextBtn, setLabelNextBtn] = useState('Pay now!');
    const [txnRef] = useState(generateRandomString('7', 'MRZERO272'));

    useEffect(() => {
        if (searchParams.get('vnp_ResponseCode') !== null && searchParams.get('vnp_ResponseCode') === '00') {
            setLabelNextBtn('Next step!');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePay = (e) => {
        e.preventDefault();
        if (searchParams.get('vnp_ResponseCode') !== null && searchParams.get('vnp_ResponseCode') === '00') {
            const createNewOrder = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const today = new Date();
                    const invoiceId = searchParams.get('vnp_TxnRef');
                    // console.log(invoiceId);
                    const result = await axios.post(
                        'http://localhost:8082/api/v1/checkout/order',
                        {
                            amount: searchParams.get('vnp_Amount'),
                            paidDateTime: today.toISOString(),
                            invoiceCode: invoiceId,
                            issueDateTime: '',
                            cancelDateTime: '',
                        },
                        { headers: { Authorization: 'Bearer ' + token } },
                    );

                    // console.log({
                    //     amount: searchParams.get('vnp_Amount'),
                    //     paidDateTime: today.toISOString(),
                    //     invoiceCode: invoiceId,
                    //     issueDateTime: '',
                    //     cancelDateTime: '',
                    // });
                    // console.log(result);

                    if (result.data.message === 'success') {
                        const doCheckout = await axios.post(
                            'http://localhost:8082/api/v1/checkout',
                            {
                                ids: searchParams.getAll('ids'),
                                contactDetail: {
                                    firstName: searchParams.get('firstName'),
                                    lastName: searchParams.get('lastName'),
                                    email: searchParams.get('email'),
                                    countryOrRegion: searchParams.get('countryOrRegion'),
                                    countryCode: searchParams.get('countryCode'),
                                    mobileNumber: searchParams.get('mobileNumber'),
                                },
                                invoiceId: invoiceId,
                            },
                            { headers: { Authorization: 'Bearer ' + token } },
                        );
                        // console.log(doCheckout);
                        if (doCheckout.data.message === 'success') {
                            // console.log('next step 3');
                            onNextStep(3);
                        }
                    }
                } catch (error) {
                    alert('error');
                }
            };
            createNewOrder();
        } else {
            let url = window.location.href;
            contactDetailField.forEach((item) => {
                url += '&' + item + '=' + checkoutInfo.contactDetail[item];
            });
            url = url.slice(0, -1);
            console.log(url);

            const getUrlPayment = async () => {
                try {
                    const result = await axios.post('http://localhost:8082/api/v1/checkout/payment-url', {
                        amount: totalPrices,
                        orderInfo: 'HOTEL ' + txnRef,
                        returnUrl: url,
                        txnRef: txnRef,
                    });
                    window.open(result.data.data, '_self');
                    //console.log(result.data.data);
                } catch (error) {
                    alert('Get payment url error!');
                }
            };
            getUrlPayment();
        }
    };
    return (
        <div className={cx('checkout-card')}>
            <div className={cx('leftside')}>
                <img src={baseUrl.image + 'room1.jpg'} alt="nothing" />
                <div className={cx('booking-summary-footer')}>
                    <div className={cx('price-detail')}>
                        <Row className={cx('price-detail-item')}>
                            <Col md="8">
                                Original price ({totalRoom} rom x {totalDates} night)
                            </Col>
                            <Col md="4">{helpers.VND.format(totalPrices)}</Col>
                        </Row>
                        <Row className={cx('price-detail-item')}>
                            <Col md="8">
                                Room price ({totalRoom} rom x {totalDates} night)
                            </Col>
                            <Col md="4" className={cx('col-4')} id="final-price">
                                {helpers.VND.format(totalPrices)}
                            </Col>
                        </Row>
                        <Row className={cx('price-detail-item')}>
                            <Col md="8">Booking fee</Col>
                            <Col md="4">FREE</Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className={cx('rightside')}>
                <form action="">
                    <h1>CheckOut</h1>
                    <h2>Payment Information</h2>
                    <p className={cx('checkout-label-input')}>Cardholder Name</p>
                    <input
                        type="text"
                        className={cx('inputbox')}
                        value={userInfo.name}
                        name="name"
                        id="nameCheckout"
                        required
                    />
                    <p className={cx('checkout-label-input')}>Content</p>
                    <input
                        type="text"
                        readonly
                        className={cx('inputbox')}
                        name="content"
                        disabled
                        value={'HOTEL ' + txnRef}
                        required
                    />

                    <p className={cx('checkout-label-input')}>Payment Method</p>
                    <select className={cx('inputbox')} name="card_type" value="vnpay" id="card_type" required>
                        <option value="vnpay">VNPay</option>
                        <option value="paypal">PayPal</option>
                        <option value="mastercard">MasterCard</option>
                    </select>
                    <div className={cx('expcvv')}>
                        <p className={cx('expcvv_text')}>Expiry</p>
                        <input
                            type="date"
                            className={cx('inputbox')}
                            name="exp_date"
                            id="exp_date"
                            value="2015-07-02"
                            required
                        />

                        <p className={cx('expcvv_text2')}>CVV</p>
                        <input type="password" className={cx('inputbox')} name="cvv" value="123" id="cvv" required />
                    </div>
                    <p></p>
                    <button className={cx('button')} id="checkout-btn" onClick={handlePay}>
                        {labelNextBtn}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Payment;
