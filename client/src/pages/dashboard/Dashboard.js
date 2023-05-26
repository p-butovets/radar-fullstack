import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, Space, Button } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DgramBlock from "../../components/dgramBlock/DgramBlock";
import Spinner from '../../components/spinner/Spinner';
import useSyrve from '../../hooks/syrve.hooks';
import {
    countingStart,
    countingEnd,
    setStartDate,
    setEndDate
} from './dashboardSlice';
import './dashboard.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { RangePicker } = DatePicker;

    const { countingStatus, startDate, endDate } = useSelector(state => state.dashboard);
    const { syrveToken, organizations } = useSyrve();
    const [diagrams, setDiagrams] = useState(null);
    const [selectedDates, setSelectedDates] = useState({ start: startDate, end: endDate });

    const buildDiagrams = (from, to) => {
        const diagrams = organizations ? organizations.map(({ name, id }) => {
            return <DgramBlock id={id} name={name} from={from} to={to} key={id} />
        }) : null
        return diagrams
    }

    const handleRangeChange = (dates, dateStrings) => {
        setSelectedDates({ start: dateStrings[0], end: dateStrings[1] });
    };

    const handleCountClick = () => {
        const newDiagrams = buildDiagrams(selectedDates.start, selectedDates.end);
        setDiagrams(newDiagrams);
    };

    /*когда пдтянется список организаций, для каждой строим диаграмму на сегодня */
    useEffect(() => {
        handleCountClick()
    }, [organizations])

    return (
        <>
            <Helmet>
                <meta name="description" content="Dashboard | Logistic Management App" />
                <title>Dashboard | MisoMove</title>
            </Helmet>
            <div className="container">
                <div className="board__heading">
                    <h5 className="fw700">
                        <i className="Small material-icons c-action">insert_chart</i>
                        Statuses duration
                    </h5>
                    <div className="board__filters font ">
                        <RangePicker
                            placeholder={[startDate, endDate]}
                            onChange={handleRangeChange}
                            onOk={handleRangeChange}
                        />
                        <Button onClick={handleCountClick}>count</Button>
                    </div>
                </div>
            </div>

            <div className="f-container container">
                {diagrams ? diagrams : <Spinner />}
            </div>
        </>
    )
}

export default Dashboard;