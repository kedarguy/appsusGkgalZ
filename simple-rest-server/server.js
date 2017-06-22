const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// This is my data (one day it will come from database)
// let items = [
//     {id: 8,title: 'Mastering SCSS', price: 78, description: 'bla bla'},
//     {id: 9,title: 'Mastering $', price: 8, description: 'jq bla bla'}
// ];

let puki = {
    userEmail: 'puki@puki.com',
    emails: [ ]
}

let shuki= {
    userEmail: 'shuki@shuki.com',
    emails: [
        {from: puki.userEmail, subject: '1', content: '1'},
        {from: puki.userEmail, subject: '2', content: '2'},
        {from: puki.userEmail, subject: '3', content: '3'},
        {from: puki.userEmail, subject: '4', content: '4'},
    ]
}

let users = [puki, shuki];

let loggedInUser = shuki;

function getUserByEmail(emailAddress) {
  console.log('Email add')
  console.log(emailAddress)
    var answer = users.find(function (searchUser) { 
    return searchUser.userEmail === emailAddress})
    return answer;
}

// *** REST API ***

app.get('/h', (request, response) => {  
  response.send('Hello from Express!')
})


// LIST
app.get('/users', (req, res) => {
//   setTimeout(()=>res.json(items), 2000);
console.log('getting users')
    res.json(users);
})

app.get('/currUser', (req, res) => {
  console.log('getting curr user')
//   setTimeout(()=>res.json(items), 2000);
    res.json(loggedInUser);
})


// READ
app.get('/item/:id', (req, res) => {
  const id = +req.params.id;
  const item = items.find(currItem => currItem.id === id);
  res.json(item)
})

// DELETE
app.delete('/item/:id', (req, res) => {
  const id = +req.params.id;
  items = items.filter(currItem => currItem.id !== id);
  res.json({msg: 'Deleted'});
})

// CREATE
app.post('/newEmail', (req, res) => {
    const email =  req.body; 
    email.from = loggedInUser.userEmail;
    loggedInUser.emails.push(email);
    var recieverUser = getUserByEmail(email.to);
    recieverUser.emails.push(email);
  res.json({msg: 'email was sent!'});
})

// TODO: UPDATE
app.put('/item', (req, res) => {
  const item =  req.body; 
  items = items.map(currItem => (currItem.id === item.id)? item: currItem);
  res.json({msg: 'Item was updates!'});
})

app.listen(3003, () => {
  console.log('REST API listening on port 3003!')
})

function findNextId() {
    var maxId = 0;
    items.forEach(item => {
        if (item.id > maxId) maxId = item.id;
    });
    return maxId + 1;
}


