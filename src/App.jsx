import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import {
    createWordListService,
    createWordService,
    fetchLogInService,
    fetchLoginStatusService,
    fetchLogoutService,
    getAllWordListService,
    removeAllWordListService,
    removeAllWordService,
    removeWordListService,
    removeWordService,
    updateThemeService,
    updateWordService
} from "../src/service/services";
import {getErrorMessage} from "./utility/errorMessage";
import NavigationBar from "./component/navigation/NavigationBar";
import Login from "./component/login/Login";
import WordListPage from "./component/word-list-page/WordListPage";
import HomePage from "./component/home-page/HomePage";
import wordListReducer from './reducer/wordListReducer';

function App() {
    const [isLoggedInState, setIsLoggedInState] = useState(false);
    const [errorState, setErrorState] = useState("");
    const [userProfileState, setUserProfileState] = useState({});
    const [selectWordListState,setSelectWordListState] = useState({isSelected:false,wordListId:null});
    const [wordListState, wordListDispatch] = useReducer(wordListReducer, {});

    useEffect(() => {
        getUserProfile();
    }, []);

    /* --------------------wordList related function ----------------------------*/
    function getAllWordList(username) {
        clearErrorState();
        getAllWordListService(userProfileState.username || username)
        .then((response) => {
            const wordLists = response.data;
            setWordListToLocalState(wordLists);
        })
        .catch((error) => {
            if (error.message === "no valid session") {
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });
    }

    function setWordListToLocalState(wordList) {
        wordListDispatch({type: 'setWordList', wordList: wordList});
    }


    function removeAllWordList (){
        clearErrorState();
        removeAllWordListService(userProfileState.username)
        .then(()=>{
            removeAllWordListFromLocalState();
        })
        .catch((error)=>{
            if(error.message === "no valid session"){
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });
    }

    function removeAllWordListFromLocalState() {
        wordListDispatch({type: 'deleteAllWordList'});
    }

    function removeWordList(wordListId){
        clearErrorState();
        removeWordListService(userProfileState.username,wordListId)
        .then(()=>{
            removeWordListFromLocalState(wordListId);
        })
        .catch((error)=>{
            if(error.message === "no valid session"){
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });

    }

    function removeWordListFromLocalState(wordListId) {
        wordListDispatch({type: 'deleteWordList',wordListId:wordListId});
    }

    function createWordList(wordListName,wordList) {
        clearErrorState();
        createWordListService(userProfileState.username,wordListName,wordList)
        .then((response)=>{
            createWordListToLocalState(response.data.wordListId,response.data.wordListName,
                response.data.words);
        })
        .catch((error)=>{
            if(error.message === "no valid session"){
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });
        
    }
    
    function createWordListToLocalState(wordListId,wordListName,wordList) {
        wordListDispatch({type:'postWordList',wordListId:wordListId,wordListName:wordListName,
            wordList:wordList});

    }

    /* --------------------word related function ----------------------------*/
    function createWord(wordListId,wordName,definition){
        clearErrorState();
        createWordService(userProfileState.username,wordListId,{wordName,definition})
        .then((response)=>{
            const wordId = response.data.wordId;
            createWordToLocalState(wordListId,wordId,wordName,definition);
        })
        .catch((error)=>{
            if(error.message === "no valid session"){
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });
    }

    function createWordToLocalState(wordListId,wordId,wordName,definition){
        wordListDispatch({type:'postWord',wordListId:wordListId,wordId:wordId,wordName:wordName,definition:definition});
    }

    function updateWord(wordListId,wordId,wordName,definition){
        clearErrorState();
        updateWordService(userProfileState.username,wordListId,wordId,{wordName,definition})
        .then(()=>{
            updateWordToLocalState(wordListId,wordId,wordName,definition);
        })
        .catch((error)=>{
        if(error.message === "no valid session"){
            logout();
        }
        setErrorState(getErrorMessage(error.message));
        });

    }

    function updateWordToLocalState(wordListId,wordId,wordName,definition){
        wordListDispatch({type:'updateWord',wordListId:wordListId,wordId:wordId,wordName:wordName,definition:definition});
    }

    function removeWord(wordListId,wordId){
        clearErrorState();
        removeWordService(userProfileState.username,wordListId,wordId)
        .then(()=>{
            removeWordFromLocalState(wordListId,wordId);
        })
        .catch((error)=>{
            if(error.message === "no valid session"){
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });
    }

    function removeWordFromLocalState(wordListId,wordId){
        wordListDispatch({type:'deleteWord',wordListId:wordListId,wordId:wordId});
    }


    function removeAllWord(wordListId){
        clearErrorState();
        removeAllWordService(userProfileState.username,wordListId)
        .then(()=>{
            removeAllWordFromLocalState(wordListId);
        })
        .catch((error)=>{
            if(error.message === "no valid session"){
                logout();
            }
            setErrorState(getErrorMessage(error.message));
        });
    }

    function removeAllWordFromLocalState(wordListId){
        wordListDispatch({type:'deleteAllWord',wordListId:wordListId});
    }


    /* --------------------Login related function ----------------------------*/
    function login(username) {
        return fetchLogInService(username)
            .then(() => {
                getUserProfile();
            });
    }

    /* --------------------Navigation related function ----------------------------*/
    function logout() {
        clearState();
        fetchLogoutService();
    }

    function setTheme(event) {
        clearErrorState();
        const theme = event.target.value;
        updateThemeService(userProfileState.username, theme)
            .then(() => {
                setUserProfile(userProfileState.username, theme);
                document.body.setAttribute('data-theme', theme);
            })
            .catch((error) => {
                if (error.message === "no valid session") {
                    logout();
                }
                setErrorState(getErrorMessage(error.message));
            });
    }

    function getUserProfile() {
        return fetchLoginStatusService()
            .then((response) => {
                const username = response.data.username;
                let theme = response.data.theme;
                setUserProfile(username, theme);
                return response;
            }).then((response) => {
                getAllWordList(response.data.username);
                return response;
            }).then((response) => {
                setIsLoggedInState(true);
                document.body.setAttribute('data-theme', response.data.theme);
            })
            .catch((error) => {
                setErrorState(getErrorMessage(error.message));
            });
    }

    function setUserProfile(username, theme) {
        setUserProfileState({...userProfileState, username: username, theme: theme});
    }

    function clearState() {
        setUserProfileState({});
        clearErrorState();
        setIsLoggedInState(false);
        setWordListToLocalState({});
    }

    function clearErrorState() {
        setErrorState('');
    }

    /* --------------------HomePage related function ----------------------------*/
    function selectWordList(wordListId){
        clearErrorState();
        setSelectWordListState({isSelected: true,wordListId:wordListId});

    }
    /* --------------------WordListPage related function ----------------------------*/
    function back(){
        clearErrorState();
        setSelectWordListState({isSelected:false,wordListId:null});
    }

    /* --------------------rendering ---------------------------------*/
    let content;

    if (isLoggedInState) {
        if(!selectWordListState.isSelected){
            content =
                <div>
                    <HomePage wordListState={wordListState} userProfileState={userProfileState}
                              onWordListSelect={selectWordList} onDeleteAllList={removeAllWordList}
                              onDeleteWordList={removeWordList} onCreateWordList={createWordList} setErrorState={setErrorState}/>
                </div>
        }else{
            const wordList = wordListState[selectWordListState.wordListId];
            content = <WordListPage wordList={wordList} onAddWord={createWord} onUpdateWord={updateWord}
                                    onDeleteWord={removeWord} onDeleteAllWord={removeAllWord} onRefreshList={getAllWordList}
                                    setErrorState={setErrorState}/>
        }

    } else {
        content = <p/>
    }

    return (
        <div className="App">
            {isLoggedInState && <NavigationBar userProfileState={userProfileState} isLoggedIn={isLoggedInState}
                                               onLogout={logout} error={errorState} onThemeChange={setTheme}
                                               onBack={back} selectWordListState={selectWordListState}/>}
            {!isLoggedInState && <Login onLogin={login} setError={setErrorState}/>}
            {content}
        </div>
    );
}

export default App;
