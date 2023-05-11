import {Home, Landing, Form, Detail, NotFound} from './views/index'
import {Route, Routes, useLocation} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Loading from './components/Loading/loading';

function App() {
  const location = useLocation();

  return (
    <div className="App">      
      {(location.pathname === "/home" || location.pathname === "/create") && <NavBar/>}
    <Routes>
      <Route  path="/" element={<Landing/>} /> 
      <Route  path="/home" element={<Home/>} /> 
      <Route  path="/recipes/:id" element={<Detail/>} /> 
      <Route  path="/create" element={<Form/>} /> 
      <Route  path="*" element={<NotFound/>} />     
    </Routes>
    </div>
  );
}

export default App;
