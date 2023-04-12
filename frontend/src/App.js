import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import Home from './views/Home/Home';
import About from './views/About/About';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register.jsx';
import Dogs from './views/Dogs/Dogs.jsx';
import { useLocation } from 'react-router-dom'; 

function App() {

  const location = useLocation();

  return (
    <>
      {/* <Header/> */}
      { location.pathname !=='/' && <Nav />} {/* falta añadir al loggin, register y landing */}
      <Routes>
          <Route path={'/home'} element={<Home/>} />
          <Route path={'/about'} element={<About/>} />
          <Route path={'/register'} element={<Register />} />
                {/* <Route path={'/login'} element={<Login />} /> */}
          <Route path={'/dogs'} element={<Dogs />}/>
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default App;
