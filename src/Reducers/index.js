import {combineReducers} from 'redux'

import gameReducer, * as fromGame from "./gameReducer";
import botReducer, * as fromBot from "./botReducer";


export default combineReducers({
    game: gameReducer,
    bot: botReducer,
})

/* GAME */
export const getGameState = (state) => fromGame.getGameState(state.game);
export const getTheme = (state) => fromGame.getTheme(state.game);
export const getLevel = (state) => fromGame.getLevel(state.game);


/* BOT */
export const getLoading = (state) => fromBot.getLoading(state.game);
export const getMove = (state) => fromBot.getMove(state.bot);

