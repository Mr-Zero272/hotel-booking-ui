import { useEffect, useState } from 'react';
import PieChart from './PieChart';
import ChartLine from './LineChart';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar';
import { Bar } from 'react-chartjs-2';

const Admin = () => {
    const [record, setRecord] = useState([]);
    const getData = () => {
        fetch('./data.json')
            .then((resposne) => resposne.json())
            .then((res) => setRecord(res));
    };
    useEffect(() => {
        getData();
    });

    return (
        <div className="row align-items-start">
            <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>Data and Records</strong> Learn more about employee
            </div>
            <div class="row mb-3">
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card bg-success text-white h-100">
                        <div class="card-body bg-success" style={{ backgroundColor: '#57b960' }}>
                            <div class="rotate">
                                <FontAwesomeIcon icon={faUser} size="4x" />
                                <i class="fa fa-user fa-4x"></i>
                            </div>
                            <h4 class="text-uppercase">Users</h4>
                            <h1 class="display-4">134</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-danger h-100">
                        <div class="card-body bg-danger">
                            <div class="rotate">
                                <FontAwesomeIcon icon={faList} size="4x" />

                                <i class="fa fa-list fa-4x"></i>
                            </div>
                            <h4 class="text-uppercase">Posts</h4>
                            <h1 class="display-4">87</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-info h-100">
                        <div class="card-body bg-info">
                            <div class="rotate">
                                <FontAwesomeIcon icon={faTwitter} size="4x" />

                                <i class="fab fa-twitter fa-4x"></i>
                            </div>
                            <h4 class="text-uppercase">Tweets</h4>
                            <h1 class="display-4">125</h1>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-warning h-100">
                        <div class="card-body">
                            <div class="rotate">
                                <FontAwesomeIcon icon={faShare} size="4x" />

                                <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h4 class="text-uppercase">Shares</h4>
                            <h1 class="display-4">36</h1>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ marginBottom: '20px' }} />
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-6 col-sm-12">
                    <h2 class="mt-3 mb-3 text-secondary text-center">
                        <strong>Check More Records of Employees</strong>
                    </h2>

                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead class="thead-light">
                                <tr>
                                    <th style={{ backgroundColor: '#996600' }}>ID</th>
                                    <th style={{ backgroundColor: '#996600' }}>Name</th>
                                    <th style={{ backgroundColor: '#996600' }}>Email</th>
                                    <th style={{ backgroundColor: '#996600' }}>Username</th>
                                    <th style={{ backgroundColor: '#996600' }}>PhoneNumber</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.slice(0, 10).map((output) => (
                                    <tr key={output.id}>
                                        <td>{output.id}</td>
                                        <td>{output.name}</td>
                                        <td>{output.email}</td>
                                        <td>{output.username}</td>
                                        <td>{output.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-lg-5 col-md-6 col-sm-12">
                    <h2 class="title mt-3 mb-3 text-center text-secondary">
                        <strong>Data in Chart</strong>
                    </h2>
                    <div className="mb-5 d-flex align-items-center flex-column" style={{ height: '400px' }}>
                        <PieChart />
                    </div>
                </div>
            </div>
            <a id="more"></a>
            <br /> <br />
            <h2 class="sub-header mt-5">Use card decks for equal height rows of cards</h2>
            <div class="mb-3">
                <div class="card-deck">
                    <div className="col-xl-8 offset-xl-2 col-sm-10 offset-sm-1 py-4">
                        <div
                            className="card card-inverse card-danger text-center"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <ChartLine />
                                    <footer>
                                        All of this makes more <cite title="Source Title">Sense</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-start">
                        <div className="col-sm-8">
                            <p className="lead d-none d-sm-block" style={{ fontSize: 'larger' }}>
                                <Calendar />
                            </p>
                        </div>

                        <div className="col-sm-4">
                            <div style={{ width: '700px', height: '600px', marginLeft: '-300px', marginTop: '110px' }}>
                                <Bar
                                    data={{
                                        labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
                                        datasets: [
                                            {
                                                label: 'Population (millions)',
                                                backgroundColor: [
                                                    '#3e95cd',
                                                    '#8e5ea2',
                                                    '#3cba9f',
                                                    '#e8c3b9',
                                                    '#c45850',
                                                ],
                                                data: [2478, 5267, 734, 784, 433],
                                            },
                                        ],
                                    }}
                                    options={{
                                        legend: { display: false },
                                        title: {
                                            display: true,
                                            text: 'Predicted world population (millions) in 2050',
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Admin;
