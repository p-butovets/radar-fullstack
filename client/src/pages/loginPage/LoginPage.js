import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import ApiService from '../../services/apiService';
import { CommonContext } from '../../context/CommonContext';
import M from 'materialize-css';
import './loginPage.scss';

const LoginPage = () => {

    const [disabledBtn, setDisabledBtn] = useState('');

    const apiService = new ApiService();
    const context = useContext(CommonContext);

    const handleSubmit = (value) => {
        setDisabledBtn('disabled');
        apiService.login(value)
            .then((result) => result.json())
            .then((data) => {
                M.toast({ html: `${data.message}` });
                if (data.token) {
                    context.login(data.token, data.isAdmin, data.userId)
                }
            });
        setDisabledBtn('');
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: values => handleSubmit(JSON.stringify(values, null, 2))
    })


    return (
        <div className="form-wrapper">
            <div className="form-heading">
                Hello
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
                <button className={`btn waves-effect waves-light ${disabledBtn}`} type="submit" name="action">login
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    );
}

export default LoginPage;