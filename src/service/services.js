
export const fetchLogInService = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username : username }),
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};


export const fetchLogoutService  = function () {
    return fetch('/session', {
        method: 'DELETE',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return ;
        });
};

export const fetchLoginStatusService = () => {
    return fetch('/session', {
        method: 'GET',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};





/* ------------- theme related fetch call ----------------*/

export const fetchThemeService = (username) => {
    return fetch(`/theme/${username}`, {
        method: 'GET',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(response.status === 304){
                return response.json();
            }
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const updateThemeService = (username,theme) => {
    return fetch(`/theme/${username}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ theme : theme }),
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};



/* ------------- wordList related Service call ----------------*/
export const getAllWordListService = (username) => {
    return fetch(`/wordList/${username}`, {
        method: 'GET',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const getWordListService = (username,wordListId) => {
    return fetch(`/wordList/${username}/${wordListId}`, {
        method: 'GET',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const createWordListService = (username,wordListName,wordList) => {
    return fetch(`/wordList/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
                wordListName:wordListName,
                wordList: wordList
        }),
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const updateWordListService = (username,wordListId,wordList) => {
    return fetch(`/wordList/${username}/${wordListId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
            wordList:wordList
        }),
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const removeWordListService = (username,wordListId) => {
    return fetch(`/wordList/${username}/${wordListId}`, {
        method: 'DELETE',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const removeAllWordListService = (username) => {
    return fetch(`/wordList/${username}`, {
        method: 'DELETE',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

/* ------------- wordList related Service call ----------------*/

export const getWordService = (username,wordListId,wordId) => {
    return fetch(`/word/${username}/${wordListId}/${wordId}`, {
        method: 'GET',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const createWordService = (username,wordListId,word) => {
    return fetch(`/word/${username}/${wordListId}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
                word:word
        }),
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const updateWordService = (username,wordListId,wordId,word) => {
    return fetch(`/word/${username}/${wordListId}/${wordId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
            word:word
        }),
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const removeWordService = (username,wordListId,wordId) => {
    return fetch(`/word/${username}/${wordListId}/${wordId}`, {
        method: 'DELETE',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};

export const removeAllWordService = (username,wordListId) => {
    return fetch(`/word/${username}/${wordListId}`, {
        method: 'DELETE',
    })
        .catch( () => {
            return Promise.reject({code: 'network-error'});
        })
        .then( (response) => {
            if(!response.ok) {
                return response.json().then( result => Promise.reject(result) );
            }
            return response.json();
        });
};
