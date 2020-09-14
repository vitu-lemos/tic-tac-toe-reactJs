import React from 'react';
import Square from '../square/square';
import './board.scss'
function Board(props) {
    console.log(props);
    return (
        <div className="game-board" >

            { props.squares.map((square) => <Square square={square} handlerMove={props.handlerMove} />)}
        </div>
    )
}

export default Board