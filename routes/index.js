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

function tracks(){
  return knex('tracks')
}

function setlist(){
  return knex('setlists')
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

router.get('/music/:name', function(req, res, next){
  var track
  var album
  tracks().where('album', req.params.name).then(function(result){
    track = result;
  })
  albums().where('name', req.params.name).then(function(results){
    album = results
    res.render('music/show', {tracks: track, album: album})
    console.log(album)
    console.log(track);
  })
})

router.get('/music/song/:name', function(req, res, next){
  setlist().where('song', req.params.name).then(function(results){
    console.log(results)
    res.render('music/song/show', {results: results})
  })
})

router.get('/songs', function(req, res, next){
  tracks().select().then(function(results){
    res.render('songs/index', {results: results})
  })
})

router.get('/setlists', function(req, res, next){
  setlist().select().then(function(results){
    var list = [];
    var objList = [];
    for (var i = 0; i < results.length; i++) {
      var obj = {}
      obj.title = results[i].title
      obj.date = results[i].date
      obj.venue = results[i].venue
      obj.city = results[i].city
      obj.state = results[i].state
      obj.country = results[i].country
      var count = 0;
      for (var j = 0; j < results.length; j++) {
        if (results[j].title == results[i].title){
          count++;
        }
      }
      obj.count = count;
      if (list.indexOf(results[i].title) < 0){
        list.push(results[i].title)
        objList.push(obj)
      }
    }
    console.log(objList)
    res.render('setlists/index', {results: list})
  })
})
module.exports = router;
