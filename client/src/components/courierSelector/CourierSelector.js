import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { TrackerContext } from '../../context/TrackerContext';
import { setCourierID } from '../../pages/tracker/trackerSlice';
import './courierSelector.scss';

const CourierSelector = () => {

    const dispatch = useDispatch();
    const { couriers } = useContext(TrackerContext);

    const options = [];

    for (let i in couriers) {
        const { id, name } = couriers[i];
        options.push(<Option id={id} key={id} text={name} />)
    }



    return (
        <select
            onChange={(e) => dispatch(setCourierID(e.target.value))}
            className='k-selector'>
            <Option id={"all"} key={"222"} text="Всі кур'єри" />
            {options}
        </select>
    )
}

const Option = ({ id, text }) => {
    const { showCouriers } = useSelector(state => state.tracker);
    return (
        <option
            className="k-selector__option"
            value={id}
            selected={id === showCouriers}>
            {text}
        </option>
    )
}

export default CourierSelector;