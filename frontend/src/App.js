import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import Home from './views/Home/Home';
import About from './views/About/About';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';

function App() {
  return (<>
            <Header/>
            <Nav/>
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/about'} element={<About/>} />
            </Routes>
            <Footer/>
      </>);
}

export default App;
