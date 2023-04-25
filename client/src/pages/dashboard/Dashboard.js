import { Helmet } from "react-helmet";
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './dashboard.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (event) => {
        const value = event.target.value;
        const date = new Date(value);
        setStartDate(date);
    };

    const handleEndDateChange = (event) => {
        const value = event.target.value;
        const date = new Date(value);
        setEndDate(date);
    };

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
            <div className="container">
                <div className="board__heading">
                    <h5 className="fw700">
                        <i class="Small material-icons c-action">insert_chart</i>
                        Statuses duration
                    </h5>
                    <div className="board__filters font ">
                        <input
                            type="date"
                            name="startdate"
                            // value={formattedDate}
                            onChange={handleStartDateChange}
                        />
                        <input
                            type="date"
                            name="enddate"
                            // value={formattedDate}
                            onChange={handleEndDateChange}
                        />
                        <div
                            onClick={() => console.log(startDate, endDate)}
                            className="btn">submit
                        </div>
                    </div>
                </div>
            </div>

            <div className="f-container container">
                <div className="c-block">
                    <h6 className="fw700">Х1 Херсон</h6>
                    <Doughnut data={data} />
                </div>

                <div className="c-block">
                    <h6 className="fw700">Я7 Ялта</h6>
                    <Doughnut data={data} />
                </div>

                <div className="c-block">
                    <h6 className="fw700">С1 Симферополь</h6>
                    <Doughnut data={data} />
                </div>


                <div className="c-block">
                    <h6 className="fw700">Б1 Белгород</h6>
                    <Doughnut data={data} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;