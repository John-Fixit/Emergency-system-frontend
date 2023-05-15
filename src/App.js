
import Emergency from './Components/User/Emergency';
import { Navigate, Route, Routes } from 'react-router-dom';
import OrgMainRoute from './Components/Organization/OrgMainRoute';
import Login from './Components/Organization/Login';
import {SWRConfig} from "swr"
import axios from 'axios';
import Signup from './Components/Organization/Signup';
import About from './Components/User/About'
import Contact from './Components/User/Contact'
import USSD from './Sub-Components/USSD';
function App() {
  const fetcher =(...args)=>axios.get(...args)
  return (
    <>
      <SWRConfig value={{fetcher: fetcher}}>
        <Routes>
          <Route path='' element={<Navigate to={'/emergency'}/>}/>
          <Route path='/emergency' element={<Emergency/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/org/*' element={<OrgMainRoute />}/>
          <Route path='/ussd' element={<USSD />}/>
        </Routes>
      </SWRConfig>
    </>
  );
}

export default App;
