import { useState, useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import Heading from '../../components/heading/Heading';
import './tracker.scss';

const Tracker = () => {

    const context = useContext(CommonContext)

    return (
        <Heading
            title="GPS tracking app"
            subtitle="GPS tracking app"
            icon="location_on"
        />
    )
}

export default Tracker;