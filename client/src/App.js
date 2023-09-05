import { Routes, Route } from 'react-router-dom';
import  Landing  from './views/Landing/Landing';
import  Home  from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringPokemons, getTypes } from './redux/actions';
import './index';

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(bringPokemons());
    dispatch(getTypes());
  }, []);

  return (
    
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/detail/:id" element={<Detail/>} />
      <Route path="/create" element={<Form/>} />
    </Routes>
  );
}

export default App;
