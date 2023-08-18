import { Divider } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import './dgramBlock.scss';

const DgramBlock = ({ id, name, from, to }) => {

    //TODO: тут нужно посчиать data конкретно для этой кухни

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
        <div className="c-block">
            <Divider>
                <div className="fw700">{name}</div>
            </Divider>
            <Doughnut data={data} />
        </div>
    )
}

export default DgramBlock;