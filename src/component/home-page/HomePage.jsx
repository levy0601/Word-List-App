import React, {useState} from 'react';
import SelectWordListBlock from "./SelectWordListBlock";
import './HomePage.css';
import isInputValidation from "../../utility/InputValidation";
import {getErrorMessage} from "../../utility/errorMessage";


const HomePage = ({userProfileState,wordListState,onWordListSelect,onDeleteAllList,onDeleteWordList,onCreateWordList,setErrorState}) => {
    const [inputState,setInputState] = useState("");
    const [isCreateState,setIsCreateState] = useState(false);
    const [isEditState,setIsEditState] = useState(false);
    const DEFAULT_WORDLIST = [];

    function getInput(event) {
        setInputState(event.target.value);
    }

    function toggleIsCreateState(){
        setIsCreateState(!isCreateState);
    }

    function createWordList(){
        if(!isInputValidation(inputState)){
            setErrorState(getErrorMessage('not valid input'));
            return;
        }
        onCreateWordList(inputState,DEFAULT_WORDLIST);
        setInputState('');
    }

    function toggleIsEditState(){
        setIsEditState(!isEditState);
    }

    return(
        <div className={'homepage'}>
            <div className={'homepage-description description'}>
                <h3 className={'user'}> {userProfileState.username.toUpperCase() + "'s study set"}</h3>
                <button className={'create-word-list  button'} onClick={toggleIsCreateState}>Create</button>
                <button className={'edit-word-list button'} onClick={toggleIsEditState}>Edit</button>
                <button className={'delete-all-word-list delete-button button'} onClick={onDeleteAllList}>Delete</button>
            </div>
            <SelectWordListBlock wordLists={wordListState} onWordListSelect={onWordListSelect} isEditState={isEditState} onDeleteWordList={onDeleteWordList}/>
            { isCreateState && <div className={'home-page-add-list'}>
                <span className={'new-task'}>WordList Name</span>
                <input className={'text-input new-task-input'} onChange={getInput} value={inputState}/>
                <button className={'add'} onClick={createWordList}>Add</button>
            </div>}
        </div>
    )
};


export default HomePage;
