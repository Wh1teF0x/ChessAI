import React, {Component} from "react";
import Chess from "chess.js"; //
import Chessboard from "chessboardjsx";
import MakeBestMove from "../AI/robot"

class RenderEngine extends Component {
    state = {
        fen: "start",
        dropSquareStyle: {},
        squareStyles: {},
        pieceSquare: "",
        square: "",
        history: []
    };

    componentDidMount() {
        this.game = new Chess();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.game.turn() === "b") {
            let time = MakeBestMove(this.game, 2);
            this.setState(({history, pieceSquare}) => ({
                fen: this.game.fen(),
                history: this.game.history({verbose: true}),
                squareStyles: squareStyling({pieceSquare, history})
            }));
            console.log(time);
        }
    }

    removeHighlightSquare = () => {
        this.setState(({pieceSquare, history}) => ({
            squareStyles: squareStyling({pieceSquare, history})
        }));
    };

    highlightSquare = (sourceSquare, squaresToHighlight) => {
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
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    })
                };
            },
            {}
        );

        this.setState(({squareStyles}) => ({
            squareStyles: {...squareStyles, ...highlightStyles}
        }));
    };

    onDrop = ({sourceSquare, targetSquare}) => {
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        if (move === null) return;
        this.setState(({history, pieceSquare}) => ({
            fen: this.game.fen(),
            history: this.game.history({verbose: true}),
            squareStyles: squareStyling({pieceSquare, history})
        }));
    };

    onSquareClick = square => {
        this.setState(({history}) => ({
            squareStyles: squareStyling({pieceSquare: square, history}),
            pieceSquare: square
        }));

        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: "q"
        });
        if (move === null) return;

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({verbose: true}),
            pieceSquare: ""
        });
    };

    onMouseOverSquare = square => {
        let moves = this.game.moves({
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

    onMouseOutSquare = square => this.removeHighlightSquare(square);

    onDragOverSquare = square => {
        this.setState({
            dropSquareStyle: {boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)"}
        });
    };

    render() {
        const {fen, dropSquareStyle, squareStyles} = this.state;
        return this.props.children({
            squareStyles,
            position: fen,
            onMouseOverSquare: this.onMouseOverSquare,
            onMouseOutSquare: this.onMouseOutSquare,
            onDrop: this.onDrop,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
        });
    }
}

export default function AiChessboard(props) {
    return (
        <div style={boardsContainer}>
            <RenderEngine>
                {({
                      position,
                      onDrop,
                      onMouseOverSquare,
                      onMouseOutSquare,
                      squareStyles,
                      dropSquareStyle,
                      onDragOverSquare,
                      onSquareClick,
                  }) => (
                    <Chessboard
                        position={position}
                        onDrop={onDrop}
                        onMouseOverSquare={onMouseOverSquare}
                        onMouseOutSquare={onMouseOutSquare}
                        boardStyle={boardStyle}
                        squareStyles={squareStyles}
                        dropSquareStyle={dropSquareStyle}
                        onDragOverSquare={onDragOverSquare}
                        onSquareClick={onSquareClick}
                    />
                )}
            </RenderEngine>
        </div>
    );
}

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

const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "10px",
};
const boardStyle = {
    borderRadius: "5px",
    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
};


