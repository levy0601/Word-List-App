function shuffleContent(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function generateTestOption(word,wordListArray){
    if(wordListArray.length === 0){
        return [];
    }

    if(wordListArray.length === 1){
        return wordListArray;
    }

    if(wordListArray.length <= 4){
        return shuffleContent(wordListArray);
    }

    let wordListFiltered = wordListArray.filter(item => item.wordName !== word.wordName); //remove the correct answer from array
    wordListFiltered = shuffleContent(wordListFiltered);//shuffle

    const sliceIndex = getRandomInt(0,wordListFiltered.length - 3); //generate random number from 0 to array.length-3

    const sliceWordList = wordListFiltered.slice(sliceIndex, sliceIndex + 3); //slice from the random index
    sliceWordList.push(word); // push the correct answer back into array

    const testOption = shuffleContent(sliceWordList);//shuffle again

    return testOption;
}

export default generateTestOption;