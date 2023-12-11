import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './Checkout.module.scss';
import ContactDetail from './ContactDetail';
import NavStepper from '~/components/NavStepper';
import CheckoutItem from './CheckoutItem';
import axios from 'axios';
import Payment from './Payment';
import ConfirmOrder from './ConfirmOrder';

const cx = classNames.bind(styles);
const NAV_CHECKOUT_PAGE = ['Customer information', 'Payment information', 'Booking confirmed'];
function Checkout() {
    const [searchParams] = useSearchParams();
    const [listCheckoutItems, setListCheckoutItems] = useState([]);
    let ids = searchParams.getAll('ids');
    let step = searchParams.get('step');
    const sliderRef = useRef(null);
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        const fetchListCheckoutItem = async () => {
            try {
                const token = localStorage.getItem('token');
                let url = 'http://localhost:8082/api/v1/checkout?';
                ids.forEach((item) => {
                    url += 'ids=' + item + '&';
                });
                url = url.slice(0, -1);
                const result = await axios.get(url, {
                    headers: { Authorization: 'Bearer ' + token },
                });

                setListCheckoutItems(result.data);
                console.log(result.data);
            } catch (error) {
                alert('fetch cart error!');
            }
        };

        fetchListCheckoutItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleActiveStep = useCallback((stepIndex) => {
        sliderRef.current.slickGoTo(stepIndex - 1);
        setActiveStep(stepIndex);
    }, []);

    let VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const summary = useMemo(() => {
        let dates = 0,
            totalPrices = 0;
        listCheckoutItems.forEach((item) => {
            dates += item.totalDates;
            totalPrices += item.totalPrice;
        });
        return {
            dates: dates,
            totalPrices: totalPrices,
        };
    }, [listCheckoutItems]);

    // setting slider
    const settings = {
        infinite: false,
        arrows: false,
        dots: false,
        draggable: false,
        initialSlide: +step - 1,
        //fade: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    //console.log(ids);
    return (
        <div className={cx('checkout-section')}>
            <NavStepper activeStep={activeStep} items={NAV_CHECKOUT_PAGE} />
            <div className={cx('content-body')}>
                <Slider {...settings} ref={sliderRef}>
                    <div>
                        <Row style={{ marginLeft: 0, marginRight: 0 }}>
                            <Col md="8" className={cx('checkout-form-left')}>
                                <ContactDetail onNextStep={handleActiveStep} />
                            </Col>
                            <Col md="4">
                                <div className={cx('checkout-form-right', 'border')}>
                                    <div className={cx('booking-summary-header', 'mb-3')}>
                                        <h3>Booking Summary</h3>
                                    </div>
                                    <div className={cx('booking-summary-body')}>
                                        {listCheckoutItems.length !== 0 &&
                                            listCheckoutItems.map((item, index) => (
                                                <CheckoutItem key={index} {...item} />
                                            ))}
                                    </div>
                                    <div className={cx('booking-summary-footer')}>
                                        <div className={cx('price-detail')}>
                                            <div className={cx('price-detail-item row')}>
                                                <p className={cx('col-8')}>
                                                    Original price ({listCheckoutItems?.length} rom x {summary.dates}{' '}
                                                    night)
                                                </p>
                                                <p className={cx('col-4')}>{VND.format(summary.totalPrices)}</p>
                                            </div>
                                            <div className={cx('price-detail-item row')}>
                                                <p className={cx('col-8')}>
                                                    Room price ({listCheckoutItems?.length} rom x {summary.dates} night)
                                                </p>
                                                <p className={cx('col-4')}>{VND.format(summary.totalPrices)}</p>
                                            </div>
                                            <div className={cx('price-detail-item row')}>
                                                <p className={cx('col-8')}>Booking fee</p>
                                                <p className={cx('col-4')}>FREE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div>
                        <Payment
                            totalDates={summary.dates}
                            totalPrices={summary.totalPrices}
                            totalRoom={listCheckoutItems?.length}
                            onNextStep={handleActiveStep}
                        />
                    </div>
                    <div>
                        <ConfirmOrder />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Checkout;
