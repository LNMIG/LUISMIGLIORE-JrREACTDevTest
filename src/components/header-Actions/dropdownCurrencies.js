import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllCurrencies from '../../redux/actions/getAllCurrencies.js';
import postSelectedCurrency from '../../redux/actions/postSelectedCurrency.js';
import '../header-Actions/dropdownCurrencies.css'

class DropdownActions extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
            currentCurrency: [{label: "USD", symbol: "$"}],
            }
        this.activatorRef = React.createRef(null)
        this.dropdownListRef = React.createRef(null)
        this.vector = true
    }

    onClickHandler = () => {
        this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}))
    }
    
    keyHandler = (event) => {
      if (event.key === "Escape" && this.state.isOpen) {
        this.setState(prevState => ({...prevState, isOpen: false}))
        }
    }

    clickOutsideHandler = (event) => {
        if (this.dropdownListRef.current) {
          if (this.dropdownListRef.current.contains(event.target) || this.activatorRef.current.contains(event.target)) {
          return;
          }
          this.setState(prevState => ({...prevState, isOpen: false}))
          }
    }

    onClickButton = selectedCurrency => {
        this.label = selectedCurrency.target.value.slice(0,3)
        this.symbol = selectedCurrency.target.value.slice(3).trim().trimEnd()
        this.setState(prevState => ({...prevState, currentCurrency: [{label: this.label, symbol: this.symbol}] }))
        this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}));
    }

    componentDidMount() {
        this.props.getAllCurrencies();
      }

    componentDidUpdate(_prevProps, prevState, _snapshot) {
      if (this.state.currentCurrency !== prevState.currentCurrency) {
          this.props.postSelectedCurrency(this.state.currentCurrency);
          }
      if(this.state.isOpen !== prevState.isOpen) {
        this.dropdownListRef.current.querySelector("button").focus();
        document.addEventListener("mousedown", this.clickOutsideHandler);
        } else {
        document.addEventListener("mousedown", this.clickOutsideHandler);
        }
    }

    render() {

        const currencies = this.props.allCurrencies
        const currentCurrency = <div className='currencyShow'>
                                    <span className='symbol'>{this.state.currentCurrency[0].symbol}</span>
                                    {/* <span className='label'>{this.state.currentCurrency[0].label}</span> */}
                                </div>
        const show = (label, symbol) => {
                let combine = `${symbol} ${label}`
                return combine
        }

        return (
            <div className='currencyWrapper' onKeyUp={this.keyHandler}>
            <button
              className='currencyActivator'
              aria-haspopup="true"
              aria-controls={currentCurrency}
              onClick={this.onClickHandler}
              ref={this.activatorRef}
            >
              {currentCurrency}
              {this.vector ?
              (
                this.state.isOpen ?
                (
                  <svg
                    height="18"
                    fill="rgb(70,70,70)"
                    viewBox="0 0 24 24"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m0 0h24v24h-24z" fill="none" />
                    <path d="m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
                  </svg>
                )
                :
                (
                  <svg
                    height="18"
                    fill="rgb(70,70,70)"
                    viewBox="0 0 24 24"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m0 0h24v24h-24z" fill="none" />
                    <path d="m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                  </svg>
                )
              )
              :
                null
              }
            </button>

            {currencies && currencies.length > 0 ?
            <ul
              ref={this.dropdownListRef}
              className={`currencyItemList ${this.state.isOpen ? 'active' : ""} `}
            >
              {currencies.map((currency, index) => {
                return (
                  <li className='currencyList' key={index}>
                    <button type='button' value={`${currency.label} ${currency.symbol}`} onClick={this.onClickButton}>
                        {show(currency.label,currency.symbol)}
                    </button>
                  </li>
                );
              })}
            </ul>
            :
             <div>Loading...</div>
            }
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
          allCurrencies: state.allCurrencies,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
          getAllCurrencies: () => dispatch(getAllCurrencies()),
          postSelectedCurrency: (selected) => dispatch(postSelectedCurrency(selected)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownActions);
