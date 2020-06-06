import {
    BOT_START,
    BOT_RESULT,
    BOT_ERROR, GAME_UPDATE_STATE,
} from "../Actions/constants";

const initialState = {
    loading: false,
    move: undefined,
    error: undefined,
};

export const botReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOT_START:
            return {
                ...initialState,
                loading: true,
            };
        case BOT_RESULT:
            return {
                ...state,
                move: action.move,
                loading: false,
            };
        case BOT_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GAME_UPDATE_STATE:
            return {
                ...state,
                move: action.newState.hasOwnProperty("fen") ? undefined : state.move,
            };
        default:
            return state
    }
};

export const getMove = (state) => {
    return state.move
};

export const getLoading = (state) => {
    return state.loading
};

export default botReducer