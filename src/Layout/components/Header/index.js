import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { userActions } from '~/store/user-slice';
import images from '~/assets/images';
import * as userService from '~/apiServices/userService';
import Search from '../Search';
import styles from './Header.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const isExpired = (d1) => {
    const today = new Date();
    return d1.getTime() < today.getTime();
};

function Header({ onToggleMenu }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token === '' || token === null) {
            localStorage.setItem('token', '');
            dispatch(userActions.setUserStatus('logout'));
        } else {
            const tokenDecode = jwtDecode(token);
            if (!isExpired(new Date(tokenDecode.exp * 1000))) {
                const fetchApi = async (token) => {
                    const result = await userService.getCurrentUser(token);
                    //console.log(result.data);
                    dispatch(
                        userActions.setUserNecessaryInfo({
                            status: 'online',
                            username: tokenDecode.sub,
                            avatar: result.avatar,
                            roles: result.roles,
                            name: result.name,
                        }),
                    );
                };
                fetchApi(token);
            } else {
                dispatch(userActions.setUserStatus('logout'));
                localStorage.setItem('token', '');
            }
        }

        // return () => {
        //     dispatch(userActions.clearUserInfo());
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className={cx('container')}>
            <nav className={cx('wrapper')}>
                <button className={cx('more-btn', 'menu-sidebar')} onClick={onToggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <Link className={cx('logo')} to="/">
                    <img src={images.logo} alt="logo" height={30} width={30} />
                    <h4 className={cx('logo-heading')}>
                        <span style={{ color: 'var(--primary)' }}>H</span>otel
                    </h4>
                </Link>
                <div className={cx('body')}>
                    <Search />
                </div>
                <div className={cx('actions')}>
                    {currentUser.status === 'online' ? (
                        <>
                            <div className={cx('action')}>
                                <Button className={cx('cart')} to="/cart">
                                    <p className={cx('cart_quantity')}>3</p>
                                    {/* <FontAwesomeIcon icon={faCartShopping} /> */}
                                    <img src={images.cart} alt="logo" height={30} width={30} />
                                </Button>
                            </div>
                            <div className={cx('action')}>
                                <Link to="/profile" className={cx('more-btn')}>
                                    {/* <Image className={cx('user-avatar')} src={avatar} alt="avatar" ref={imageRef} /> */}
                                    {/* <img className={cx('user-avatar')} src={avatar} alt="avatar" ref={imageRef} /> */}
                                    <img
                                        className={cx('user-avatar')}
                                        src={'http://localhost:8082/img/' + currentUser.avatar}
                                        alt="avatar"
                                    />
                                    {/* <img className={cx('user-avatar')} src={images.fakeAvatar} alt="avatar" /> */}
                                </Link>
                            </div>
                            <div className={cx('action')}>
                                <Button text onClick={() => dispatch(userActions.logout())}>
                                    Logout
                                </Button>
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
