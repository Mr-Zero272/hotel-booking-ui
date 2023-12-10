import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const PieChart = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['Shares', 'Posts', 'Tweets', 'Users'],
        datasets: [
            {
                data: [36, 87, 125, 134],
                backgroundColor: ['#FFCC33', '#FF0000', '#00CCFF', '#57b960'],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const dataset = context.dataset;
                        const label = dataset.label || '';
                        const value = dataset.data[context.dataIndex];
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${percentage}%`;
                    },
                },
            },
        },
    };

    return <Pie ref={chartRef} data={data} options={options} />;
};

export default PieChart;
