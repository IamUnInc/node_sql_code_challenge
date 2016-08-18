$(document).ready(function () {
    getAnimals();

  $('#animal-submit').on('click', postAnimals);

});


function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      $('#animal-list').empty();
      console.log('GET /animals returns:', animals);
      animals.forEach(function (animal) {
        var $el = $('<div></div>');

        var animalProperties = ['animal_id', 'animal_type', 'animal_type_number'];

        animalProperties.forEach(function(property){
          var $input = $('<input type="text" id="' + property + '"name="' + property + '" />"');
          $input.val(animal[property]);
          $el.append($input);
        });


        $el.data('animalId', animal.id);

        $('#animal-list').append($el);
      });
    },

    error: function (response) {
      console.log('GET /animalRoutes fail. No animals could be retrieved!');
    },
  });
}

function postAnimals() {
  event.preventDefault();

  var animal = {};

  $.each($('#Animal-Form').serializeArray(), function (i, field) {

    animal[field.name] = field.value;

  });
  console.log(animal);

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function () {
      console.log('POST /animals works!');
      $('#animal-list').empty();
      getAnimals();
    },

    error: function (response) {
      console.log('POST /animals does not work...');
    },
  });
}
