import './heading.scss';

const Heading = (props) => {
    const { title, subtitle, icon } = props;
    return (
        <section className="heading">
            <i className="small material-icons">{icon}</i>
            <span className="heading_title">{title}</span>
            <span className="heading_subtitle">{subtitle}</span>
        </section>
    )
}

export default Heading;