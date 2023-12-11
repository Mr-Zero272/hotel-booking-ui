import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendar, faCity, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import classNames from 'classnames/bind';

import styles from './Checkout.module.scss';
import baseUrl from '~/config/baseUrl';

const cx = classNames.bind(styles);

function CheckoutItem({ ...props }) {
    const checkInDate = format(new Date(props.checkInDate), 'dd MMM, yyyy');
    const checkOutDate = format(new Date(props.checkOutDate), 'dd MMM, yyyy');
    return (
        <div className={cx('item-checkout', 'border')}>
            <div className={cx('item-checkout-header', 'mb-3')}>
                <p>
                    <FontAwesomeIcon icon={faCity} /> <strong>Hotel</strong>
                    <small> CAN THO CITY</small>
                </p>
            </div>
            <Row className={cx('item-checkout-body', 'mb-3')}>
                <Col md="3">
                    <img src={baseUrl.image + props.image} alt="item" style={{ width: '100%', height: '100%' }} />
                </Col>
                <Col md="9">
                    <p className={cx('item-name')}>{props.roomName}</p>
                    <div className={cx('start-rating-and-location')}>
                        <div className={cx('item-star-rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>
                    <div className={cx('item-mark-rating')}>
                        <div className={cx('mark-rating')}>{props.ratingAvg}</div>
                        <p>Excellent</p>
                        <p className={cx('total-review')}>{props.totalReview} reviews</p>
                    </div>
                </Col>
            </Row>
            <div className={cx('item-checkout-footer')}>
                <div className={cx('item-checkout-footer-list-item')}>
                    <FontAwesomeIcon icon={faCalendar} className={cx('i')} />
                    <p>
                        {checkInDate} - {checkOutDate} | {props.totalDates} night
                    </p>
                </div>
                <div className={cx('item-checkout-footer-list-item')}>
                    <FontAwesomeIcon icon={faBed} className={cx('i')} />
                    <p>1 x Deluxe Double Studio</p>
                </div>
                <div className={cx('item-checkout-footer-list-item')}>
                    <FontAwesomeIcon icon={faUser} className={cx('i')} />
                    <p>1 room, 2 adults</p>
                </div>
            </div>
        </div>
    );
}

export default CheckoutItem;
