import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import ApiService from '../../services/apiService';
import M from 'materialize-css';
import './admin.scss';

const Admin = () => {

    const apiService = new ApiService();

    const [disabledBtn, setDisabledBtn] = useState('');

    const handleSubmit = (value) => {
        setDisabledBtn('disabled');
        apiService.register(value)
            .then((result) => result.json())
            .then((data) => M.toast({ html: `${data.message}` }));
        setDisabledBtn('');
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
        <div className="form-wrapper">
            <div className="form-heading">
                Add new user
            </div>
            <form className="form" onSubmit={formik.handleSubmit}>
                <input
                    id='login'
                    name='login'
                    type='text'
                    placeholder='Username'
                    value={formik.values.login}
                    onChange={formik.handleChange} />
                <input
                    id='password'
                    name='password'
                    type='password'
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
                <button className={`btn waves-effect waves-light right-align ${disabledBtn}`} type="submit" name="action">add
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

export default Admin;