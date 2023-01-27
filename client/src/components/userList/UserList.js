import { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import './userList.scss';

const UserList = (props) => {

    const userItems = props.users.map(i => {
        return (
            <User id={i._id} login={i.login} isAdmin={i.isAdmin} key={i._id} />
        )
    })

    return (
        <table className="userlist">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {userItems}
            </tbody>
        </table>
    )
}

const User = (props) => {
    const context = useContext(CommonContext);
    const { id, login, isAdmin } = props;

    const isYou = context.userId === id ? '(you)' : null;
    const badgeColor = isAdmin ? 'red' : 'blue';
    const badgeText = isAdmin ? 'admin' : 'user';

    return (
        <tr>
            <td className="blue-text text-darken-2">
                {login}<span className='you'>{isYou}</span>
            </td>
            <td>
                <span className={`new badge ${badgeColor}`} data-badge-caption={badgeText}></span>
            </td>
            <td onClick={() => context.deleteUser(login)}>
                <i title="Remove" className="material-icons pressable">delete</i>
            </td>
        </tr>
    )
}

export default UserList;