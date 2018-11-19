import counduit from "../lib/counduit";

export const REQUEST_TAGS = 'REQUEST_TAGS';
export function requestTags() {
    return {type: REQUEST_TAGS}
}

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export function receiveTags(tags) {
    return {
        type: RECEIVE_TAGS,
        tags
    }
}

export const SELECT_TAG = 'SELECT_TAG';
export function selectTag(tag) {
    return {
        type: SELECT_TAG,
        tag
    }
}

export function fetchTags() {
    return dispatch => {
        dispatch(requestTags());
        return counduit.Tags.getAll()
            .then(response => response.data)
            .then(data => dispatch(receiveTags(data.tags)))
    }
}

export const APPLY_TAG_FILTER = 'APPLY_TAG_FILTER';
export function applyTagFilter(tag, payload) {
    return async dispatch => {
           payload = await payload;
           dispatch({
            type: APPLY_TAG_FILTER,
            tag,
            payload
        });
    }
}