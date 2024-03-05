import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import './App.css';
import Nav from "./Components/Navigation";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ShoppingCart from "./Pages/ShoppingCart";


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
            <Route path="/login" element={<Login/>} />
            <Route path="/shoppingcart" element={<ShoppingCart/>} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
