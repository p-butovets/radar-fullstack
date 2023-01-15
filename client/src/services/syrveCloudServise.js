import { Component } from 'react';

class SyrveCloudService extends Component {

    authorize = async () => {
        const response = await fetch(`/api/auth`)
        return response
    }

    organizations = async (token) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        };
        const response = await fetch(`/api/organizations`, requestOptions);
        return response
    }
}

export default SyrveCloudService;