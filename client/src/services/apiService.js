import { Component } from 'react';

class ApiService extends Component {

    login = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        const response = await fetch('/admin/login', requestOptions)
        return response
    }

}

export default ApiService;