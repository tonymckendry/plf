var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function tour(){
  return knex('tour');
}

function albums(){
  return knex('albums');
}

function tracks(){
  return knex('tracks')
}

function setlist(){
  return knex('setlists')
}


module.exports = router;
