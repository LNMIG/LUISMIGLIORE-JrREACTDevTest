import { GET_PRODUCTS_BY_CATEGORY } from '../constants'

const getProductsByCategory = (categoryInput = "all") => {

    const CategoryInput = { input: { title: categoryInput}}

    return function (dispatch) {
        return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query ($input: CategoryInput){
                    category (input: $input){
                        name
                        products {
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
                              symbol
                              label
                            }
                            amount
                          }
                          brand
                        }
                    }
                }`,
            variables: CategoryInput
        }),
        })
        .then(res => res.json())
        .then(json => {
                dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: json.data.category.products})
                      })
    } 
}
export default getProductsByCategory