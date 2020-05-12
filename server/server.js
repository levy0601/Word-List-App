
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.remove);

app.get('/theme/:username', routes.theme.read);
app.put('/theme/:username', routes.theme.update);

app.get('/wordList/:username',routes.wordLists.wordList.getAll);
app.get('/wordList/:username/:wordListId',routes.wordLists.wordList.get);
app.post('/wordList/:username',routes.wordLists.wordList.create);
app.put('/wordList/:username/:wordListId',routes.wordLists.wordList.update);
app.delete('/wordList/:username/:wordListId',routes.wordLists.wordList.remove);
app.delete('/wordList/:username/',routes.wordLists.wordList.removeALL);

app.get('/word/:username/:wordListId/:wordId',routes.wordLists.word.get);
app.post('/word/:username/:wordListId/',routes.wordLists.word.create);
app.put('/word/:username/:wordListId/:wordId',routes.wordLists.word.update);
app.delete('/word/:username/:wordListId/:wordId',routes.wordLists.word.remove);
app.delete('/word/:username/:wordListId/',routes.wordLists.word.removeAll);



app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );
