import React, {useState} from 'react';
import './WordTest.css'
import Option from "./Option";

const WordTest = ({word,testOptions}) => {
    const [isCorrect,setIsCorrect] = useState(0);

    const options = testOptions.map(word => {return <Option onCheckAnswer={onCheckAnswer} word={word} key={word.wordId}/>});

    function onCheckAnswer(answer) {
        if(answer === word.definition){
            setIsCorrect(1);
        }else{
            setIsCorrect(2);
        }
    }

    let message;
    if(isCorrect === 1){
        message = <p className={'word-test-message correct'}> Correct</p>
    }else if(isCorrect === 2){
        message = <p className={'word-test-message wrong'}> Your are wrong, try again</p>
    }else{
        message = <p className={'word-test-message'}> </p>
    }

    return (
        <div className={'word-test'}>
            {message}
            <p className={'word'}> {word.wordName}</p>
            <div className={'word-test-options'}>
                {options}
            </div>
        </div>
    )

};


export default WordTest;
