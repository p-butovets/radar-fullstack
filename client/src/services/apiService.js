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

    register = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        const response = await fetch('/admin/register', requestOptions)
        return response
    }

    getallusers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('/admin/getallusers', requestOptions)
        return response
    }

    deleteUser = async (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        const response = await fetch('/admin/deleteuser', requestOptions)
        return response
    }

}

export default ApiService;