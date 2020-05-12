import React from 'react';
import './WordListDescription.css'

const WordListDescription = ({wordListId,wordListName,numberOfWord,onWordListSelect,isEditState,onDeleteWordList}) => {

    function selectWorkList() {
        onWordListSelect(wordListId);
    }

    function onDeleteWordListWithId() {
        onDeleteWordList(wordListId);
    }

    return (
            <div className={'word-list-description'} >
                <div className={'word-list-description-wrapper'} onClick={selectWorkList}>
                    <p className={'word-list-name'}>{wordListName}</p>
                    <p className={'number-of-word'}>{numberOfWord} terms</p>
                </div>
                {isEditState && <button className={'button'} onClick={onDeleteWordListWithId}> delete </button>}
            </div>
    )

};


export default WordListDescription;
