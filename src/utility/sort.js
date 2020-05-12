export function sortByAlphabeticalAscending(a,b){
    if(a.wordName.toUpperCase() < b.wordName.toUpperCase()) { return -1; }
    if(a.wordName.toUpperCase() > b.wordName.toUpperCase()) { return 1; }
    return 0;
}


export function sortByAlphabeticalDescending(a,b){
    if(a.wordName.toUpperCase() < b.wordName.toUpperCase()) { return 1; }
    if(a.wordName.toUpperCase() > b.wordName.toUpperCase()) { return -1; }
    return 0;
}


