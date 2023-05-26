import logo from '../../resources/logo.png';
import './logo.scss';

const Logo = () => {
    return (
        <div className="logo">
            <img className="logo__img" src={logo} alt="logo" />
            <a className="logo__text" href="/">MisoMove</a>
        </div>
    )
}

export default Logo;