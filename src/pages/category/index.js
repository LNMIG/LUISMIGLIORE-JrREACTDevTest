import React, { Component } from 'react';
import HeaderDesktop from '../../components/header-Desktop/header-Desktop';
import CategorySelector from '../../components/category-Selector/category-Selector';
import ProductCard from '../../components/product-Card/product-Card';
import './index.css'

export class Category extends Component {
    
    render() {
        return (
            <div className="mainContainer">
                <HeaderDesktop />
                <CategorySelector />
                <div className='productsContainer'>
                    <ProductCard />
                </div>
            </div>
        );
    };
};

export default Category;