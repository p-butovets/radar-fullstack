import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import ApiService from '../../services/apiService';
import M from 'materialize-css';
import './admin.scss';

const Admin = () => {

    const apiService = new ApiService();

    const handleSubmit = (value) => {
        apiService.register(value)
            .then((result) => result.json())
            .then((data) => M.toast({ html: `${data.message}` }));
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            isAdmin: false
        },
        onSubmit: values => handleSubmit(JSON.stringify(values, null, 2))
    })

    return (
        <>
            <div className="subtitle">Add new user</div>
            <form
                onSubmit={formik.handleSubmit}
                className="add-user_form">
                <div className="add-user_wrapper">
                    <input
                        id='add-user-login'
                        name='login'
                        type='text'
                        placeholder='Username'
                        value={formik.values.login}
                        onChange={formik.handleChange} />
                    <input
                        id='add-user-password'
                        name='password'
                        type='text'
                        placeholder='Password'
                        value={formik.values.password}
                        onChange={formik.handleChange} />
                    <label>
                        <input
                            type="checkbox"
                            id='isAdmin'
                            name='isAdmin'
                            value={formik.values.isAdmin}
                            onChange={formik.handleChange}
                        />
                        <span>Administartor</span>
                    </label>
                    <button
                        className="btn"
                        type="submit"
                        name="action">
                        <i className="material-icons">add_circle_outline</i>
                    </button>
                </div>
            </form>
            <div className="subtitle">Users</div>
        </>
    )
}

export default Admin;