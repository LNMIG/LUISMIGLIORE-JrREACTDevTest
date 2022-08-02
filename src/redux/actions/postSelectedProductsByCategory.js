import { POST_CURRENT_SELECTED_PRODUCTS } from '../constants'

const postSelectedProductsByCategory = (selectedProducts) => {
    return {type: POST_CURRENT_SELECTED_PRODUCTS, payload: selectedProducts}
}
export default postSelectedProductsByCategory