var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: 'postgress://localhost/plf'
})

function tour(){
  return knex('tour');
}

function albums(){
  return knex('albums');
}

function singles(){
  return knex('singles')
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tour', function(req, res, next){
  tour().select().then(function(result){
    console.log(result)
    res.render('tour/index', {result: result})
  })
})

router.get('/music', function(req, res, next){
  albums().select().then(function(result){
    var albums = [];
    var singles = [];
    var others = [];
    for (var i = 0; i < result.length; i++) {
      if(result[i].type == 'album'){
        albums.push(result[i]);
      }
      else if (result[i].type == 'single'){
        singles.push(result[i])
      }
      else if (result[i].type == 'other'){
        others.push(result[i])
      }
    }
    console.log(albums[0])
    res.render('music/index', {albums: albums, singles: singles, others: others})
  })
})

module.exports = router;
