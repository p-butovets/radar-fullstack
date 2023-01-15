import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import SyrveCloudService from "./services/service";


function App() {

	/* экземпляр сервиса SyrveCloud*/
	const syrveCloud = new SyrveCloudService();

	const [token, setToken] = useState(null)
	const [organizations, setOrganizations] = useState(null)

	/*work with token */
	const onTokenRefreshed = (newToken) => setToken(newToken)

	const refreshToken = () => {
		syrveCloud.authorize()
			.then((result) => result.json())
			.then((data) => onTokenRefreshed(data.token));
	};

	/*work with organisation list*/
	const onOrganisationsRefreshed = (data) => setOrganizations(data)

	const refreshOrganisations = () => {
		syrveCloud.organizations(token)
			.then((result) => result.json())
			.then((data) => onOrganisationsRefreshed(data));
	}

	/*когда рендерится компонент*/
	useEffect(() => {
		/* 1. запускаем обновление инфы с интервалом
		Выполняем refreshToken, к нему привязан useEffect */
		refreshToken()
		setInterval(() => refreshToken(), 20000);
		// eslint-disable-next-line
	}, []);

	/*когда обновился токен */
	useEffect(() => {
		/* 2. обновляем инфу по организациям*/
		refreshOrganisations(token)
	}, [token])

	return (
		<div className="container"></div>
	);
}

export default App;
