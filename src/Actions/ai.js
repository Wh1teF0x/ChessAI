import * as values from './pieceValues'

export const getBestMove = async (game, depth) => new Promise((resolve, reject) => {
    try {
        resolve(minmaxRoot(depth, game, true));
    } catch (e) {
        reject(e)
    }
});


const minmaxRoot = (depth, game, isMaximisingPlayer) => {
    let newGameMoves = game.moves();
    let bestMove = -9999;
    let bestMoveFound;
    for (let i = 0; i < newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i];
        game.move(newGameMove);
        let value = minmax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if (value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

const minmax = (depth, game, alpha, beta, isMaximisingPlayer) => {
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }
    let newGameMoves = game.moves();
    if (isMaximisingPlayer) {
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minmax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        let bestMove = 9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minmax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

const evaluateBoard = (board) => {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
        }
    }
    return totalEvaluation;
};

const getPieceValue = (piece, x, y) => {
    if (piece === null) {
        return 0;
    }
    let getAbsoluteValue = function (piece, isWhite, x, y) {
        if (piece.type === 'p') {
            return 10 + (isWhite ? values.pawnEvalWhite[y][x] : values.pawnEvalBlack[y][x]);
        } else if (piece.type === 'r') {
            return 50 + (isWhite ? values.rookEvalWhite[y][x] : values.rookEvalBlack[y][x]);
        } else if (piece.type === 'n') {
            return 30 + values.knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + (isWhite ? values.bishopEvalWhite[y][x] : values.bishopEvalBlack[y][x]);
        } else if (piece.type === 'q') {
            return 90 + values.evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + (isWhite ? values.kingEvalWhite[y][x] : values.kingEvalBlack[y][x]);
        }
    };

    let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x, y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};



