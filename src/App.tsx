import { useEffect} from 'react'
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import ProductPage from './pages/ProductPage';
import Page from './pages/PPage';

function App() {
 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const NavigatePage = () => {
      switch (location.pathname) {
        case '/':
          navigate('/menu');
          break; 
        default:
          
          break;
      }
    };
    NavigatePage();
  }, [location.pathname, navigate]);

  return (
    <>
         <Routes>
        
        <Route path="/menu" element={<MenuPage />} />
        <Route path='/menu/:type' element={<ProductPage/>} />
        <Route path='/:type' element={<Page />} />
      </Routes>
    </>
  )
}

export default App
