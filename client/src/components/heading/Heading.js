import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CommonContext } from '../../context/CommonContext';
import Logo from '../logo/Logo';
import Navigation from '../navigation/Navigation';
import './heading.scss';

const Heading = () => {
    const { isAdmin, isAuthenticated, userLogin, logout } = useContext(CommonContext);
    const navigate = useNavigate();
    const [openSlide, setOpenSlide] = useState(false);

    return (
        <>
            <header className='header'>
                <Logo />
                <Navigation />
                <div className="header_links">
                    <div className="userlogin">
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

            <header className='header_mob'>
                {isAuthenticated ?
                    <i title="Open menu" onClick={() => setOpenSlide(!openSlide)}
                        className="material-icons pressable">menu</i> : null}
                <Logo />
                <div className="header_links">
                    {isAdmin ?
                        <i title="Settings" onClick={() => navigate('/admin')}
                            className="material-icons pressable">settings</i>
                        : null}
                    {isAuthenticated ?
                        <i title="Logout" onClick={logout} className="material-icons pressable">exit_to_app</i>
                        : null}
                </div>
            </header>

            <div className={`overlay ${openSlide ? "slided" : ''}`}></div>

            <div
                className={`slide-menu ${openSlide ? "slided" : ''}`}
                onClick={() => setOpenSlide(!openSlide)}>
                <i title="Close" id="close-icon" onClick={() => setOpenSlide(!openSlide)} className="material-icons pressable">close</i>
                <Navigation />
            </div>

        </>

    )
}

export default Heading;