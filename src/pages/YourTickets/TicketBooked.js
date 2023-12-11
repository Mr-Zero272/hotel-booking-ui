import classNames from 'classnames/bind';
import styles from './YourTickets.module.scss';

import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
// import Swal from 'sweetalert2';

import { format } from 'date-fns';
import baseUrl from '~/config/baseUrl';
// import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);
const dF = () => {};

function TicketBooked({ onSelect = dF, onDelete = dF, ...props }) {
    // const dispatch = useDispatch();
    //console.log(props);
    const checkInDate = format(new Date(props.checkInDate), 'dd MMM, yyyy');
    const checkOutDate = format(new Date(props.checkOutDate), 'dd MMM, yyyy');
    return (
        <div className={cx('cart-item')}>
            <Row className={cx('cart-item-top')} style={{ maxWidth: '100%' }}>
                <Col md={2} className={cx('cart-item-img')}>
                    <img src={baseUrl.image + props.image} alt="item" />
                </Col>
                <Col md={10} className={cx('cart-item-body')}>
                    <p className={cx('item-name')}>{props.roomName}</p>
                    <div className={cx('start-rating-and-location')}>
                        <div className={cx('item-star-rating')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className={cx('item-location')}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{props.hotelAddress}</span>
                        </div>
                    </div>
                    <div className={cx('item-mark-rating')}>
                        <div className={cx('mark-rating')}>{props.ratingAvg}</div>
                        <p>Excellent</p>
                        <p className={cx('total-review')}>{props.totalReview} reviews</p>
                    </div>
                    <div className={cx('book-mark')}>Booked</div>
                </Col>
            </Row>
            <div className={cx('cart-item-bottom')}>
                <div className={cx('cart-item-time')}>
                    <p>
                        {checkInDate} - {checkOutDate}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TicketBooked;
