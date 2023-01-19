import { useEffect, useState, useRef } from 'react';
import './button.scss';

const Button = (props) => {
    const [isActive, setActive] = useState()

    const { id, text, active, addNewRefToRefs, toggleActiveClass, setVisibleOrganization } = props;

    const buttonRef = useRef(null);

    /* Когда создался элемент*/
    useEffect(() => {
        // 1. реф добавить в список рефов 
        addNewRefToRefs(buttonRef)

        // 2. установить isActive из props
        setActive(active)
        // eslint-disable-next-line
    }, [])

    return (
        <div
            ref={buttonRef}
            className={`button ${isActive ? 'button-active' : ''}`}
            onClick={() => {
                toggleActiveClass(buttonRef);
                setVisibleOrganization(id);
            }}
        >
            {text}
        </div>
    )
}

export default Button;