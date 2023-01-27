import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from '../../routes';
import { CommonContext } from '../../context/CommonContext';
import useLogin from '../../hooks/login.hooks';

import Heading from '../heading/Heading';
import Footer from '../footer/Footer';

import Spinner from "../spinner/Spinner";

import ButtonGroup from '../buttonGroup/ButtonGroup';
import Map from "../map/Map";
import SyrveCloudService from "../../services/syrveCloudService";
import config from '../../data/common.conf.json'


function App() {
	const { login, logout, userToken, userId, isAdmin, userLogin } = useLogin();
	const isAuthenticated = !!userToken;
	const routes = useRoutes(isAuthenticated, isAdmin);
	return (
		<CommonContext.Provider value={{ login, logout, userToken, userId, isAdmin, isAuthenticated, userLogin }}>
			<Router>
				<Heading title="Courier Tracking" />
				{routes}
			</Router>
		</CommonContext.Provider>
	)

	// /*surveCloud token */
	// const [token, setToken] = useState(null)

	// /*храним organizations data */
	// const [organizations, setOrganizations] = useState(null)

	// /*закончилась ли загрузка данных */
	// const [loading, setLoading] = useState(true);

	// /* ID видимой на карте организации 
	// Если null, то будут показаны курьеры всех организаций */
	// const [visbleOrganization, setVisibleOrganization] = useState(null);

	// /*по дефолту центр карты по Киеву */
	// const [mapCenter, setMapCenter] = useState(config.DEFAULT_MAP_CENTER);

	// /*Чтобы убрать спиннер загрузки*/
	// const onLoaded = () => {
	// 	// M.toast({ html: 'I am a toast!', classes: 'rounded' });
	// 	setLoading(false);
	// };

	// /* экземпляр сервиса SyrveCloud*/
	// const syrveCloud = new SyrveCloudService();

	// /*work with token */
	// const onTokenRefreshed = (newToken) => setToken(newToken)

	// const refreshToken = () => {
	// 	syrveCloud.authorize()
	// 		.then((result) => result.json())
	// 		.then((data) => onTokenRefreshed(data.token));
	// };

	// /*work with organisation list*/
	// const onOrganizationsRefreshed = (data) => {
	// 	setOrganizations(data);
	// 	onLoaded();
	// };

	// const refreshOrganizations = () => {
	// 	syrveCloud.organizations(token)
	// 		.then((result) => result.json())
	// 		.then((data) => onOrganizationsRefreshed(data.organizations));
	// }



	// /***** WORKFLOW HERE *****/

	// /*когда рендерится компонент*/
	// useEffect(() => {
	// 	/* 1. запускаем обновление инфы с интервалом
	// 	Выполняем refreshToken, к нему привязан useEffect */
	// 	refreshToken()
	// 	setInterval(() => refreshToken(), 20000);
	// 	// eslint-disable-next-line
	// }, []);

	// /*когда обновился токен */
	// useEffect(() => {
	// 	/* 2. обновляем инфу по организациям*/
	// 	if (token) { refreshOrganizations(token) }
	// }, [token])

	// /* когда обновилась инфа по организациям */
	// /*получаем заказы для всех организаций*/


	// /***** RETURN HERE *****/
	// return (
	// 	<div className="App">
	// 		{loading ? <Spinner /> :
	// 			<View
	// 				organizations={organizations}
	// 				setVisibleOrganization={setVisibleOrganization}
	// 				mapCenter={mapCenter}
	// 				setMapCenter={setMapCenter}
	// 			/>}
	// 	</div>
	// );
}

// const View = (props) => {

// 	// const { terminals, setVisibleTerminal, couriers, visbleTerminal, token, actualOrders, allOrders } = props;
// 	const { organizations, setVisibleOrganization, mapCenter, setMapCenter } = props;

// 	return (
// 		<>
// 			<Heading
// 				title="GPS tracking app"
// 				subtitle="GPS tracking app"
// 				icon="location_on"
// 			/>
// 			<ButtonGroup
// 				organizations={organizations}
// 				setVisibleOrganization={setVisibleOrganization}
// 				setMapCenter={setMapCenter}
// 			/>
// 			<Map
// 				mapCenter={mapCenter}
// 			/>
// 		</>
// 	)
// }

export default App;
