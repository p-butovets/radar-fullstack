import './badge.scss';

const Badge = (props) => {

    let text;
    let colorClass;
    const status = props.status;

    if (status === "OnWay") {
        text = "в дорозі"
        colorClass = "green";
    } else if (status === "CookingCompleted") {
        text = "готово"
        colorClass = "yellow";
    } else if (status === "CookingStarted") {
        text = "готується"
        colorClass = "yellow";
    } else if (status === "WaitCooking") {
        text = "очікує"
        colorClass = "gray";
    } else if (status === "Unconfirmed") {
        text = "не підтверджена"
        colorClass = "gray";
    } else {
        text = "невідомий статус"
        colorClass = "gray";
    }

    return (
        <div className={`status_badge ${colorClass}`}>{text}</div>
    )
}

export default Badge;