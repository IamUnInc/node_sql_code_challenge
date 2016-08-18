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
  var animal = req.body;
  var number = random.randomNumber(1, 100);
    console.log('number', number);
    console.log(animal);

  pg.connect(connectionString, function (err, client, done) {
  if (err) {
    res.sendStatus(500);
  }

  client.query("INSERT INTO zoo_animals (animal_type, animal_type_number) "
              +  "VALUES ('" + animal.animal + "'," + number + ")",
              // [animal.animal, number],
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
