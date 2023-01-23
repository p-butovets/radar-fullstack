import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CommonContext } from '../../context/CommonContext';
import './heading.scss';

const Heading = (props) => {
    const context = useContext(CommonContext);
    const navigate = useNavigate();

    const { title, subtitle, icon } = props;

    const clickHandler = () => {
        navigate('/admin')
    }

    return (
        <header className='header'>
            <div className="header_logo">
                <div className="header_title">
                    <i className="small material-icons">{icon}</i>
                    {title}
                </div>
                <div className="header_subtitle">{subtitle}</div>
            </div>
            <div className="header_buttons">
                {context.isAdmin ?
                    <i title="Settings" onClick={clickHandler} className="small material-icons pressable">settings</i>
                    : null}
                <i title="Logout" onClick={context.logout} className="small material-icons pressable">exit_to_app</i>
            </div>
        </header>
    )
}

export default Heading;