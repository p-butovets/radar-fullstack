import { useState, useEffect } from 'react';
import Spinner from "../spinner/Spinner";
import Heading from '../heading/Heading';
import SyrveCloudService from "../../services/syrveCloudServise";
import M from 'materialize-css';


function App() {
	/*surveCloud token */
	const [token, setToken] = useState(null)
	/*храним organizations data */
	const [organizations, setOrganizations] = useState(null)
	/*закончилась ли загрузка данных */
	const [loading, setLoading] = useState(true);

	/*Чтобы убрать спиннер загрузки*/
	const onLoaded = () => {
		// M.toast({ html: 'I am a toast!', classes: 'rounded' });
		setLoading(false);
	};

	/* экземпляр сервиса SyrveCloud*/
	const syrveCloud = new SyrveCloudService();

	/*work with token */
	const onTokenRefreshed = (newToken) => setToken(newToken)

	const refreshToken = () => {
		syrveCloud.authorize()
			.then((result) => result.json())
			.then((data) => onTokenRefreshed(data.token));
	};

	/*work with organisation list*/
	const onOrganisationsRefreshed = (data) => {
		setOrganizations(data);
		onLoaded();
	};

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
		if (token) { refreshOrganisations(token) }
	}, [token])

	return (
		<div className="App">
			{loading ? <Spinner /> : <View />}
		</div>
	);
}

const View = (props) => {

	// const { terminals, setVisibleTerminal, couriers, visbleTerminal, token, actualOrders, allOrders } = props;

	return (
		<>
			<Heading
				title="GPS tracking app"
				subtitle="GPS tracking app"
				icon="location_on"
			/>
		</>
	)
}

export default App;
