const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
var uniqid = require('uniqid');
// const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let notes = require('./db/db');
// Use apiRoutes
// app.use('/api', apiRoutes);

const saveNotes = function () {
     fs.writeFile(path.join(__dirname, './db/db.json'),
          JSON.stringify(notes),
          (err) => {
               if (err) throw err;
               console.log('Note Saved');
          });
};

app.get('/api/notes', (req, res) => {
     return res.json(notes)
});

app.post('/api/notes', (req,res) => {
     const note = req.body;
     note.id = uniqid();
      notes.push(note);
      saveNotes();
 
     res.json(note);
 }); 

app.use('/', htmlRoutes);

app.listen(PORT, () => {
     console.log(`API server now on port ${PORT}!`);
});