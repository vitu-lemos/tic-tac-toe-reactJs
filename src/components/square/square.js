import React from 'react';
import './square.scss'
function Square(props) {
    console.log(props);
    return (
        <button className="square-button" onClick={() => props.handlerMove(props.square.id)}>
            {props.square.value}
        </button>
    )
}

export default Square