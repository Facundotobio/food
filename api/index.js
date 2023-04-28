const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const getDiets = require('./src/controllers/controllerDiets.js')


conn.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening on port 3001');
  })})
  .then(() => {
    getDiets()
  }).catch((err) => {
    console.log(err);
  })