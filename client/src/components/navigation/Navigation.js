import { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import { NavLink } from "react-router-dom";
import './navigation.scss';

const Navigation = () => {

    const { isAdmin } = useContext(CommonContext);

    return (
        <>
            {isAdmin ?
                <div className="nav">
                    <NavLink to="/tracker"
                        className="nav__item"
                        activeClassName="active">Tracker
                    </NavLink>
                    <NavLink to="/dashboard"
                        className="nav__item"
                        activeClassName="active">Dashboard<sup className='sup-badge'>new</sup>
                    </NavLink>
                </div> : null}
        </>
    )
}

export default Navigation;