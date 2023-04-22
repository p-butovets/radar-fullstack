import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CommonContext } from '../../context/CommonContext';
import Logo from '../logo/Logo';
import Navigation from '../navigation/Navigation';
import './heading.scss';

const Heading = () => {
    const { isAdmin, isAuthenticated, userLogin, logout } = useContext(CommonContext);
    const navigate = useNavigate();

    return (
        <header className='header'>
            <Logo />
            <Navigation />
            <div className="header_links">
                <div className="userlogin ">
                    {userLogin}
                </div>
                {isAdmin ?
                    <i title="Settings" onClick={() => navigate('/admin')}
                        className="material-icons pressable">settings</i>
                    : null}
                {isAuthenticated ?
                    <i title="Logout" onClick={logout} className="material-icons pressable">exit_to_app</i>
                    : null}
            </div>
        </header>
    )
}

export default Heading;