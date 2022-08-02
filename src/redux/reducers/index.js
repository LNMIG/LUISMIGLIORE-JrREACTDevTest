import { 
    GET_ALL_CURRENCIES,
    GET_ALL_CATEGORIES,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PAGINATION_DATA,
    POST_CURRENT_CATEGORY,
    POST_CURRENT_SELECTED_PRODUCTS,
    POST_CURRENT_SELECTED_CURRENCY,
} from '../constants'



const initialState = {
    allCategories: [],
    allCurrencies: [],
    productsByCategory: [],
    paginationData: {},
    singleProduct: {},
    postedCurrentCategory: {},
    postedCurrentCurrency: [],
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_CATEGORY:
        return {
        ...state,
        productsByCategory: action.payload
        }
        case GET_ALL_CURRENCIES:
        return {
        ...state,
        allCurrencies: action.payload
        }
        case GET_ALL_CATEGORIES:
        return {
        ...state,
        allCategories: action.payload
        }
        case GET_PRODUCT_BY_ID:
        return {
        ...state,
        singleProduct: action.payload
        }
        case GET_PAGINATION_DATA:
        return {
        ...state,
        paginationData: action.payload
        }
        case POST_CURRENT_CATEGORY:
        return {
        ...state,
        postedCurrentCategory: action.payload
        }
        case POST_CURRENT_SELECTED_PRODUCTS:
        return {
        ...state,
        productsByCategory: action.payload
        }
        case POST_CURRENT_SELECTED_CURRENCY:
            console.log('REDUCER', action.payload)
        return {
        ...state,
        postedCurrentCurrency: action.payload
        }
        default:
        return state;
    }
}
export default reducer;