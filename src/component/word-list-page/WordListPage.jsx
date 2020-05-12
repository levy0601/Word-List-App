import React, {useState} from 'react';
import WordList from "./WordList";
import './WordListPage.css';
import FlipCardController from "../learning-option/FlipCardController";
import WordTestController from "../learning-option/WordTestController";

const WordListPage = ({wordList,onDeleteWord,onUpdateWord,onAddWord,onRefreshList,onDeleteAllWord,setErrorState}) => {
    const [isShowFlashCardState,setIsShowFlashCardState] = useState(true);

    function showFlashCard(){
        setIsShowFlashCardState(true);
    }

    function showWordTest(){
        setIsShowFlashCardState(false);
    }
    return (
        <div className={'word-list-page'}>
            <button className={'button'} onClick={showFlashCard}> Flash Card</button>
            <button className={'button'} onClick={showWordTest}> Word Test</button>
            {!isShowFlashCardState && <WordTestController word={"cpu"} definition={"cpu"} wordListArray={Object.values(wordList.words)}/>}
            {isShowFlashCardState && <FlipCardController wordListArray={Object.values(wordList.words)}/>}
            <WordList wordList={wordList} onDeleteWord={onDeleteWord}
                      onUpdateWord={onUpdateWord} onAddWord={onAddWord} onRefresh={onRefreshList}
                      onDeleteAllWord={onDeleteAllWord} setErrorState={setErrorState}/>
        </div>
    )
};


export default WordListPage;
