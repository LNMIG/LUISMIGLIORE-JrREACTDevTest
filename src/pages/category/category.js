import React, { Component } from 'react';
import CategorySelector from '../../components/category-Selector/category-Selector';
import ProductCard from '../../components/product-Card/product-Card';
import './category.css'

export class Category extends Component {
    
    render() {
        return (
            <div className="mainContainer">
                <CategorySelector />
                <div className='productsContainer'>
                    <ProductCard />
                </div>
            </div>
        );
    };
};

export default Category;