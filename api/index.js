const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const getDiets = require('./src/controllers/controllerDiets.js')


conn.sync({ alter: false }).then(() => { // alter: no se borran mi datos ni se pisan
  server.listen(3001, () => {
    console.log('%s listening on port 3001');
  })})
  .then(() => {
    getDiets()  // xq al comienzo tenia q cargar mi BDD con dietas
  }).catch((err) => {
    alert(err);
  })