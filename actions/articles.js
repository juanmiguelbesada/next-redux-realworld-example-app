import counduit from "../lib/counduit";

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export function requestArticles() {
    return {type: REQUEST_ARTICLES}
}

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export function receiveArticles(articles) {
    return {
        type: RECEIVE_ARTICLES,
        articles
    }
}

export function fetchArticles(page = 1) {
    return dispatch => {
        dispatch(requestArticles());
        return counduit.Articles.all(page)
            .then(response => response.data)
            .then(data => dispatch(receiveArticles(data.articles)))
    }
}

export const APPLY_TAG_FILTER = 'APPLY_TAG_FILTER';
export function applyTagFilter(tag, payload) {
    return {
        type: APPLY_TAG_FILTER,
        tag,
        payload
    }
}