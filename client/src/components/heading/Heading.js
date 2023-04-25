import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CommonContext } from '../../context/CommonContext';
import { useDispatch } from 'react-redux';
import Logo from '../logo/Logo';
import Navigation from '../navigation/Navigation';
import SlideMenu from '../slideMenu/SlideMenu';

import { toggleMenu } from '../slideMenu/slideMenuSlice';
import './heading.scss';

const Heading = () => {
    const { isAdmin, isAuthenticated, userLogin, logout } = useContext(CommonContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    <i title="Open menu" onClick={() => dispatch(toggleMenu())}
                        className="material-icons pressable">menu</i> : null}
                <Logo />
                {isAuthenticated ?
                    <i title="Open menu" onClick={() => dispatch(toggleMenu())}
                        className="material-icons pressable">more_horiz</i> : null}
            </header>
            <SlideMenu />
        </>
    )
}

export default Heading;