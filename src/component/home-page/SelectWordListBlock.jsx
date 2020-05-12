import React from 'react';
import WordListDescription from "./WordListDescription";
import './SelectWordListBlock.css'

const SelectWordListBlock = ({wordLists,onWordListSelect,isEditState,onDeleteWordList}) => {
    let wordListDescription;
    wordListDescription = Object.values(wordLists).map((wordList) =>
        <WordListDescription numberOfWord={Object.values(wordList.words).length} wordListName={wordList.wordListName}
                             key={wordList.wordListId} wordListId={wordList.wordListId} onWordListSelect={onWordListSelect}
                             isEditState={isEditState} onDeleteWordList={onDeleteWordList}/>
    );
    return(
        <div className={'select-word-list-page'}>
            {wordListDescription}
        </div>
    )
};


export default SelectWordListBlock;
