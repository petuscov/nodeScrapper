
var CronJob = require('cron').CronJob;
var scrapper = require('./scrapper.js');
//var express = require('express');
// var app = express();
// var port = 80;


new CronJob('15 * * * * *', function() { // se ejecuta el segundo 15 de cada minuto.
  scrapper(); // devuelve promesa.

}, null, true, 'America/Los_Angeles');







/**
 * PENDIENTE API, y separar API de cronjob (en dos archivos).
 */

// app.use(express.urlencoded());

// app.get('/',function(req,res){
//     res.sendFile(__dirname + '/public/mainPage.html');   
// });

// app.post('/movie', function(request, response){
//   // 1. acceso a BD.
//   var movieData = '';

//   // 2. respuesta:
//   response.json({response: movieData});
// });


// //require('http').Server(app);
// app.listen(port, ()=>{
//   console.log('listening on '+ port);
// });