import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Erro from './pages/404';
import Home from './pages/home';




function RoutesApp() {
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/" element={<Home />} />


                <Route path="*" element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}


export default RoutesApp;