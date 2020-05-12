import React from 'react';
import './FlipCard.css'

const FlipCard = ({word,definition}) => {
    return (
        <div className={'flip-card'}>
            <div className={'flip-card-inner'}>
                <div className={'flip-card-front'}>
                    <p className={'word'}>{word}</p>
                </div>
                <div className={'flip-card-back'}>
                    <p className={'definition'}>{definition} </p>
                </div>
            </div>
        </div>
    )
};


export default FlipCard;
