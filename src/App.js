import React from 'react'
import ResponsiveDrawer from './components/Sidebar'

// Pages
import SignUp from './components/Registration/SignUp';
import Login from './components/Registration/Login';
import ForgotPassword from './components/Registration/ForgotPassword';
import Dashboard from './components/Dashboard_components/Dashboard';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>

        <Routes>
          <Route exact path='' element={<ResponsiveDrawer />} />
          <Route exact path='/signUp' element={<SignUp />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/forgot' element={<ForgotPassword />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          {/* <Route exact path='/Home' component={<Home />} />
          <Route exact path='/About-us' element={<AboutUs />} />
          <Route exact path='/Services' element={ <Services />} />
          <Route exact path='/Pricing' element={ <Pricing />} />
          <Route exact path='/Contact-us' element={ <ContactUs /> } />
          <Route exact path='/Faqs' element={<FAQs />} /> */}
        </Routes>
      </Router>
    </>

  )
}

export default App
