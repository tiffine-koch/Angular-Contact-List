'use strict';

const PORT = 8888;
const contactJSON = 'contacts.json'

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/contacts', function (req, res) {
    fs.readFile(contactJSON, function(err, data) {
      if(!data) data = [];
      var contacts = JSON.parse(data);
      res.send(contacts);
  });
});

app.post('/contacts', function (req, res) {
  var newContact = req.body;

  fs.readFile(contactJSON, function(err, data){
    var contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFile(contactJSON, JSON.stringify(contacts), function(err, data){
      res.send();
    })
  })
})

app.delete('/contacts/:index', function (req, res) {
  var index = req.params.index;

  fs.readFile(contactJSON, function(err, data) {
    var contacts = JSON.parse(data);
    contacts.splice(index, 1);
    fs.writeFile(contactJSON, JSON.stringify(contacts), function(err, data){
      res.send();
    })
  })
})

app.put('/contacts/:index', function (req, res) {
  var index = req.params.index;
  var editContact = req.body;

  fs.readFile(contactJSON, function(err, data) {
    var contacts = JSON.parse(data);
    contacts.splice(index, 1);
    contacts.splice(index, 0, editContact);
    fs.writeFile(contactJSON, JSON.stringify(contacts), function(err, data){
      res.send();
    })
  })
})

var server = http.createServer(app);
server.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
})
