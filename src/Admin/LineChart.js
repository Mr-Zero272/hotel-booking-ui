import { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
export const ChartLine = () => {
    const ref = useRef();

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'First dataset',
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Second dataset',
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: '#742774',
            },
        ],
    };

    return <Line ref={ref} data={data} />;
};
export default ChartLine;
