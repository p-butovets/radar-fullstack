import { useDispatch, useSelector } from 'react-redux';
import { setKitchenID } from '../../pages/tracker/trackerSlice';

import { useContext } from 'react';
import { TrackerContext } from '../../context/TrackerContext';
import config from '../../data/common.conf.json'
import './kitchenSelector.scss';

const KitchenSelector = () => {

    const dispatch = useDispatch();
    const { organizations } = useContext(TrackerContext);

    const options = organizations.map(({ id, name }) => {
        return (
            config.IGNORED_ORGANIZATIONS.includes(id) ? null :
                <Option id={id} key={id} text={name} />
        );
    });

    return (
        <select
            onChange={(e) => dispatch(setKitchenID(e.target.value))}
            className="k-selector">
            <Option id={"all"} key={"111"} text="Всі кур'єри" />
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

export default KitchenSelector;