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

/* GET home page. */
router.get('/', function(req, res, next) {
  setlist().select('venue','city', 'state').distinct().then(function(results){

    res.render('index', { results: results});
  })
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
    albums().where('name', req.params.name).then(function(results){
      album = results
      res.render('music/show', {tracks: track, album: album})
      console.log(album)
      console.log(track);
    })
  })
})

router.get('/music/song/:name', function(req, res, next){

  setlist().where('song', req.params.name).then(function(results){
    tracks().where('trackname', req.params.name).then(function(aResult){
      setlist().select('title').distinct().then(function(bResult){
        // console.log(aResult[0].album)
        var total = bResult.length;
        res.render('music/song/show', {results: results, album: aResult, total: total})

      })
    })
  })
})

router.get('/setlists', function(req, res, next){
  setlist().select().orderBy('date').then(function(results){
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
    var today = new Date();
    var yyyy = today.getFullYear();
    console.log(yyyy)
    tour().select().first().then(function(tour){

      res.render('setlists/index', {results: objList, today:today, tour: tour})
    })

  })
})

router.get('/setlists/list', function(req, res, next){
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
    res.render('setlists/list', {results: objList})
  })
})

router.get('/setlists/new', function(req, res, next){
  res.render('setlists/new')
})

router.post('/setlists', function(req, res){
  var obj = {
    title: req.body.title,
    date: req.body.date,
    venue: req.body.venue,
    city: req.body.city,
    state: req.body.state
  }
  var total = req.body.totalSongs
  for (var i = 0; i < total; i++) {
    var songi = "song" + i
    var song = req.body['song' + (i+1).toString()]
    var notes = req.body['notes' + (i+1).toString()]
    var tran = req.body['ta' + (i+1).toString()]
      obj.song = song
      obj.notes = notes
      obj.tran = tran
      console.log(obj)
      setlist().insert(obj).promise();
  }
})

router.get('/setlists/:title', function(req, res, next){
  var title = req.params.title
  setlist().where('title', title).then(function(results){
    console.log(results)
    var count = results.length
    res.render('setlists/show', {results: results, count: count})
  })
})


router.get('/venues', function(req, res, next){
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
        if (results[j].venue == results[i].venue){
          count++;
        }
      }
      obj.count = count;
      if (list.indexOf(results[i].venue) < 0){
        list.push(results[i].venue)
        objList.push(obj)
      }
    }
    console.log(objList)
    res.render('venues/index', {results: objList})
  })
})

router.get('/venues/:name', function(req, res, next){
  setlist().where('venue', req.params.name).then(function(results){
    var list = [];
    var objList = [];
    for (var i = 0; i < results.length; i++) {
      var obj = {}
      obj.title = results[i].title
      obj.date = results[i].date
      obj.city = results[i].city
      obj.state = results[i].state
      obj.country = results[i].country
      obj.venue = results[i].venue
      console.log(obj)
      if (list.indexOf(results[i].title) < 0){
        objList.push(obj)
        list.push(results[i].title)
      }
    }
    res.render('venues/show', {results: objList})
    console.log(objList)
  })
})

module.exports = router;
