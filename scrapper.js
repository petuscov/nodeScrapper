var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var req_url;
var dom;
var domPromise;

function performScrapping(){

    req_url = 'http://www.golem.es/golemv9/cine.php?idCine=9'

    // Promesa que resuelve al obtener DOM.
    domPromise = new Promise((resolve, reject)=>{
        request({uri: req_url}, function(error, response, body){
            if(!error && response.statusCode == 200){
                dom = new JSDOM(body);
                resolve();
            }
        });
    });

    return domPromise.then(()=>{
        var mainTable = dom.window.document.querySelector('.tabContenido');
        var moviesTitles = mainTable.querySelectorAll('a[class="txtNegXXL m5"]');
        var movieTables = mainTable.querySelectorAll('td[bgcolor="#ffffff"]');
        var dayMovies = [];

        moviesTitles.forEach((movieTitle, index)=>{
            var movie = {
                name: movieTitle.textContent.trim() // innerText NO
            };
            dayMovies.push(movie)
        });

        movieTables.forEach((movieTable, index)=>{
            var correspondantMovie = dayMovies[index]; // indexs deberían coincidir y los arrays recuperados deberían tener el mismo tamaño.
            var availableHours = movieTable.querySelectorAll('.CajaVentasSup');
            var movieHours = [];
            availableHours.forEach((divHour)=>{
                movieHours.push(divHour.textContent);
            });
            
            correspondantMovie.availableHours = movieHours;
        });

        // pendiente montar BD, y llevar a BD.
        console.log(dayMovies);
    });
}

module.exports = performScrapping;