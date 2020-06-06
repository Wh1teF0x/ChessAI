import React from "react";
import Chessboard from "chessboardjsx";

import "../chess.scss"

class Board extends React.Component {
    constructor(props) {
        super(props);
        props.startGame();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const {game, level} = this.props.gameState;
            const {loading, move, getMove, updateGameState} = this.props;
            if (move) {
                game.move(move);
                updateGameState({
                    fen: game.fen(),
                    history: game.history({verbose: true}),
                })
            }
            if (game.turn() === "b" && !loading && !move) {
                getMove(game, level);
            }
        }
    }

    removeHighlightSquare = () => {
        let pieceSquare = this.props.gameState.pieceSquare;
        let history = this.props.gameState.history;
        this.props.updateGameState({
            squareStyles: squareStyling({pieceSquare, history})
        });
    };

    highlightSquare = (sourceSquare, squaresToHighlight) => {
        let squareStyles = this.props.gameState.squareStyles;
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background: "rgba(255, 252, 0, 0.5)"
                        }
                    },
                    ...squareStyling({
                        history: this.props.gameState.history,
                        pieceSquare: this.props.gameState.pieceSquare,
                    })
                };
            },
            {}
        );

        this.props.updateGameState({
            squareStyles: {...squareStyles, ...highlightStyles}
        });
    };

    onDrop = gameover => ({sourceSquare, targetSquare}) => {
        if (gameover) return;
        let game = this.props.gameState.game;
        let history = this.props.gameState.history;
        let pieceSquare = this.props.gameState.pieceSquare;
        let move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        if (move === null) return;
        if (game.turn() === "b") return;
        this.props.updateGameState({
            fen: game.fen(),
            history: game.history({verbose: true}),
            squareStyles: squareStyling({pieceSquare, history})
        });
    };

    onSquareClick = gameover => square => {
        if (gameover) return;
        let game = this.props.gameState.game;
        let history = this.props.gameState.history;
        this.props.updateGameState({
            squareStyles: squareStyling({pieceSquare: square, history}),
            pieceSquare: square
        });

        let move = game.move({
            from: this.props.gameState.pieceSquare,
            to: square,
            promotion: "q"
        });
        if (move === null) return;
        if (game.turn() === "b") return;

        this.props.updateGameState({
            fen: game.fen(),
            history: game.history({verbose: true}),
            pieceSquare: ""
        });
    };

    onMouseOverSquare = gameover => square => {
        if (gameover) return;
        let game = this.props.gameState.game;
        let moves = game.moves({
            square: square,
            verbose: true
        });
        if (moves.length === 0) return;
        let squaresToHighlight = [];
        for (let i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);
    };

    onMouseOutSquare = gameover => square => {
        if (gameover) return;
        return this.removeHighlightSquare(square);
    };

    onDragOverSquare = (gameover) => () => {
        if (gameover) return;
        this.props.updateGameState({
            dropSquareStyle: {boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)"}
        });
    };

    render() {
        const {fen, dropSquareStyle, squareStyles, game} = this.props.gameState;
        let gameOver, gameOverText = undefined;
        if (game.game_over()) {
            gameOver = true;
            gameOverText = game.turn() === "b" ? "Game is over, winner - White" : "Game is over, winner - Black";
            if (game.in_draw()) {
                gameOverText = "Game is over, draw";
            }
        }
        return (
            <div className="board">
                {
                    gameOver
                        ? <div className="banner">
                            <span className="banner__text">Game is over {gameOverText}</span>
                        </div>
                        : <></>
                }
                <Chessboard
                    position={fen}
                    squareStyles={squareStyles}
                    dropSquareStyle={dropSquareStyle}
                    boardStyle={boardStyle}
                    onDrop={this.onDrop(gameOver)}
                    onMouseOverSquare={this.onMouseOverSquare(gameOver)}
                    onMouseOutSquare={this.onMouseOutSquare(gameOver)}
                    onDragOverSquare={this.onDragOverSquare(gameOver)}
                    onSquareClick={this.onSquareClick(gameOver)}
                />
            </div>
        );
    }
}

export default Board

const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};

const squareStyling = ({pieceSquare, history}) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: {backgroundColor: "rgba(255, 255, 0, 0.4)"},
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: "rgba(255, 255, 0, 0.4)"
            }
        })
    };
};


