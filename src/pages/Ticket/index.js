import classNames from 'classnames/bind';

import styles from './Ticket.module.scss';
import Cart from './Cart';

const cx = classNames.bind(styles);

function Ticket() {
    // let [searchParams, setSearchParams] = useSearchParams();
    // const tab = searchParams.get('tab');
    // const [activeStep, setActiveStep] = useState(+tab);

    // slider
    // let sliderRef = useRef(null);

    // const handleActiveStep = useCallback((stepIndex) => {
    //     sliderRef.current.slickGoTo(stepIndex - 1);
    //     setActiveStep(stepIndex);
    // }, []);

    // var settings = {
    //     infinite: false,
    //     arrows: false,
    //     dots: false,
    //     draggable: false,
    //     initialSlide: 0,
    //     //fade: true,
    //     adaptiveHeight: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };
    // handle toggle modal

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {/* <div className={cx('header-content')}>
                    <NavStepper items={NAV_TICKET_PAGE} activeStep={1} onClick={handleActiveStep} />
                </div> */}
                <div className={cx('content-body')}>
                    <Cart />
                </div>
            </div>
        </div>
    );
}

export default Ticket;
