import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
// import About from './views/About/About';
import About from './views/About/About';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register.jsx';
import Dogs from './views/Dogs/Dogs.jsx';
import { useLocation } from 'react-router-dom';
import LoginView from './views/Login/Login.jsx';
import Landing from './components/Landing/Landing';
import Products from './views/Products/Products.jsx';
import NotFound from './components/NotFound/NotFound';
import AdoptionForm from './components/Forms/AdoptionForm/AdoptionForm';
import ProductDetail from './components/CardDetail/ProductDetail/ProductDetail';
import MyReviews from './views/MyReviews/MyReviews';
import UserSettings from './views/UserSettings/UserSettings';
import Donation from './views/Donation/Donation';
import Success from './components/Modals/Success';
import SuccessDonation from './components/Modals/SuccessDonation';
import * as dogsAction from '../src/_redux/actions/dogsAction';
import * as productsAction from '../src/_redux/actions/productsAction';
import * as authActions from './_redux/actions/authAction';
import * as requestAction from './_redux/actions/requestAction';
import * as reviewsAction from './_redux/actions/reviewsAction';
import * as mercadopagoAction from './_redux/actions/mercadopagoAction';

import BackDrop from './components/BackDrop/BackDrop';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Dashboard from './views/Dashboard/Dashboard';

// import CreateProductForm from './components/Forms/CreateProductForm/CreateProductForm';
import ConfirmAccount from './components/AuthForms/ConfirmAccount/ConfirmAccount';
import RequestPasswordReset from './components/AuthForms/RequestPasswordReset/RequestPasswordReset';
import PasswordReset from './components/AuthForms/PasswordReset/PasswordReset';
import Overlay from './components/Overlay/Overlay';
import Cart from './components/Carts/Cart/Cart';
import TestComponent from './components/testComponent/TestComponent';


function App() {
	const location = useLocation();
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.authReducer);

	useEffect(() => {
		dispatch(authActions.authUserAction());
		dispatch(dogsAction.getDogs());
		dispatch(dogsAction.getTemperaments());
		dispatch(dogsAction.getDogsColors());
		dispatch(dogsAction.genders());
		dispatch(productsAction.getProducts());
		dispatch(requestAction.getAdoptionDog());
		dispatch(authActions.getUsers());
		dispatch(reviewsAction.getReviews());
		dispatch(mercadopagoAction.getOrders());
		dispatch(mercadopagoAction.getPurchases());
		dispatch(productsAction.getCategoriesAction());

		if (localStorage.getItem('products')) {
			if (JSON.parse(localStorage.getItem('products')).length)
				dispatch(
					productsAction.setItemsAction(
						JSON.parse(localStorage.getItem('products')),
					),
				);
		}
	}, [dispatch]);

	return (
		<>
			{/* <Header/>  */}
			{location.pathname !== '/' &&
				location.pathname !== '/login' &&
				location.pathname !== '/register' &&
				location.pathname !== '/request-password-reset' &&
				location.pathname !== '/password-reset' &&
				location.pathname !== '/form' &&
				location.pathname !== '/products/success' &&
				location.pathname !== '/donation/success_donation' &&
				(!location.pathname.includes('/dashboard') ||
					selector.user?.role !== 'Administrador') && <Nav />}
			<Routes>
				<Route path={'/'} element={<Landing />} />
				<Route path={'/testComponent'} element={<TestComponent />} />
				<Route path={'/home'} element={<Home />} />
				<Route path={'/about'} element={<About />} />
				<Route path={'/register'} element={<Register />} />
				<Route path={'/login'} element={<LoginView />} />
				<Route path={'/form'} element={<AdoptionForm />} />
				<Route path={'/dogs'} element={<Dogs />} />
				<Route path={'/myreviews'} element={<MyReviews />} />
				{selector.user &&
					<Route path={'/account'} element={<UserSettings />} />
				}
				<Route path={'/products'} element={<Products />} />
				<Route path={'/products/:id'} element={<ProductDetail />} />
				<Route path={'/donation'} element={<Donation />} />
				<Route path={'/about'} element={<About />} />
				<Route path={'/products/success'} element={<Success />} />
				<Route
					path={'/donation/success_donation'}
					element={<SuccessDonation />}
				/>

				<Route path={'*'} element={<NotFound />} />
				{selector.user?.role === 'Administrador' && (
					<Route path={'/dashboard/*'} element={<Dashboard />} />
				)}
				<Route path={'/confirm-account'} element={<ConfirmAccount />} />
				<Route
					path={'/request-password-reset'}
					element={<RequestPasswordReset />}
				/>
				<Route path={'/password-reset'} element={<PasswordReset />} />
			</Routes>
			{location.pathname !== '/' &&
				location.pathname !== '/login' &&
				location.pathname !== '/register' &&
				location.pathname !== '/request-password-reset' &&
				location.pathname !== '/password-reset' &&
				location.pathname !== '/form' &&
				location.pathname !== '/products/success' &&
				location.pathname !== '/donation' &&
				location.pathname !== '/donation/success_donation' &&
				(!location.pathname.includes('/dashboard') ||
					selector.user?.role !== 'Administrador') && <Footer />}

			{location.pathname !== '/products/success' &&
				location.pathname !== '/donation/success_donation' && <BackDrop />}
			<Overlay />
			<Cart />
			{/* <Footer/> */}
		</>
	);
}

export default App;
