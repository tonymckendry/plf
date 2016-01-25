var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgress://localhost/plf'
})

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

router.get('/', function(req, res, next){
  setlist().select('song').distinct().orderBy('song','asc').then(function(results){
    var list = [];
    for (var i = 0; i < results.length; i++) {
      var obj = {}
      var song = results[i].song
      setlist().where('song', song).then(function(forCount){
        obj.song = song
        obj.count = forCount.length
      })
    }
    console.log(list)
    res.render('songs/index', {results: results})
  })
})

module.exports = router;
