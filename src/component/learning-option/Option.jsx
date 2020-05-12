import React from 'react';

const Option = ({word,onCheckAnswer}) => {

    function onCheckAnswerWithDefinition() {
        onCheckAnswer(word.definition);
    }

    return (
        <button className={'button option'} onClick={onCheckAnswerWithDefinition}> {word.definition}</button>
    )
};


export default Option;
