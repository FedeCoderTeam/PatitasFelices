import { Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
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
import Form from './components/Form/Form';
import ProductDetail from './components/ProductDetail/ProductDetail';
import * as dogsAction from '../src/_redux/actions/dogsAction';
import * as productsAction from '../src/_redux/actions/productsAction';
import * as authActions from './_redux/actions/authAction';
import BackDrop from './components/BackDrop/BackDrop';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
        dispatch(authActions.authUserAction())
		dispatch(dogsAction.getDogs());
		dispatch(dogsAction.getTemperaments());
		dispatch(dogsAction.getDogsColors());
		dispatch(dogsAction.genders());
		dispatch(productsAction.getProducts());
	}, [dispatch]);

	return (
		<>
			{/* <Header/>  */}
			{location.pathname !== '/' &&
				location.pathname !== '/login' &&
				location.pathname !== '/register' &&
				location.pathname !== '/form' && <Nav />}

			<Routes>
				<Route path={'/'} element={<Landing />} />
				<Route path={'/home'} element={<Home />} />
				<Route path={'/about'} element={<About />} />
				<Route path={'/register'} element={<Register />} />
				<Route path={'/login'} element={<LoginView />} />
				<Route path={'/form'} element={<Form />} />
				<Route path={'/dogs'} element={<Dogs />} />
				<Route path={'/products'} element={<Products />} />
				<Route path={'/products/:id'} element={<ProductDetail />} />
				<Route path={'*'} element={<NotFound />} />
			</Routes>
			{location.pathname !== '/' &&
				location.pathname !== '/login' &&
				location.pathname !== '/register' &&
				location.pathname !== '/form' && <Footer />}
            <BackDrop/>
			{/* <Footer/> */}
		</>
	);
}

export default App;
