const taskReducer = (state , action) => {
    switch (action.type) {
        case 'setWordList': {
            let newState = action.wordList;
            return {...newState};
        }
        case 'getWordList': {
            return state;
        }
        case 'postWordList': {
            const newWordList = createNewWordList(action.wordListName, action.wordListId, action.words);
            return {...state, [action.wordListId]: newWordList};
        }
        case 'updateWordList': {
            const updateTask = createNewWordList(action.wordListName, action.wordListId, action.words);
            return {...state, [action.wordListId]: updateTask};
        }
        case 'deleteWordList': {
            const deletedState = {...state};
            delete deletedState[action.wordListId];
            return deletedState;
        }
        case 'deleteAllWordList': {
            return {};
        }
        case 'postWord': {
            let newState = {...state};
            newState[action.wordListId]['words'][action.wordId] = createNewWord(action.wordName, action.definition, action.wordId);
            return newState;
        }
        case 'updateWord': {
            let newState = {...state};
            newState[action.wordListId]['words'][action.wordId] = createNewWord(action.wordName, action.definition, action.wordId);
            return newState;
        }
        case 'deleteWord': {
            let newState = {...state};
            delete newState[action.wordListId]['words'][action.wordId];
            return newState;
        }
        case 'deleteAllWord': {
            let newState = {...state};
            newState[action.wordListId]['words'] = {};
            return newState;
        }
        default:
            return state;
    }
};


export function createNewWordList(wordListName,wordListId,words){
    return {wordListName:wordListName,wordListId:wordListId,words: words||{}}
}

export function createNewWord(wordName,definition,wordId) {
    return {wordName:wordName,definition:definition,wordId:wordId}
}


export default taskReducer;