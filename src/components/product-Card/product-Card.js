import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import getProductById from "../../redux/actions/getProductById";
import Vector from '../../assets/addToCart.png'
import './product-Card.css';

class ProductCard extends Component {

    render() {

        let currentCurrency = []
        if (this.props.postedCurrentCurrency.length === 0) {
            currentCurrency = [{label: "USD", symbol: "$"}]
        } else {
            currentCurrency = this.props.postedCurrentCurrency
        }

        const price = (prices) => {
            let currentPriceAmount = prices.filter(price => price.currency.symbol === currentCurrency[0].symbol)
            return currentPriceAmount[0].amount
        }

        if (this.props.productsByCategory.length === 0) {
            return (
                <div className='productCardLoading'>
                    <h2>Loading...</h2>
                </div>
            )
        }
        return (
            <div className='wraperProductCard'>
                    {this.props.productsByCategory.slice(0,6).map(product => {return (
                        <div className={product.inStock ? 'productCardContainer' : 'outOfStock'} key={product.id}>
                        <NavLink to={product.inStock ? `/productdetails/${product.id}` : ``} className="navlink" onClick={() => this.props.getProductById(product.id)}>
                        <div className='imageContainer'>
                            <img src={product.gallery[0]} alt="view here" className='image'/>
                            {!product.inStock ? <div className='noStock'> OUT OF STOCK</div> : ''}
                            <div  className='circleIcon'>
                                {product.inStock
                                ?
                                    <button className='surface' onClick={()=>{}}>
                                        <img src={Vector} alt='' className='vector'/>
                                    </button>
                                :
                                 ''
                                }
                            </div>
                        </div>
                        {/* <img src={product.Heart} alt="Heart here" className='heart'/>
                        {/* <p className='bagde label'>{product.Badge}</p> */}
                        <div className='spacer'></div>
                        <div className='content'>
                            <div className='title'>{`${product.brand} ${product.name}`}</div>
                            <div className='title'>
                                <div className='element'>
                                    {`${currentCurrency[0].symbol} ${price(product.prices)}`}
                                </div>
                            </div>
                        </div>
                        </NavLink>
                        </div>
                    )})}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
            productsByCategory: state.productsByCategory,
            postedCurrentCurrency: state.postedCurrentCurrency,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductById: (productId) => dispatch(getProductById(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);