import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

import HeaderDesktop from './components/header-Desktop/header-Desktop';
import Category from "./pages/category/category";
import Cart from './pages/cart/cart'
import ProductDetail from './components/product-Detail/product-Detail';
class App extends Component {
  render () {
    return (
      <div>
        <HeaderDesktop />
        <Routes>
          <Route path='/' element={ < Category /> } />
          <Route exact path='/cart' element={ < Cart /> } />
          <Route exact path='/productdetails/:id' element={ <ProductDetail />} />
        </Routes>
      </div>
    );
  }
}

export default App;
