import {
    BOT_START,
    BOT_RESULT,
} from "./constants";

import {getBestMove} from './ai'

export const getNextMove = (game, depth) => (dispatch) => {
    dispatch(botStarted());
    getBestMove(game, depth)
        .then(res => {
            dispatch(botResult(res))
        })
        .catch(err => {
            dispatch(botError(err))
        });

};

const botStarted = () => {
    return {
        type: BOT_START,
    }
};

const botResult = (move) => {
    return {
        type: BOT_RESULT,
        move: move,
    }
};

const botError = (error) => {
    return {
        type: BOT_RESULT,
        error: error,
    }
};

