import {REQUEST_TAGS, RECEIVE_TAGS, APPLY_TAG_FILTER} from "../actions/tags"
import { REQUEST_ARTICLES, RECEIVE_ARTICLES } from "../actions/articles";

export default (state = {}, action) => {
    switch (action.type) {
        case REQUEST_TAGS:
            return state;
        case RECEIVE_TAGS:
            return {
                ...state,
                tags: action.tags
            }
        case REQUEST_ARTICLES:
            return state;
        case RECEIVE_ARTICLES:
            return {
                ...state,
                articles: action.articles
            }
        case APPLY_TAG_FILTER:
            return {
                ...state,
                tag: action.tag,
                articles: action.payload.articles,
            }
    }

    return state;
}