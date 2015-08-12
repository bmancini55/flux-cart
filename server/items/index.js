let express = require('express');
let app     = express();
let fs      = require('fs');
let path    = require('path');
let _       = require('lodash');

app.get('/api/items',         (req, res, next) => handleItems(req, res).catch(next));
app.get('/api/items/:itemId', (req, res, next) => handleItem(req, res).catch(next));


function readFileAsync(filepath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filepath, function(err, buffer) {
      if(err) reject(err);
      else    resolve(buffer);
    });
  });
}

async function loadItems() {
  let filePath = path.join(__dirname, 'items.json');
  let buffer   = await readFileAsync(filePath);
  let json     = buffer.toString();
  return JSON.parse(json);
}

async function handleItems(req, res) {
  let items = await loadItems();
  res.json(items);
}

async function handleItem(req, res) {
  let itemId = req.params.itemId;
  let items  = await loadItems();
  let lookup = _.indexBy(items, 'id');
  let item   = lookup[itemId];
  if(!item) res.status(404).end();
  else      res.json(item);
}


module.exports = app;
