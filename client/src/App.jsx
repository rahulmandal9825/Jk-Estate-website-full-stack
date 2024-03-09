import React from 'react'
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from './Page/Home';
import Signin from './Page/Signin';
import Signup from './Page/Signup';
import About from './Page/About';
import Profile from './Page/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './Page/CreateListing';
import UpdateListing from './Page/UpdateListing';
import Listing from './Page/Listing';
import Search from './Page/Search';
import UpdateAccount from './Page/UpdateAccount';



export default function App() {
  return(
  
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Sign-in' element={<Signin />} />
      <Route path='/Sign-up' element={<Signup />} />
      <Route path='/About' element={<About />} />
      <Route path='/search' element={<Search />} />
      <Route path='/Listing/:listingId' element={<Listing />} />

      <Route element={<PrivateRoute/>}>
           <Route path='/Profile' element={<Profile />} />
           <Route path='/create-listing' element={<CreateListing />} />
           <Route path='/Update-listing/:listingId' element={<UpdateListing />} />
           <Route path='/Update-account' element={<UpdateAccount/>} />
      </Route>
      </Routes>

    </BrowserRouter>
    )
  
}
