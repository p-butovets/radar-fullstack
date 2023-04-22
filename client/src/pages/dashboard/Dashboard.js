import { Helmet } from "react-helmet";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './dashboard.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

    const data = {
        labels: ['Operator', 'Kitchen', 'Waiting', 'Delivery'],
        datasets: [
            {
                label: 'Avg minutes',
                data: [12, 19, 3, 5.6,],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    return (
        <>
            <Helmet>
                <meta name="description" content="Dashboard | Logistic Management App" />
                <title>Dashboard | MisoMove</title>
            </Helmet>
            <p class="flow-text">I am Flow Text</p>
            <Doughnut data={data} />
        </>
    )
}

export default Dashboard;