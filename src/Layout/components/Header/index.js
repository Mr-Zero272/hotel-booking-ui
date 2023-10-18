import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEarthAsia,
    faRightToBracket,
    faBars,
    faShareFromSquare,
    faUser,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import Search from '../Search';

import styles from './Header.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Vietnam',
                },
            ],
        },
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'ViewProfile',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faTicket} />,
        title: 'My ticket',
        to: '/ticket',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faShareFromSquare} />,
        title: 'Logout',
        action: 'logout',
        separate: true,
    },
];

function Header({ onToggleMenu }) {
    const currentUser = false;
    return (
        <header className={cx('container')}>
            <nav className={cx('wrapper')}>
                <button className={cx('more-btn', 'menu-sidebar')} onClick={onToggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <Link className={cx('logo')} to="/">
                    <img src={images.logo} alt="logo" height={30} width={30} />
                    <h4 className={cx('logo-heading')}>
                        Moon <span style={{ color: 'var(--primary)' }}>M</span>ovie
                    </h4>
                </Link>
                <div className={cx('body')}>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <div className={cx('action')}>
                                <button className={cx('cart')} text to="/ticket">
                                    <p className={cx('cart_quantity')}>3</p>
                                    {/* <FontAwesomeIcon icon={faCartShopping} /> */}
                                    <img src={images.cart} alt="logo" height={30} width={30} />
                                </button>
                            </div>
                            <div className={cx('action')}>
                                <button to="/profile" className={cx('more-btn')}>
                                    {/* <Image className={cx('user-avatar')} src={avatar} alt="avatar" ref={imageRef} /> */}
                                    {/* <img className={cx('user-avatar')} src={avatar} alt="avatar" ref={imageRef} /> */}
                                    <img
                                        className={cx('user-avatar')}
                                        src="https://i.pinimg.com/originals/99/85/2d/99852dc70a4afd179eb15fe361ca0cb3.jpg"
                                        alt="avatar"
                                    />
                                    {/* <img className={cx('user-avatar')} src={images.fakeAvatar} alt="avatar" /> */}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('action')}>
                                <Button text to={'/register'}>
                                    Register
                                </Button>
                            </div>
                            <div className={cx('action')}>
                                <Button primary to={'/login'}>
                                    Login
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
