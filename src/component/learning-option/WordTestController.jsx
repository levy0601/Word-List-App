import React, {useState} from 'react';
import WordTest from "./WordTest";
import './WordTestController.css'
import generateTestOption from "../../utility/generateTestOption";

const WordTestController = ({wordListArray}) => {
    const [indexState,setIndexState] = useState(0);


    function incrementIndex(){
        setIndexState( ((indexState + 1) > (wordListArray.length -1))? wordListArray.length -1 : (indexState + 1));
    }

    function decrementIndex() {
        setIndexState( (indexState -1) < 0 ? 0 : (indexState - 1));
    }

    const newWordListArray = [...wordListArray];
    const testOptions = generateTestOption(wordListArray[indexState],newWordListArray);

    return (
        <div className={'word-test-controller'}>
            <p className={'word-test-title'}>Word Test</p>
            <WordTest word={wordListArray[indexState] ? wordListArray[indexState] : ''} testOptions={testOptions} key={indexState}/>
            <div className={'controller'}>
                <button className={'decrement'} onClick={decrementIndex}> {"<"} </button>
                <button className={'increment'} onClick={incrementIndex}> {">"} </button>
            </div>
        </div>
    )
};


export default WordTestController;
