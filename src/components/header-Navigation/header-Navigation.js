import React, { Component } from 'react';
import { connect } from 'react-redux';
import getProductsByCategory from '../../redux/actions/getProductsByCategory.js'
import postCurrentCategory from '../../redux/actions/postCurrentCategory.js'
import './header-Navigation.css'

export class HeaderNavigation extends Component {

    constructor (props) {
        super(props);
        this.state ={
            buttonSelected: '1',
            categorySelected: 'all'
        }
    }

    componentDidMount() {
        this.props.postCurrentCategory(this.state.categorySelected)
    }

    componentDidUpdate(_prevProps,prevState) {
        //if (this.state.categoryState !== prevState.categoryState) {
        //    this.props.getProductsByCategory(this.state.categoryState); // Should be used if different products for women/men/kids were retrieved from DB
        // }
        if (this.state.buttonSelected !== prevState.buttonSelected) {
            this.props.getProductsByCategory(this.state.categorySelected);
            this.props.postCurrentCategory(this.state.categorySelected);
        }
    }

    onClick = (buttonSelected) => {
        this.setState(prevState => ({...prevState,
            buttonSelected: buttonSelected.target.id,
            // categoryState: buttonSelected.target.name // Should be used if different products for women/men/kids were retrieved from DB
        }))
    }
    render() {
        let buttonSelected = this.state.buttonSelected
        return (
            <div className='headerNavigationContainer'>
                <button
                    id='1'
                    name='women'
                    type='button'
                    className={buttonSelected === '1' ? 'headerNavigationClass1' : 'headerNavigationClass2'}
                    onClick={(id, name)=>this.onClick(id, name)}
                >
                WOMEN
                </button>

                <button
                id='2'
                name='men'
                type='button'
                className={buttonSelected === '2' ? 'headerNavigationClass1' : 'headerNavigationClass2'}
                onClick={(id, name)=>this.onClick(id, name)}
                >
                MEN
                </button>

                <button
                id='3'
                name='kids'
                type='button'
                className={buttonSelected === '3' ? 'headerNavigationClass1' : 'headerNavigationClass2'}
                onClick={(id, name)=>this.onClick(id, name)}
                >
                KIDS
                </button>
            </div>
        )
    }
}

// function mapStateToProps (state) {
//     return {
//             allProductsByCategory: state.productsByCategory
//     };
//   }
  
const mapDispatchToProps = (dispatch) => {
  return {
          getProductsByCategory: (categorySelected) => dispatch(getProductsByCategory(categorySelected)),
          postCurrentCategory: (currentCategory) => dispatch(postCurrentCategory(currentCategory))
  }
}

export default connect(null, mapDispatchToProps)(HeaderNavigation);