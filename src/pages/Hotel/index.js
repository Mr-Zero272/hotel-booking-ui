import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import baseUrl from '~/config/baseUrl';

// import h1 from "../../../src/assets/images/about-1.jpg"
// import h2 from "../../../src/assets/images/about-2.jpg"
// import h3 from "../../../src/assets/images/about-3.jpg"
// import h4 from "../../../src/assets/images/about-4.jpg"

const HotelDetails = () => {
    const { id } = useParams();

    const initialHotel = {
        id: null,
        name: '',
        address: '',
        description: '',
        ratingAvg: null,
        stars: null,
        rooms: [],
    };

    const [hotel, setHotel] = useState(initialHotel);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/v1/hotel/${id}`);
                setHotel(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    return (
        <div className="">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
                <div>
                    <div className=" container-xxl py-5">
                        <div className="container">
                            <div className="row g-5 align-items-center">
                                <div className="col-lg-6">
                                    <h6 className="section-title text-start text-primary text-uppercase">
                                        <i class="fa-solid fa-location-dot">
                                            <span className="fs-3 text-warning">{hotel.address}</span>
                                        </i>
                                    </h6>
                                    <h1 class="fw-bolder mb-4">
                                        Welcome to{' '}
                                        <span class="text-primary text-uppercase text-warning">{hotel.name}</span>
                                    </h1>
                                    <p class="mb-4 fst-italic fs-3">{hotel.description}</p>
                                    <div className="row g-3 pb-4">
                                        <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                                            <div className="border rounded p-1">
                                                <div className="border rounded text-center p-4">
                                                    <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                                                    <h2 className="mb-1 fw-bolder" data-toggle="counter-up">
                                                        so luong phong {hotel.rooms.length}
                                                    </h2>
                                                    <p className="mb-0 fw-bold">Rooms</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                                            <div className="border rounded p-1">
                                                <div className="border rounded text-center p-4">
                                                    <i className="fa-solid fa-star fa-2x text-primary mb-2"></i>
                                                    <h2 className="mb-1" data-toggle="counter-up">
                                                        {hotel.stars}
                                                    </h2>
                                                    <p className="mb-0 fw-bolder">Sao</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                                            <div className="border rounded p-1">
                                                <div className="border rounded text-center p-4">
                                                    <i className="fa-regular fa-face-smile fa-2x text-primary mb-2"></i>
                                                    <h2 className="mb-1" data-toggle="counter-up">
                                                        {hotel.ratingAvg}
                                                    </h2>
                                                    <p className="mb-0 fw-bold">Bình chọn</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div />
                                        <a className="btn btn-primary py-3 px-5 mt-2" href="/">
                                            Explore More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row g-3">
                                        <div className="col-6 text-end">
                                            <img
                                                className="img-fluid rounded w-75 wow zoomIn"
                                                data-wow-delay="0.1s"
                                                src={baseUrl.image + 'room57.jpg'}
                                                alt="item"
                                            />
                                        </div>
                                        <div className="col-6 text-start">
                                            <img
                                                className="img-fluid rounded w-100 wow zoomIn"
                                                data-wow-delay="0.3s"
                                                src={baseUrl.image + 'room58.jpg'}
                                                alt="item"
                                            />
                                        </div>
                                        <div className="col-6 text-end">
                                            <img
                                                className="img-fluid rounded w-50 wow zoomIn"
                                                data-wow-delay="0.5s"
                                                src={baseUrl.image + 'room59.jpg'}
                                                alt="item"
                                            />
                                        </div>
                                        <div className="col-6 text-start">
                                            <img
                                                className="img-fluid rounded w-75 wow zoomIn"
                                                data-wow-delay="0.7s"
                                                src={baseUrl.image + 'room60.jpg'}
                                                alt="item"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="section-title text-center text-primary text-uppercase text-warning">
                                    Our Rooms
                                </h6>
                                <h1 className="mb-5">
                                    Explore Our <span className="text-primary text-uppercase">Rooms</span>
                                </h1>
                            </div>
                            <div className="row g-4">
                                {hotel.rooms.map((room) => (
                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="room-item shadow rounded overflow-hidden">
                                            <div className="position-relative">
                                                <img
                                                    className="img-fluid"
                                                    src={baseUrl.image + 'room61.jpg'}
                                                    alt="img"
                                                />
                                                <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                                                    {room.currentPrice} vnđ
                                                </small>
                                            </div>
                                            <div className="p-4 mt-2">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <h5 className="mb-0 fs-4">{room.name}</h5>

                                                    {/* them vao gio hang */}
                                                    <form method="post">
                                                        <button
                                                            type="submit"
                                                            classNameName="bg-warning-subtle"
                                                            style={{ minWidth: '100px' }}
                                                        >
                                                            Thêm vào giỏ
                                                        </button>
                                                    </form>
                                                    <div className="ps-2">
                                                        <small className="fa fa-star text-primary"></small>
                                                        <small className="text-primary">
                                                            {room.ratingAvg}{' '}
                                                            <span className="fs-3 text-warning"> sao</span>
                                                        </small>
                                                    </div>
                                                </div>

                                                <div className="d-flex mb-3">
                                                    <small className="border-end me-3 pe-3">
                                                        <i className="fa fa-bed text-primary me-2"></i>3 Bed
                                                    </small>
                                                    <small className="border-end me-3 pe-3">
                                                        <i className="fa fa-bath text-primary me-2"></i>2 Bath
                                                    </small>
                                                    <small>
                                                        <i className="fa fa-wifi text-primary me-2"></i>Wifi
                                                    </small>
                                                </div>
                                                <p className="fs-3 text-body mb-3">{room.description}</p>
                                                <div className="d-flex justify-content-between">
                                                    <a href="/" className="btn btn-sm btn-primary rounded py-2 px-4">
                                                        View Detail
                                                    </a>
                                                    {room.state === 'available' ? (
                                                        <div>
                                                            <a
                                                                className="btn btn-sm btn-dark rounded py-2 px-4"
                                                                href="/"
                                                            >
                                                                Book Now
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="btn btn-sm btn-secondary rounded py-2 px-4">
                                                                Sold out
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelDetails;
