import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Navigation";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ShoppingCart from "./Pages/ShoppingCart";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Listings from "./Pages/Listings";
import NewListing from "./Pages/NewListing";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import NewListingForm from "./Pages/NewListing";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <SignUp />;
}

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
            <Route path="/signup" element={<RegisterAndLogout />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/createlisting" element={<NewListing />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/newlistingform" element={<NewListingForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
