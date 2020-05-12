const session = require('../session');
const theme = require('../theme');
const wordLists = require('../wordLists');

const web = (res) => {
  return ({ message, status, data }={}) => {
    if(!message && !data) {
      data = 'OK';
    }
    res.status(status || 200).json({ message, data });
  };
};

const routes = {
  session: { },
  theme: { },
  wordLists: {
    wordList: {},
    word: {},
  },
};

//Session
routes.session.status = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }
  web(res)({ data: session.getSession(sid) } );
};

routes.session.create = ( req, res ) => {
  const username = req.body.username;
  const sessionInfo = session.attemptCreate(username);
  if(!sessionInfo) {
    web(res)({ status: 403, message: 'login denied' });
    return;
  }
  res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60 } );
  web(res)({data: sessionInfo});
};

routes.session.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }
  res.clearCookie('sid');
  session.remove(sid);
  web(res)();
};

// Theme
routes.theme.read = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }
  const foundTheme = theme.getTheme(username);
  web(res)({ data: foundTheme });
};

routes.theme.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const themeValue = req.body.theme;
  theme.setTheme({ username, theme: themeValue});
  web(res)();
};

//wordList operation
routes.wordLists.wordList.get = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  if(!wordListId){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const wordList = wordLists.getWordList({username,wordListId});
  if(!wordList) {
    web(res)({ status: 404, message: 'no such wordList' });
    return;
  }

  web(res)({ data: wordList});
};

routes.wordLists.wordList.getAll = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  web(res)({ data: wordLists.getAllWordList(username)});
};

routes.wordLists.wordList.create = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListName = req.body.wordListName;
  const wordList = req.body.wordList;
  if(!wordListName){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  web(res)({ data: wordLists.createWordList({username,wordListName,wordList})});
};

routes.wordLists.wordList.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  const wordList = req.body.wordList;
  if(!wordList || !wordListId){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const newWordList = wordLists.updateWordList({username,wordListId,wordList});
  if(!newWordList) {
    web(res)({ status: 400, message: 'failed to update' });
    return;
  }

  web(res)({ data: newWordList } );
};

routes.wordLists.wordList.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  if(!wordListId){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const deletedWordList = wordLists.removeWordList({username,wordListId});
  if(!deletedWordList) {
    web(res)({ status: 400, message: 'failed to delete' });
    return;
  }

  web(res)({ data: deletedWordList } );
};

routes.wordLists.wordList.removeALL = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const all = wordLists.removeAllWordList(username);
  if(!all) {
    web(res)({ status: 404, message: 'no wordList for user' });
    return;
  }

  web(res)({ data: all } );
};

// word operation
routes.wordLists.word.get = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  const wordId = req.params.wordId;
  if(!wordListId || !wordId){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const word = wordLists.getWord({username,wordListId,wordId});
  if(!word) {
    web(res)({ status: 404, message: 'no such word' });
    return;
  }

  web(res)({ data: word});

};

routes.wordLists.word.create = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  const word = req.body.word;
  if(!wordListId||!word){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  web(res)({ data: wordLists.createWord({username,wordListId,word})});

};

routes.wordLists.word.update = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  const wordId = req.params.wordId;
  const word = req.body.word;
  if(!wordListId || !wordId || !word){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const updateWord = wordLists.updateWord({username,wordListId,wordId,word});
  if(!updateWord) {
    web(res)({ status: 400, message: 'failed to update' });
    return;
  }

  web(res)({ data: updateWord } );
};

routes.wordLists.word.remove = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  const wordId = req.params.wordId;
  if(!wordListId||!wordId){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const deletedWord = wordLists.removeWord({username,wordListId,wordId});
  if(!deletedWord) {
    web(res)({ status: 400, message: 'failed to delete' });
    return;
  }

  web(res)({ data: deletedWord } );
};


routes.wordLists.word.removeAll = ( req, res ) => {
  const sid = req.cookies.sid;
  const validSession = session.validateSession(sid);
  if(!validSession) {
    res.clearCookie('sid');
    web(res)({status: 401, message: 'no valid session' });
    return;
  }

  const username = req.params.username;
  const isAllowed = session.canReadUser({ sid, username });
  if(!isAllowed) {
    web(res)({status: 403, message: 'action not permitted' });
    return;
  }

  const wordListId = req.params.wordListId;
  if(!wordListId){
    web(res)({status: 403, message: 'require information missing' });
    return;
  }

  const deletedWordList = wordLists.removeAllWord({username,wordListId});
  if(!deletedWordList) {
    web(res)({ status: 400, message: 'failed to delete' });
    return;
  }

  web(res)({ data: deletedWordList } );
};


module.exports = routes;
