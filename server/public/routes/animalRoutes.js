var express = require ('express');
var router = express.Router();
var pg = require('pg'); //This connects to db
var connectionString = 'postgres://localhost:5432/omicron';
var random = require ('./rando.js');

router.get('/', function (req, res) {
  //Retrieve books from database
  //connectionString is the connection and then function. err - error, client - this is where we query
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM zoo_animals', function(err, result) {
      done();
      if(err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var animals = req.body;
  var number = random.randomNumber(1, 100);
    console.log('number', number);

  pg.connect(connectionString, function (err, client, done) {
  if (err) {
    res.sendStatus(500);
  }
  //im getting everything to work but in my database I can't see any input.
  //even with the database connected the termial is giving me no feed back except
  // "nicholas-mateckis-powerbook-g4:~ nmatecki$ postgres
  // FATAL:  lock file "postmaster.pid" already exists
  // HINT:  Is another postmaster (PID 54580) running in data directory "/usr/local/var/postgres"?"
  // I'm also getting "throw new Error('Can\'t set headers after they are sent.');" sever side which I could not resolve.

  client.query('INSERT INTO zoo_animals (animals_type, animal_type_number) '
              +  'VALUES ($1, $2)',
              [animals.animal, number],
              function (err, result){
                done();
                console.log('sql i work');
                if (err) {
                  res.sendStatus(500);
                }


                res.sendStatus(201); // 201 - created
              });
  });
});



module.exports = router;
