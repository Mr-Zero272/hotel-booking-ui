import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Form, Row } from 'react-bootstrap';

import * as userService from '~/apiServices/userService';
import styles from './Checkout.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkoutActions } from '~/store/checkout-slice';

const cx = classNames.bind(styles);
const defaultF = () => {};
function ContactDetail({ onNextStep = defaultF }) {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [contactDetail, setContactDetail] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryOrRegion: '',
        countryCode: '',
        mobileNumber: '',
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (
                searchParams.get('firstName') !== null &&
                searchParams.get('lastName') !== null &&
                searchParams.get('email') !== null &&
                searchParams.get('countryOrRegion') !== null &&
                searchParams.get('countryCode') !== null &&
                searchParams.get('mobileNumber') !== null
            ) {
                setContactDetail((prev) => ({
                    ...prev,
                    firstName: searchParams.get('firstName'),
                    lastName: searchParams.get('lastName'),
                    email: searchParams.get('email'),
                    countryCode: searchParams.get('countryCode'),
                    countryOrRegion: searchParams.get('countryOrRegion'),
                    mobileNumber: searchParams.get('mobileNumber'),
                }));
            } else {
                const token = localStorage.getItem('token');
                const rsp = await userService.getCurrentUser(token);

                // console.log(rsp);
                setContactDetail((prev) => ({
                    ...prev,
                    firstName: rsp.name,
                    lastName: rsp.name,
                    email: rsp.email,
                    countryCode: '84',
                    countryOrRegion: 'Vietnam',
                    mobileNumber: rsp.mobileNumber,
                }));
            }
        };
        fetchUserInfo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        setContactDetail((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            onNextStep(2);
            setSearchParams((searchParams) => {
                searchParams.set('step', 2);
                return searchParams;
            });
            //console.log(contactDetail);
            dispatch(checkoutActions.setContactDetail(contactDetail));
            setValidated(true);
        }
    };

    return (
        <>
            <div className={cx('form-contact-details', 'form-checkout')}>
                <Form noValidate validated={validated} onSubmit={handleSubmit} id="contactFrom">
                    <Form.Group className={cx('mb-3')}>
                        <h5>Contact details</h5>
                        <p>This is where your confirmation will be sent</p>
                    </Form.Group>
                    <Row className={cx('mb-3')}>
                        <Form.Group className={cx('col-md-6')}>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="firstName"
                                size="lg"
                                value={contactDetail.firstName}
                                placeholder="First name..."
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">This filed is require!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={cx('col-md-6')}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                size="lg"
                                required
                                value={contactDetail.lastName}
                                placeholder="Last name..."
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">This filed is require!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className={cx('mb-3')}>
                        <Form.Group className={cx('col-md-6')}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                size="lg"
                                name="email"
                                required
                                value={contactDetail.email}
                                placeholder="Email..."
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">This filed is require!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={cx('col-md-6')}>
                            <Form.Label>Country/region of residence</Form.Label>
                            <Form.Select
                                className={cx('form-select')}
                                name="countryOrRegion"
                                size="lg"
                                value={contactDetail.countryOrRegion}
                                aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value="">Please select one</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Thailand">Thailand</option>
                                <option value="China">China</option>
                                <option value="Japan">Japan</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">This filed is require!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className={cx('mb-3')}>
                        <Form.Group className={cx('col-md-6')}>
                            <Form.Label>Country code</Form.Label>
                            <Form.Select
                                className={cx('form-select')}
                                name="countryCode"
                                value={contactDetail.countryCode}
                                size="lg"
                                aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value="">Please select one</option>
                                <option value="84">+84</option>
                                <option value="86">+86</option>
                                <option value="43">+43</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">This filed is require!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={cx('col-md-6')}>
                            <Form.Label>Mobile number</Form.Label>
                            <Form.Control
                                type="number"
                                size="lg"
                                required
                                className={cx('form-control')}
                                name="mobileNumber"
                                value={contactDetail.mobileNumber}
                                placeholder="Mobile number..."
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">This filed is require!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
            <div className={cx('form-guest-information', 'form-checkout')}>
                <p className={cx('mb-3')}>Check it carefully to go to next step!</p>
                <button className={cx('btn', 'btn-primary')} id="submitStep1" form="contactFrom">
                    Next step
                </button>
            </div>
        </>
    );
}

export default ContactDetail;
