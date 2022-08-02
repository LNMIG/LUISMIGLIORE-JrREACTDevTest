import { GET_ALL_CURRENCIES } from '../constants'

const getAllCurrencies = () => {
    return function (dispatch) {
        return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `
          query {
            currencies {
              label
              symbol
            }
          }
        ` }),
        })
        .then(res => res.json())
        .then(json => {
                       dispatch({type: GET_ALL_CURRENCIES, payload: json.data.currencies})
                      })
    } 
}
export default getAllCurrencies