
export const errorMessage = {
    'network-error':'Can not connect to the server, please check your network connection',
    'no valid session': 'There is a authentication occur, please login again.',
    'login denied' : 'The username is empty or contain illegal character, please input username again',
    'action not permitted' : 'You are not allow to perform such action',
    'no tasks for user' : 'Can not find the task, please try again',
    'failed to update' : 'Can not update the task, please try again',
    'task name empty' :'the task name is empty, please enter the desired task name',
    'require information missing' : 'there is require information missing, please try again',
    'no such wordList': 'The wordList you want to change has been removed or updated, please check if the wordList exist',
    'no such word' :'The word you want to change has been removed or updated, please check if the wordList exist',
    'failed to delete' : 'Can not delete the task, please try again',
    'not valid input' : 'The information you provide is empty or only contain empty, please try again'
};


export function getErrorMessage(err){
    return errorMessage[err] || err;
}