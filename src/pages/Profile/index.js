import Button from '~/components/Button';
import axios from 'axios';

import './Profile.scss'
import { useEffect, useState } from 'react';

function Profile() {

    const [user, setUser] = useState({
        id: 0,
        name: '',
        email: '',
        phone_number: '',
    });

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios({
            url: "http://localhost:8080/users/profile",
            method: "GET",
        })
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err + 'getUser');
            });
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: `http://localhost:8080/users/user-edit/${user.id}`,
            method: "POST",
            data: user,
        })
            .then(() => {

                console.log('Cập nhật thành công');
            })
            .catch((err) => {
                console.log(err + 'updateUser');
            });
    }

    return (
        <section style={{ backgroundColor: "#eee;" }}>
            <div class="container py-5">
                <div class="row">
                    <div class="col-lg-4" style={{ width: "25.333333%" }}>
                        <div class="card mb-4">
                            <div class="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                    class="rounded-circle img-fluid" style={{ width: "150px ", maxWidth: "50%" }} />
                                <h5 class="my-3" style={{ fontSize: "15px" }}>{user.name}</h5>
                                <div class="d-flex justify-content-center mb-2">
                                    <button type="button" class="btn btn-primary" style={{ fontSize: "14px" }}>Follow</button>
                                    <button type="button" class="btn btn-outline-primary ms-1" style={{ fontSize: "14px" }}>Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group" style={{ textAlign: "left" }}>
                                        <label for="name" >Username</label>
                                        <input
                                            type="text"
                                            name="name"
                                            class="form-control"
                                            value={user.name}
                                            onChange={handleChange}
                                            style={{ fontSize: "15px" }}
                                        />
                                    </div>
                                    <div class="form-group" style={{ textAlign: "left" }}>
                                        <label for="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            class="form-control"
                                            value={user.email}
                                            onChange={handleChange}
                                            style={{ fontSize: "15px" }}
                                        />
                                    </div>
                                    <div class="form-group" style={{ textAlign: "left" }}>
                                        <label for="phone_number">Phone</label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            class="form-control"
                                            value={user.phone_number}
                                            onChange={handleChange}
                                            style={{ fontSize: "15px" }}
                                        />
                                    </div>

                                </form>
                            </div>
                        </div>
                        <Button to={'/user-edit/'}
                            class="btn btn-outline-primary btn-ud"
                            style={{ fontSize: "18px", fontWeight: "700" }}
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
            {/* modal Update */}
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header tt-md">
                            <h5 class="modal-title tt-md" >Update </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form method="post">
                                <div class="form-group" style={{ textAlign: "left" }}>
                                    <label for="name" >Username</label>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-control"
                                        value={user.name}
                                        onChange={handleChange}
                                        style={{ fontSize: "15px" }}
                                    />
                                </div>
                                <div class="form-group" style={{ textAlign: "left" }}>
                                    <label for="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        class="form-control"
                                        value={user.email}
                                        onChange={handleChange}
                                        style={{ fontSize: "15px" }}
                                    />
                                </div>
                                <div class="form-group" style={{ textAlign: "left" }}>
                                    <label for="phone_number">Phone</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        class="form-control"
                                        value={user.phone_number}
                                        onChange={handleChange}
                                        style={{ fontSize: "15px" }}
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        style={{ fontSize: "14px" }}
                                        data-target="#myModal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        style={{ fontSize: "14px" }}
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
