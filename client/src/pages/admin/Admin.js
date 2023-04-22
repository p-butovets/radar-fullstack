import { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { CommonContext } from '../../context/CommonContext';
import { Helmet } from "react-helmet";
import Card from '../../components/card/Card';
import UserList from '../../components/userList/UserList';
import ApiService from '../../services/apiService';
import M from 'materialize-css';
import './admin.scss';

const Admin = () => {

    const apiService = new ApiService();
    const context = useContext(CommonContext);

    const [users, setUsers] = useState([]);

    //получает всех юзеров из БД и устанваливает в стейт
    const refreshUsers = () => {
        apiService.getallusers()
            .then((result) => result.json())
            .then((data) => setUsers(data));
    }

    //удаляет юзера по логину из БД и вызывает onUserChanged
    const deleteUser = (login) => {
        apiService.deleteUser(JSON.stringify({ login: login }))
            .then((result) => result.json())
            .then((data) => onUserChanged(data));
    }

    //урегистрирует юзера в БД по данным из формы и вызывает onUserChanged
    const registerUser = (value) => {
        apiService.register(value)
            .then((result) => result.json())
            .then((data) => onUserChanged(data));
    }

    //показывает тост с ответом сервера об изменениях и вызывает обновление стейта юзеров
    const onUserChanged = (data) => {
        M.toast({ html: `${data.message}` });
        refreshUsers();
    }

    // добавляем в контекст функцию удаления юзера
    context.deleteUser = deleteUser;


    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            isAdmin: false
        },
        onSubmit: values => registerUser(JSON.stringify(values, null, 2))
    })


    // когда первый рендер, получаем всех юзеров из БД
    useEffect(() => {
        refreshUsers();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Helmet>
                <meta name="description" content="Admin | Logistic Management App" />
                <title>Admin | MisoMove</title>
            </Helmet>
            <Card cardTitle={"Add new user"}>
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
                            <i className="material-icons button-i">add_circle_outline</i>
                        </button>
                    </div>
                </form>
            </Card>
            <Card cardTitle={"Manage users"}>
                <UserList users={users} />
            </Card>
        </>
    )
}

export default Admin;