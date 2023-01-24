import './card.scss';

const Card = (props) => {

    const { cardTitle, children } = props;

    return (
        <div className='card-wrapper'>
            <div className="card-box">
                <div className="card-title">{cardTitle}</div>
                <div className="card-content">{children}</div>
            </div>
        </div>
    )
}

export default Card;