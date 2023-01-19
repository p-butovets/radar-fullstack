import { useEffect, useState, useRef } from 'react';
import config from '../../data/common.conf.json'
import './button.scss';

const Button = (props) => {
    const [isActive, setActive] = useState()

    /*Тут храним лат и лонг организации, чтобы по клику на кнопку установить mapCenter */
    const [location, setLocation] = useState(null)

    const { organizations, id, text, active, addNewRefToRefs, toggleActiveClass, setVisibleOrganization, setMapCenter } = props;

    const buttonRef = useRef(null);

    const getOrganizationLocation = (id) => {
        for (let i in organizations) {
            if (organizations[i].id === id) {
                return [organizations[i].latitude, organizations[i].longitude]
            }
        }
    }

    /* Когда создался элемент*/
    useEffect(() => {
        // 1. реф добавить в список рефов 
        addNewRefToRefs(buttonRef)

        // 2. установить isActive из props
        setActive(active)
        // eslint-disable-next-line

        //3. определяем и устанвливаем локейшн
        setLocation(getOrganizationLocation(id))
    }, [])

    return (
        <div
            ref={buttonRef}
            className={`button ${isActive ? 'button-active' : ''}`}
            onClick={() => {
                toggleActiveClass(buttonRef);
                setVisibleOrganization(id);
                setMapCenter(location ? location : config.DEFAULT_MAP_CENTER);
            }}
        >
            {text}
        </div>
    )
}

export default Button;
