import { POST_CURRENT_CATEGORY } from '../constants'

const postCurrentCategory = (currentCategory) => {
    return {type: POST_CURRENT_CATEGORY, payload: {currentCategory}}
}
export default postCurrentCategory