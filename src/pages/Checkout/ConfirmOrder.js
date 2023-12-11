import classNames from 'classnames/bind';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Checkout.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ConfirmOrder() {
    return (
        <div
            class={cx('card', 'col-md-4', 'bg-white', 'shadow-md', 'p-5')}
            style={{ maxHeight: '450px', margin: '0 auto' }}
        >
            <div class={cx('mb-4', 'text-center')} style={{ fontSize: '7rem', color: 'var(--primary)' }}>
                <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <div class={cx('text-center')}>
                <h1>Thank You !</h1>
                <p>We will be pleased to serve you next time</p>
                <Link to="/ticket?_type=ticket" class="btn btn-outline-success">
                    Back To Your List Ticket
                </Link>
            </div>
        </div>
    );
}

export default ConfirmOrder;
