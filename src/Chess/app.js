import React from "react";
import {connect} from 'react-redux'
import {gameReset, gameStart, levelChange, themeChange, undoTurn, updateState} from '../Actions/game'
import {getGameState, getLevel, getTheme, getMove, getLoading} from "../Reducers";

import AiChessboard from "./board"
import Settings from "../Menus/settings"
import Logo from "../Menus/logo"
import {getNextMove} from "../Actions/bot";

class App extends React.Component {
    render() {
        let theme = this.props.theme ? "app light" : "app dark";
        return (
            <div className={theme}>
                <Logo/>
                <div className="main">
                    <AiChessboard
                        gameState={this.props.game}
                        move={this.props.move}
                        loading={this.props.loading}
                        updateGameState={this.props.updateGameState}
                        startGame={this.props.startGame}
                        getMove={this.props.getMove}
                    />
                    <Settings
                        theme={this.props.theme}
                        level={this.props.level}
                        themeChange={this.props.changeTheme}
                        levelChange={this.props.changeLevel}
                        resetGame={this.props.resetGame}
                        undoTurn={this.props.undoTurn}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
        return {
            theme: getTheme(state),
            level: getLevel(state),
            game: getGameState(state),
            move: getMove(state),
            loading: getLoading(state),
        };
    }
;

const mapDispatchToProps = (dispatch) => {
    return {
        changeTheme: () => dispatch(themeChange()),
        changeLevel: (event, level) => dispatch(levelChange(level)),
        updateGameState: (state) => dispatch(updateState(state)),
        startGame: () => dispatch(gameStart()),
        resetGame: () => dispatch(gameReset()),
        undoTurn: () => dispatch(undoTurn()),
        getMove: (game, depth) => dispatch(getNextMove(game, depth)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);



