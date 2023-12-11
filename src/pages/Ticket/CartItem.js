import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
// import Swal from 'sweetalert2';

import styles from './Ticket.module.scss';
// import * as cartService from '~/apiServices/cartService';
import { format } from 'date-fns';
import baseUrl from '~/config/baseUrl';
import { useDispatch } from 'react-redux';
import { cartActions } from '~/store/cart-slice';

const cx = classNames.bind(styles);

const dF = () => {};
function CartItem({ checked = false, onSelect = dF, onDelete = dF, ...props }) {
    const dispatch = useDispatch();
    //console.log(props);
    const checkInDate = format(new Date(props.checkInDate), 'dd MMM, yyyy');
    const checkOutDate = format(new Date(props.checkOutDate), 'dd MMM, yyyy');

    const handleCheck = () => {
        dispatch(
            cartActions.addCartItem({
                id: props.id,
                totalDates: props.totalDates,
                roomPrice: props.roomPrice,
                totalPrice: props.totalPrice,
            }),
        );
    };

    // const handleDeleteTicket = (id) => {
    //     Swal.fire({
    //         title: 'Are you sure to delete this ticket?',
    //         text: "You won't be able to revert this! ",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel!',
    //         reverseButtons: true,
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             const callApi = async () => {
    //                 const token = localStorage.getItem('token');
    //                 const ids = [id];
    //                 const result = await cartService.deleteTicketById(token, ids);
    //                 //console.log(result); {message: 'success'}
    //                 if (result.message && result.message === 'success') {
    //                     onDelete();
    //                     Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    //                 } else {
    //                     Swal.fire('Opps!', 'Some thing went wrong!', 'warning');
    //                 }
    //             };

    //             callApi();
    //         } else if (
    //             /* Read more about handling dismissals below */
    //             result.dismiss === Swal.DismissReason.cancel
    //         ) {
    //             Swal.fire('Cancelled', 'Your ticket is still available!', 'error');
    //         }
    //     });
    // };

    return (
        <div className={cx('cart-item')}>
            <Row className={cx('cart-item-top')} style={{ maxWidth: '100%' }}>
                <Col md={2} className={cx('cart-item-img')}>
                    <img src={baseUrl.image + props.image} alt="item" />
                </Col>
                <Col md={9} className={cx('cart-item-body')}>
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
                </Col>
                <Col md={1} className={cx('cart-item-delete col-md-1')}>
                    <FontAwesomeIcon icon={faTrash} />
                </Col>
            </Row>
            <div className={cx('cart-item-bottom')}>
                <div className={cx('cart-item-bottom-checkbox')}>
                    <input
                        type="checkbox"
                        data-cartid={props.id}
                        data-price={props.totalPrice}
                        data-checkin={props.checkInDate}
                        data-checkout={props.checkOutDate}
                        className={cx('form-check-input cart-item-checkbox')}
                        name="checkbox"
                        onClick={handleCheck}
                        id=""
                    />
                    <label>1 x Deluxe Twin</label>
                </div>
                <div className={cx('cart-item-time')}>
                    <p>
                        {checkInDate} - {checkOutDate}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
