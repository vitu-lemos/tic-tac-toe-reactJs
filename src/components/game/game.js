import React from 'react';
import Board from '../board/board.js';
import GameHistory from '../game-history/game-history.js'
const initialState = {
    squares: Array(9).fill(null).map((value, index) => ({ id: index, value: null })),
    players: [
        {
            name: "Player 1",
            id: 1,
            avatar: 'X'
        },
        {
            name: "Player 2",
            id: 2,
            avatar: 'O'
        }
    ],
    currentPlayerId: 1
}
class Game extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null).map((value, index) => ({ id: index, value: null })),
            players: [
                {
                    name: "Player 1",
                    id: 1,
                    avatar: 'X'
                },
                {
                    name: "Player 2",
                    id: 2,
                    avatar: 'O'
                }
            ],
            currentPlayerId: 1
        }

        this.handlerMove = this.handlerMove.bind(this);
    }

    handlerMove(squareId) {
        const currentPlayer = this.state.players.find(player => player.id === this.state.currentPlayerId)
        const winner = this.calculateWinner(this.state.squares);

        if (winner) {
            this.gameOver(winner)
            return
        }
        const squares = this.state.squares.slice();
        const currentSquare = squares.find(square => square.id === squareId)

        if (currentSquare && currentSquare.value) alert("Escolha inválida")
        else {
            squares[currentSquare.id].value = currentPlayer.avatar
            this.setState({ squares: squares, currentPlayerId: this.state.players.find(player => player.id !== this.state.currentPlayerId).id });
        }
    }

    gameOver(winner) {
        const winnerPLayer = this.state.players.find(player => player.avatar === winner).name

        this.setState(initialState);

        alert(`Vencedor: ${winnerPLayer}`)
    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
                return squares[a].value;
            }
        }
        return null;
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            const winnerPLayer = this.state.players.find(player => player.avatar === winner).name
            status = 'Vencedor: ' + winnerPLayer
        } else {
            const currentPlayer = this.state.players.find(player => player.id === this.state.currentPlayerId)
            status = `Próximo: ${currentPlayer.avatar}`
        }

        return (
            <div className="Game">
                <Board squares={this.state.squares} players={this.state.players} handlerMove={this.handlerMove} />
                <GameHistory status={status} />
            </div>
        )
    }
}

export default Game