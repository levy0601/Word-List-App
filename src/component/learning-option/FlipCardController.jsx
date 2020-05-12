import React, {useState} from 'react';
import FlipCard from "./FlipCard";
import './FlipCardController.css'

const FlipCardController = ({wordListArray}) => {
    const [indexState,setIndexState] = useState(0);

    function incrementIndex(){
        setIndexState( ((indexState + 1) > (wordListArray.length -1))? wordListArray.length -1 : (indexState + 1));
    }

    function decrementIndex() {
        setIndexState( (indexState -1) < 0 ? 0 : (indexState - 1));
    }

    return (
        <div className={'flip-card-controller'}>
            <p className={'flip-card-title'}>Flash Card</p>
            <FlipCard word={wordListArray[indexState] ? wordListArray[indexState].wordName : ''} definition={wordListArray[indexState] ? wordListArray[indexState].definition : ''}/>
            <div className={'controller'}>
                <button className={'decrement'} onClick={decrementIndex}> {"<"} </button>
                <button className={'increment'} onClick={incrementIndex}> {">"} </button>
            </div>
        </div>
    )
};


export default FlipCardController;

