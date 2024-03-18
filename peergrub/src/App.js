import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Navigation";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ShoppingCart from "./Pages/ShoppingCart";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import NewListing from "./Pages/NewListing";
import Footer from "./Components/Footer";

function App() {
  return (
    //You use browserRouter to make sure that the links work properly.
    <BrowserRouter>
      <div className="body">
        <Nav />
        <div className="midBody">
          {/*Routes are to go from page to page*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/listings" element={<NewListing />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
