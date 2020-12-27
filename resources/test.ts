var pgp = require('pg-promise')(/* options */);
var db = pgp('postgres://nat:admin@localhost:5432/bork');

db.one('SELECT $1 AS value', 123)
    .then(function (data) {
        console.log('DATA:', data.value)
    })