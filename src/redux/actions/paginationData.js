import { GET_PAGINATION_DATA } from '../constants'

const paginationData = (currentPage, totalProducts, pageSize) => {
  return {type: GET_PAGINATION_DATA, payload: {currentPage, totalProducts, pageSize}}
}
export default paginationData