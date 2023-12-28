import { Route, Routes } from 'react-router-dom';
import Main from './layouts/Main';
import Dashboard from './components/Dashboard'
import Listposts from './components/Listposts';
import Charts from './components/Charts'
import Profile from './components/Profile';


function App() {
  
  return (
    <Routes>
      <Route element={<Main/>}>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/posts' element={<Listposts/>}/>
        <Route path='/charts' element={<Charts/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
      
    </Routes>
  );
}

export default App;
