import { useState } from 'react';
import Button from '../button/Button';
import config from '../../data/common.conf.json'
import './buttonGroup.scss';

const ButtonGroup = (props) => {
    /*получаем список терминалов доставки */
    const { organizations, setVisibleOrganization, setMapCenter } = props;

    /*Хранятся рефы кнопок, чтобы снимать className active */
    const [buttonRefs, setButtonsRefs] = useState([])

    /*Эту функцию передаем в кнопки, чтобы собрать рефы в buttonRefs*/
    const addNewRefToRefs = (newRef) => {
        setButtonsRefs(refs => ([...refs, newRef]))
    }
    /*Функция снимает className active со всех кнопок */
    const toggleActiveClass = (ref) => {
        for (let i in buttonRefs) {
            const name = buttonRefs[i] === ref ? 'button button-active' : 'button '
            buttonRefs[i].current.className = name
        }
    }

    /*Формируем кнопку для каждого теминала доставки */
    const buttons = organizations.map((i) => {
        /*если айди организации не в списке игнорируемых*/
        return (
            config.IGNORED_ORGANIZATIONS.includes(i.id) ? null :
                <Button
                    id={i.id}
                    key={i.id}
                    text={i.name}
                    addNewRefToRefs={addNewRefToRefs}
                    active={false}
                    setVisibleOrganization={setVisibleOrganization}
                    toggleActiveClass={toggleActiveClass}
                    setMapCenter={setMapCenter}
                    organizations={organizations}
                />
        );
    });



    return (
        <section className="btn-warpper">
            <Button // одна дополнителная кнопка, чтобы показать всех курьеров
                //ЧТобы показать всех курьеров - этой кнопкой ставим id видимого терминала null
                id={null}
                key={"111-222-333"}
                text="Всі кур'єри"
                addNewRefToRefs={addNewRefToRefs}
                active={true}
                setVisibleOrganization={setVisibleOrganization}
                toggleActiveClass={toggleActiveClass}
                setMapCenter={setMapCenter}
                organizations={organizations}
            />
            {buttons}
        </section>
    )
}

export default ButtonGroup;