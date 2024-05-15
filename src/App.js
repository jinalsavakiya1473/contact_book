import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Addcont from './compo/Addcont';
import { Route, Routes } from 'react-router-dom';
import Viewcont from './compo/Viewcont';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Addcont/>} path='/'></Route>
        <Route element={<Viewcont/>} path='view'></Route>
      </Routes>
    </>
  );
}

export default App;
