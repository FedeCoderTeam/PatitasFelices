import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
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
import dogDetailCard from './components/Cards/dogDetailCard/dogDetailCard';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as authActions from './_redux/actions/authAction';
import BackDrop from './components/BackDrop/BackDrop';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {

  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(authActions.authUserAction())
  }, [dispatch])

  return (
    <>
      {/* <Header/>  */}
      { location.pathname !=='/' && location.pathname !=='/login' && location.pathname !=='/register' && location.pathname !=='/form' && <Nav />} 
      
      <Routes>
          <Route path={'/'} element={<Landing/>} />
          <Route path={'/home'} element={<Home/>} />
          <Route path={'/about'} element={<About/>} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<LoginView />} /> 
          <Route path={'/form'} element={<Form />} />
          <Route path={'/dogs'} element={<Dogs />}/>
          <Route path={'/products'} element={<Products />} />
          <Route path={'/products/:id'} element={<ProductDetail />} />
          <Route path={'*'} element={<NotFound />}/>
          <Route path={'/dogs/:id'} element={<dogDetailCard/>}/>
      </Routes>
      { location.pathname !=='/' && location.pathname !=='/login' && location.pathname !=='/register' && location.pathname !=='/form' && <Footer />} 
      {/* <Footer/> */}
      <BackDrop/>
    </>
  );
}

export default App;
