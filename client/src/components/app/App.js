import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from '../../routes';
import { CommonContext } from '../../context/CommonContext';
import useLogin from '../../hooks/login.hooks';
import Heading from '../heading/Heading';



function App() {
	const { login, logout, userToken, userId, isAdmin, userLogin } = useLogin();
	const isAuthenticated = !!userToken;
	const routes = useRoutes(isAuthenticated, isAdmin);
	return (
		<CommonContext.Provider value={{ login, logout, userToken, userId, isAdmin, isAuthenticated, userLogin }}>
			<Router>
				<Heading />
				{routes}
			</Router>
		</CommonContext.Provider>
	)
}
export default App;
