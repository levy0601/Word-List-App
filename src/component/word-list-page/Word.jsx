import React, {useEffect, useState} from 'react';
import './Word.css';
import isInputValidation from "../../utility/InputValidation";
import {getErrorMessage} from "../../utility/errorMessage";

const Word = ({wordListId,wordId,wordName,definition,onDeleteWord,onUpdateWord,setErrorState}) => {
    const [isEditableState,setIsEditableState] = useState(false);
    const [wordNameState,setWordNameState] = useState('');
    const [definitionState,setDefinitionState] = useState('');

    useEffect(()=>{
        setWordNameState(wordName);
        setDefinitionState(definition);
    },[wordName,definition]);

    function toggleIsEditable(){
        setIsEditableState(!isEditableState);
    }

    function getWordNameInput(event) {
        setWordNameState(event.target.value);
    }

    function getDefinitionInput(event){
        setDefinitionState(event.target.value);
    }

    function setDefaultState(){
        setWordNameState(wordName);
        setDefinitionState(definition);
    }

    function onDeleteWithWordId() {
        onDeleteWord(wordListId,wordId);
    }

    function onUpdateWithInput(){
        if(!isInputValidation(wordNameState) || !isInputValidation(definitionState)){
            setErrorState(getErrorMessage('not valid input'));
            return;
        }
        onUpdateWord(wordListId,wordId,wordNameState,definitionState);
    }


    return (
        <li className={`word-list-item item ${!isEditableState ? "" : "editable"}`} >
            <label className={`label name-label`}>{wordNameState}</label>
            <input className={`text-input name-input`} type={'text'} value={wordNameState} onChange={getWordNameInput}/>
            <label className={`label definition-label`}>{definitionState}</label>
            <input className={`text-input definition-input`} type={'text'} value={definitionState} onChange={getDefinitionInput}/>
            <button className={'edit'} onClick={toggleIsEditable}> Edit</button>
            <button className={'reset'} onClick={setDefaultState}>Undo</button>
            <button className={'delete'} onClick={onDeleteWithWordId}>Delete</button>
            <button className={'update'} onClick={onUpdateWithInput}> Update</button>
        </li>
    )
};


export default Word;
