import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import Home from './views/Home/Home';
import About from './views/About/About';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  return (<>
            {/* <Header/> */}
            {/* <Nav/> */}
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/about'} element={<About/>} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/login'} element={<Login />} />
            </Routes>
            {/* <Footer/> */}
      </>);
}

export default App;
