import { Routes, Route } from 'react-router-dom';
import  Landing  from './views/Landing/Landing';
import  Home  from './views/Home/Home';
import Detail from './views/Detail/Detail';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringPokemons } from './redux/actions';

function App() {
  let allPokemons = useSelector((state)=> state.allPokemons)
  let dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(bringPokemons());
  }, []);

  return (
    
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/detail/:id" element={<Detail/>} />
    </Routes>
  );
}

export default App;
