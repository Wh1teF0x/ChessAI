import {
    GAME_START,
    GAME_RESET,
    GAME_UNDO,
    THEME_CHANGE,
    GAME_LEVEL_CHANGE,
    GAME_UPDATE_STATE
} from "../Actions/constants";
import Chess from "chess.js";

const initialState = {
    theme: false,
    level: 2,
    game: new Chess(),
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    prevState: undefined,
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GAME_START:
            return {
                ...state,
                game: new Chess(),
            };
        case GAME_RESET:
            return {
                ...initialState,
                theme: state.theme,
                level: state.level,
            };
        case GAME_UNDO:
            if (state.prevState) {
                return {
                    ...state.prevState,
                };
            } else {
                return {
                    ...state
                }
            }
        case GAME_LEVEL_CHANGE:
            return {
                ...state,
                level: action.level,
            };
        case THEME_CHANGE:
            return {
                ...state,
                theme: !state.theme,
            };
        case GAME_UPDATE_STATE:
            let prevState = state.prevState;
            if (action.newState.fen) {
                prevState = state;
            }
            return {
                ...state,
                ...action.newState,
                fen: action.newState.hasOwnProperty("game") ? action.newState.game.fen() : state.game.fen(),
                prevState: prevState,
            };
        default:
            return state
    }
};

export const getGameState = (state) => {
    return state
};

export const getTheme = (state) => {
    return state.theme
};

export const getLevel = (state) => {
    return state.level
};

export default gameReducer