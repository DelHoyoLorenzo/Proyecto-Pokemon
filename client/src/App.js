import { Routes, Route } from 'react-router-dom';
import  Landing  from './views/Landing/Landing';
import  Home  from './views/Home/Home';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;
