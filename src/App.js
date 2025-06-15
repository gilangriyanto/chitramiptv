import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuyNow from "./pages/BuyNow";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import "./App.css";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The main app component, which wraps the entire app in a router and
 * contains all the routes.
 *
 * @returns {React.ReactElement} The main app component.
 */
/*******  9d15425c-12bd-4720-bcfb-062feb6b23d6  *******/ function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-now" element={<BuyNow />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
