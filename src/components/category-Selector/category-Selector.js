import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllCategories from '../../redux/actions/getAllCategories.js';
import getProductsByCategory from '../../redux/actions/getProductsByCategory.js';
import postSelectedProductsByCategory from '../../redux/actions/postSelectedProductsByCategory.js';
import './category-Selector.css';

class CategorySelector extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isOpen: false,
            currentCategory: 'all',
            }
        this.activatorRef = React.createRef(null)
        this.dropdownListRef = React.createRef(null)
        this.vector =''
        this.filteredProducts= []
    }
  
    onClickHandler = () => {
      this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}));
    }
  
    keyHandler = (event) => {
      if (event.key === "Escape" && this.state.isOpen) {
        this.setState(prevState => ({...prevState, isOpen: false}));
        }
    }
  
    clickOutsideHandler = (event) => {
        if (this.dropdownListRef.current) {
          if (this.dropdownListRef.current.contains(event.target) || this.activatorRef.current.contains(event.target)) {
          return;
          }
          this.setState(prevState => ({...prevState, isOpen: false}));
          }
    }

    onClickButton = selectedCategory => {
        this.setState(prevState => ({...prevState, currentCategory: selectedCategory.target.value }))
        this.setState(prevState => ({...prevState, isOpen: !this.state.isOpen}));

        if (this.filteredProducts.length === 0 ) {
          this.filteredProducts = this.props.productsByCategory
        }
    }

    componentDidMount() {
        this.props.getAllCategories();
        this.props.getProductsByCategory(this.state.currentCategory);
    }

    componentDidUpdate(prevProps, prevState, _snapshot) {
        if (this.state.currentCategory !== prevState.currentCategory) {
            // this.props.getProductsByCategory(this.state.currentCategory.toLowerCase());
            this.selectedProductsByCategory = []
            if (this.state.currentCategory === this.props.allCategories[0].name) {
              this.selectedProductsByCategory = this.filteredProducts
              } else {
              this.selectedProductsByCategory = this.filteredProducts.filter(each => each.category === this.state.currentCategory)
              }
            this.props.postSelectedProductsByCategory(this.selectedProductsByCategory);
            }

        if(this.state.isOpen !== prevState.isOpen) {
          this.dropdownListRef.current.querySelector("button").focus();
          document.addEventListener("mousedown", this.clickOutsideHandler);
          } else {
          document.addEventListener("mousedown", this.clickOutsideHandler);
          }
        if(this.props.postedCurrentCategory !== prevProps.postedCurrentCategory) {
          this.setState(prevState => ({...prevState, currentCategory: this.props.postedCurrentCategory.currentCategory}));
          }
    }

    render () {

        const categories = this.props.allCategories

        return (
          <div className='dropdown_wrapper' onKeyUp={this.keyHandler}>
            <button
              className='dropdown_activator'
              aria-haspopup="true"
              aria-controls={`Showing "${this.state.currentCategory.toLowerCase()}"`}
              onClick={this.onClickHandler}
              ref={this.activatorRef}
            >
              {`Showing "${this.state.currentCategory.toLowerCase()}"`}
              {this.vector ?
              (
                this.state.isOpen ?
                (
                  <svg
                    height="24"
                    fill="rgb(70,70,70)"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m0 0h24v24h-24z" fill="none" />
                    <path d="m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
                  </svg>
                )
                :
                (
                  <svg
                    height="24"
                    fill="rgb(70,70,70)"
                    viewBox="0 0 24 24"
                    width="24"
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

            {categories && categories.length > 0 ?
            <ul
              ref={this.dropdownListRef}
              className={`dropdown_item_list ${this.state.isOpen ? 'active' : ""} `}
              // onMouseLeave={this.onClickHandler}
            >
              {categories.map((category, index) => {
                return (
                  <li className='item_list' key={index}>
                    <button type='button' value={category.name} onClick={this.onClickButton}>{category.name}</button>
                  </li>
                );
              })}
            </ul>
            :
             <div>Loading...</div>
            }
          </div>
        )
    };
}

const mapStateToProps = (state) => {
  return {
    allCategories: state.allCategories,
    productsByCategory: state.productsByCategory,
    postedCurrentCategory: state.postedCurrentCategory,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    getProductsByCategory: (categoryType) => dispatch(getProductsByCategory(categoryType)),
    postSelectedProductsByCategory: (selectionMade) => dispatch(postSelectedProductsByCategory(selectionMade)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
