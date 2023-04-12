import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import Home from './views/Home/Home';
import About from './views/About/About';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register.jsx';
import Dogs from './views/Dogs/Dogs.jsx';
import { useLocation } from 'react-router-dom'; 
import Login from './views/Login/Login.jsx';
import Landing from './components/Landing/Landing';

import Form from './components/Form/Form';

function App() {

  const location = useLocation();

  return (
    <>
      <Header/> 
      { location.pathname !=='/' && <Nav />} {/* falta añadir register y landing */}
      <Routes>
          <Route path={'/'} element={<Landing/>} />
          <Route path={'/home'} element={<Home/>} />
          <Route path={'/about'} element={<About/>} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/login'} element={<Login />} /> 
          <Route path={'/form'} element={<Form />} />
          <Route path={'/dogs'} element={<Dogs />}/>
          {/* <Route path={'*'} element={<NotFound />}/> */}
          
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
