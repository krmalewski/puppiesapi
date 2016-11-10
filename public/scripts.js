
function getAllPuppies() {
  return fetch('/api/puppies')
    .then(r => r.json());
}

function adoptPuppy(payload) {
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function likePuppy(id) {
  console.log(id)
  fetch(`/api/puppies/like/${id}`, {
    method: 'PUT'
  })
  .then(getAllPuppies().then(renderPuppies))
  .catch(error => console.log(error));
}

function abandonPuppy(id) {
  console.log(id);
  fetch(`/api/puppies/${id}`, {
    method: 'DELETE'
  })
  .then(getAllPuppies().then(renderPuppies))
  .catch(error => console.log(error));
}


function renderPuppies(puppies) {
  const $container = $('.adopted-puppies').empty();
  for (let i = 0; i < puppies.length; i += 1) {
    const $newPuppy = $('.puppy-template').clone();

    $newPuppy.removeClass('puppy-template')
      .addClass('puppy')
      .find('.name').text(puppies[i].name);

    $newPuppy
      .find('.likes').text(puppies[i].likes);

    $newPuppy
      .find('.abandon-puppy')
      .prop('id', puppies[i].id);

    $newPuppy
      .find('.puppy-picture img')
      .attr('src', puppies[i].url);

    // You should add an abandon button here
    $newPuppy
    .find('.abandon').on('click', (event) => {
      abandonPuppy(puppies[i].id);
    })

    // You should add a button for liking here
    $newPuppy
    .find('.like').on('click', (event) => {
      likePuppy(puppies[i].id);
    })

    $container.append($newPuppy);

    }

  }


function registerFormHandler() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const $form = $(this);
    const puppy = {
      name: $form.find('[name=name]').val(),
      url: $form.find('[name=url]').val()
    };

    adoptPuppy(puppy).then(() => {
      getAllPuppies().then(renderPuppies);
    });
  });
}


$(() => {
  registerFormHandler();
  getAllPuppies().then(renderPuppies);
});
