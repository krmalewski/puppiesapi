const db = require('../lib/dbConnect');


function getAllPuppies(req, res, next) {

  db.any('SELECT * from puppies;')
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  db.none(`
    INSERT INTO puppies (name, url)
    VALUES ($1, $2);
    `, [req.body.name, req.body.url])
  .then((puppy) => {
    console.log(puppy);
    res.puppy = puppy;
    next();
  })
  .catch(error => next(error));
}

function abandonPuppy(req, res, next) {
  console.log(req.params.id);
  db.none(`
    DELETE FROM puppies
    WHERE id = $1;
    `, [req.params.id])
  .then(next())
  .catch(error => next(error));
}

function likePuppy(req, res, next) {
  console.log(req.params.id);
  db.none(`
    UPDATE puppies
    SET likes = likes + 1
    WHERE id = $1;
    `, [req.params.id])
  .then(next())
  .catch(error => next(error));
}

module.exports = {
  getAllPuppies,
  adoptPuppy,
  abandonPuppy,
  likePuppy
};
