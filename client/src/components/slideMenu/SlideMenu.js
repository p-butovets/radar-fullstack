import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CommonContext } from '../../context/CommonContext';
import Navigation from '../navigation/Navigation';
import disableScroll from 'disable-scroll';
import './slideMenu.scss';
import { toggleMenu } from './slideMenuSlice';

const SlideMenu = () => {
    const navigate = useNavigate();
    const { isAdmin, isAuthenticated, userLogin, logout } = useContext(CommonContext);
    const dispatch = useDispatch();
    const { openMenu } = useSelector(state => state.slideMenu);

    useEffect(() => {
        openMenu ? disableScroll.on() : disableScroll.off()
    }, [openMenu])

    return (
        <>
            <div className={`overlay ${openMenu ? "slided" : ''}`}></div>
            <div
                className={`slide-menu ${openMenu ? "slided" : ''}`}
                onClick={() => dispatch(toggleMenu())}>
                <i title="Close" id="close-icon" className="material-icons pressable">close</i>
                <Navigation />
                <div className="slide-menu__footer">
                    {isAdmin ?
                        <div onClick={() => navigate('/admin')}
                            className="slide-menu__footer-item">
                            <i title="Settings" className="material-icons pressable">settings</i>
                            Settings
                        </div> : null}
                    {isAuthenticated ?
                        <div onClick={logout} className="slide-menu__footer-item">
                            <i title="Logout" className="material-icons pressable">exit_to_app</i>
                            Logout
                        </div> : null}
                </div>
            </div>
        </>
    )
}

export default SlideMenu;