import Badge from '../badge/Badge';
import './orderBlock.scss';

const OrderBlock = (props) => {

    const { status, completeBefore, deliveryPoint, number } = props.orderInfo;
    const deadline = completeBefore.split(' ')[1].slice(0, -7);

    const { address } = deliveryPoint;
    const deliveryTo = `${address.street.name}, ${address.house}`

    return (
        <li>
            <Badge status={status} />
            <div className="order">
                <div className="time">{deadline}</div>
                <div className="order-address">{deliveryTo}</div>
                <div className="order-number">{number}</div>
            </div>
        </li>
    )
}

export default OrderBlock;