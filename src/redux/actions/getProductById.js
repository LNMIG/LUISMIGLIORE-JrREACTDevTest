import { GET_PRODUCT_BY_ID } from '../constants'

const getProductById = (productId) => {
    return function (dispatch) {
        return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
          query (${productId}) {
            product(id: ${productId}) {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
        ` }),
        })
        .then(res => res.json())
        .then(json => {
                       dispatch({type: GET_PRODUCT_BY_ID, payload: json.data.product})
                      })
    } 
}
export default getProductById