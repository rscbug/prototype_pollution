import express from 'express'
const bodyParser = require('body-parser')

import { setByPath } from '@clickbar/dot-diver';

const app = express();
const port = 5000;
const host = '0.0.0.0';

const users = [
  {name: 'reader', pwd: 'books'},
  {name: 'admin', pwd: Math.random().toString(32), isAdmin: true},
];

let books = [];
let itemId = 1;

function authUser(user) {
  return users.find((u) => u.name === user.name &&u.pwd === user.pwd);
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(books.length===0?"Empty books":books);
});

app.put('/', (req, res) => {
  const user = authUser(req.body.auth || {});
  if (!user) {
    res.status(403).send('Access denied');
    return;
  }
  const book = {id: 1, title:""};
  try {
// ok: clickbar_prototype_pollution
    setByPath(book, 'id', itemId++);
    
// ruleid: clickbar_prototype_pollution
    setByPath(book, 'title', req.body.title==null?"No title":req.body.title);
    if (req.body.note && req.body.text) {
      
// ruleid: clickbar_prototype_pollution
      setByPath(book, req.body.note, req.body.text);
    }
  } catch (err){
    res.status(403).send(err);
    return;
  }
  books.push(book);
  res.status(200).send("Updated books");
});

app.delete('/', (req, res) => {
  const user = authUser(req.body.auth || {});
  if (!user || !user.isAdmin) {
    res.status(403).send('Access denied');
    return;
  }
  books = books.filter((b) => b.title !== req.body.title);
  res.send("Deleted books with the title: " + req.body.title);
});
app.listen(port, host, () => console.log(`Running server on port ${port}`));
