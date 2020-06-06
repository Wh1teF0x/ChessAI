import {
    GAME_START,
    GAME_RESET,
    GAME_LEVEL_CHANGE,
    GAME_UPDATE_STATE,
    GAME_UNDO,
    THEME_CHANGE,
} from "./constants";

export const gameStart = () => {
    return {
        type: GAME_START,
    }
};

export const gameReset = () => {
    return {
        type: GAME_RESET,
    }
};

export const themeChange = () => {
    return {
        type: THEME_CHANGE,
    }
};

export const levelChange = (newLevel) => {
    return {
        type: GAME_LEVEL_CHANGE,
        level: newLevel,
    }
};

export const updateState = (state) => {
    return {
        type: GAME_UPDATE_STATE,
        newState: state,
    }
};

export const undoTurn = () => {
    return {
        type: GAME_UNDO,
    }
};

