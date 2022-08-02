import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllCurrencies from '../../redux/actions/getAllCurrencies';
import DropdownCurrencies from './dropdownCurrencies.js'
import Cart from '../../assets/EmptyCart.png'
import './header-Actions.css'

export class HeaderActions extends Component {

    constructor (props) {
        super(props)
        this.state = {
            currencies: '',
            }
    }

    onChange = selectedCurrency => {
        this.setState(prevState => ({...prevState, currencies: selectedCurrency.target.value }))
    }

    componentDidMount() {
        this.props.getAllCurrencies();
    }

    render() {
        // const currencies = this.props.allCurrencies
        return (
            <div className='headerActionsContainer'>
                {/* <select className='select' name={this.state.currencies} value={this.state.currencies} onChange={this.onChange} >
                    {this.props.allCurrencies.map(currency => 
                        <option key={Math.random()} value={currency.label}>
                                {`${currency.symbol} ${currency.label}`}
                        </option>)}
                </select> */}

                <DropdownCurrencies />

                <button className='cart'>
                    <img className='carticon' src={Cart} alt='' />
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
            allCurrencies: state.allCurrencies
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
            getAllCurrencies: () => dispatch(getAllCurrencies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderActions);