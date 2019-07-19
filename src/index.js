/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $('#movies').html ("");
  let moviepost = ""
  movies.forEach(({title, rating, id}) => {
    moviepost +=`<div>id#${id} - ${title} - rating: ${rating}</div>`;
  });
  $(moviepost).appendTo('#movies')
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});




const movietitle= $('#movieName').val();
const movierating=$('#movieRating').val();
