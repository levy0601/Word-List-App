const { v4: uuidv4 } = require('uuid');

const wordLists = {};

const getWordList = ({username,wordListId}) =>{
    if(!wordListId||!username||!wordLists[username]||!wordLists[username][wordListId] ){
        return;
    }

    return wordLists[username][wordListId];
};

const getAllWordList = (username)=>{
    if (!username){
        return;
    }
    if(!wordLists[username]){
        return {};
    }
    return wordLists[username];
};

const createWordList = ({username,wordListName,wordList}) =>{
    if(!username){
        return;
    }
    wordLists[username] = wordLists[username] || {};
    const wordListId = uuidv4();
    wordLists[username][wordListId] = {wordListName,wordListId,'words' : {}};
    wordList = wordList || [];
    wordList.map((word) => {createWord({username,wordListId,word})});
    return wordLists[username][wordListId];
};

const updateWordList = ({username,wordListId,wordList})=>{
    if (!username || !wordListId || !wordList ){
        return;
    }
    removeAllWord({username,wordListId});
    wordList.map((word) => {createWord({username,wordListId,word})});
    return wordLists[username][wordListId];
};

const removeWordList = ({username,wordListId})=>{
    if (!wordLists[username][wordListId]){
        return;
    }

    const deletedWordList = wordLists[username][wordListId];
    delete wordLists[username][wordListId];
    return deletedWordList;
};


const removeAllWordList = (username) =>{
    if (!wordLists[username]){
        return;
    }
    const allWordList = wordLists[username];
    wordLists[username] = {};
    return allWordList;
};

const getWord = ({username,wordListId,wordId}) =>{
    if(!wordLists[username]||!wordLists[username][wordListId]||!wordLists[username][wordListId]['words'][wordId] ){
        return;
    }

    const word =  getWordList({username,wordListId})['words'][wordId];
    return word;
};

const createWord = ({username,wordListId,word})=>{
    if(!wordLists[username]||!wordLists[username][wordListId]){
        return;
    }

    wordLists[username][wordListId] = wordLists[username][wordListId] || {};
    const wordId = uuidv4();
    wordLists[username][wordListId]['words'][wordId] = {...word,wordId};
    return wordLists[username][wordListId]['words'][wordId];
};

const updateWord = ({username,wordListId,wordId,word}) =>{
    if(!wordLists[username]||!wordLists[username][wordListId]||!wordLists[username][wordListId]['words'][wordId] ){
        return;
    }

    wordLists[username][wordListId]['words'][wordId] = {...word,wordId};
    return wordLists[username][wordListId]['words'][wordId];
};

const removeWord = ({username,wordListId,wordId}) =>{
    if(!wordLists[username]||!wordLists[username][wordListId]||!wordLists[username][wordListId]['words'][wordId] ){
        return;
    }

    const deletedWord = wordLists[username][wordListId]['words'][wordId];
    delete wordLists[username][wordListId]['words'][wordId];
    return deletedWord;
};

const removeAllWord = ({username,wordListId}) =>{
    if ( !wordLists[username][wordListId]){
        return;
    }

    const deletedWordList = wordLists[username][wordListId];
    const wordListName = deletedWordList.wordListName;
    wordLists[username][wordListId] = {wordListId,wordListName,words:{}};
    return deletedWordList;
};

module.exports = {
    getWordList,
    getAllWordList,
    createWordList,
    updateWordList,
    removeWordList,
    removeAllWordList,
    getWord,
    createWord,
    updateWord,
    removeWord,
    removeAllWord

};
