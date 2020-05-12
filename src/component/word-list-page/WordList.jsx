import React, {useState} from 'react';
import {sortByAlphabeticalAscending, sortByAlphabeticalDescending} from "../../utility/sort";
import Word from "./Word";
import SortByTaskFilter from "./SortByTaskFilter";
import './WordList.css';
import isInputValidation from "../../utility/InputValidation";
import {getErrorMessage} from "../../utility/errorMessage";

const WordList = ({wordList,onDeleteWord,onUpdateWord,onAddWord,onRefresh,onDeleteAllWord,setErrorState}) => {
    const [wordInputState,setWordInputState] = useState("");
    const [definitionInputState,setDefinitionInputState] = useState("");
    const [sortByWordState,setSortByWordState] = useState({isSort:false,order:"ascending"});
    const wordListId = wordList.wordListId;

    let wordsArray = Object.values(wordList.words);
    let words;

    if(sortByWordState.isSort){
        if(sortByWordState.order === 'ascending'){
            wordsArray = wordsArray.sort(sortByAlphabeticalAscending);
        }
        if(sortByWordState.order === 'descending'){
            wordsArray = wordsArray.sort(sortByAlphabeticalDescending);
        }
    }

    words = wordsArray.map((word) =>
        <Word wordName={word.wordName} definition={word.definition} onUpdateWord={onUpdateWord} onDeleteWord={onDeleteWord}
              wordId={word.wordId} wordListId={wordListId} key={word.wordId} setErrorState={setErrorState}/>
    );

    function getWordNameInput(event) {
        setWordInputState(event.target.value);
    }

    function getDefinitionInput(event){
        setDefinitionInputState(event.target.value);
    }

    function toggleSortByWordState(){
        setSortByWordState({...sortByWordState,isSort:!sortByWordState.isSort});
    }

    function setSortByWordOrder(event){
        setSortByWordState({...sortByWordState,order:event.target.value});
    }

    function onAddWordWithInputValue(){
        if(!isInputValidation(wordInputState) || !isInputValidation(definitionInputState)){
            setErrorState(getErrorMessage('not valid input'));
            return;
        }
        onAddWord(wordListId,wordInputState,definitionInputState);
        clearInput();
    }

    function onDeleteAllWordWithWordListId(){
        onDeleteAllWord(wordListId);
    }

    function clearInput(){
        setDefinitionInputState('');
        setWordInputState('');
    }

    return (
        <div className={'word-list'}>
            <h3 > {wordList.wordListName} </h3>
            <div className={'list-management'}>
                <button className={'button'} onClick={onRefresh}>Refresh</button>
                <button className={'button delete'} onClick={onDeleteAllWordWithWordListId}>Delete</button>
            </div>
            <div className={'list-filter'}>
                <SortByTaskFilter checkBoxOnchange={toggleSortByWordState} selectOnchange={setSortByWordOrder} state={sortByWordState}/>
            </div>
            <ul>
                {words}
            </ul>
            <div className={'add-item'}>
                <label className={'new-word'}>Add Task</label>
                <span>Word</span>
                <input className={'text-input new-word-name-input'} value={wordInputState} onChange={getWordNameInput}/>
                <span>Definition</span>
                <input className={'text-input new-definition-input'} value={definitionInputState} onChange={getDefinitionInput}/>
                <button className={'add'} onClick={onAddWordWithInputValue}>Add</button>
            </div>
        </div>
    )
};


export default WordList;
