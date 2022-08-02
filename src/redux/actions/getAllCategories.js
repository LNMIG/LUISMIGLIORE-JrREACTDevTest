import { GET_ALL_CATEGORIES } from '../constants'

const getAllCategories = () => {
    return function (dispatch) {
        return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
          query {
            categories {
              name
            }
          }
        ` }),
        })
        .then(res => res.json())
        .then(json => {
                       dispatch({type: GET_ALL_CATEGORIES, payload: json.data.categories})
                      })
    } 
}
export default getAllCategories