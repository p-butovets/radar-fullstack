import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CommonContext } from '../../context/CommonContext';
import './heading.scss';

const Heading = (props) => {
    const context = useContext(CommonContext);
    const navigate = useNavigate();

    const { title } = props;

    const clickHandler = () => {
        navigate('/admin')
    }

    return (
        <header className='header'>
            <a className="header_title" href="/">{title}</a>
            <div className="header_links">
                <div className="userlogin blue-text text-darken-2">
                    {context.userLogin}
                </div>
                {context.isAdmin ?
                    <i title="Settings" onClick={clickHandler}
                        className="material-icons pressable">settings</i>
                    : null}
                {context.isAuthenticated ?
                    <i title="Logout" onClick={context.logout} className="material-icons pressable">exit_to_app</i>
                    : null}
            </div>
        </header>
    )
}

export default Heading;