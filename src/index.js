/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

const movies = () =>
    getMovies().then((movies) => {
  $('#movies').html ("");
  let moviepost = "";
  movies.forEach(({title, rating, id}) => {
    moviepost +=`<div>${title} - Rating: ${rating}</div>`;
  });
  $(moviepost).appendTo('#movies')
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

movies();

let movieRating;
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
});

$('#submit').click(function (e) {
  e.preventDefault();
  const movieTitle = $('#movieName').val();
  // console.log(movieTitle);
  // console.log(movieRating);
  const userMovies = {
    title: movieTitle,
    rating: movieRating
  };
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userMovies)
  };
  fetch(url, options)
      .then(movies)
      .then(editMovies);
  $('#movieName').val('');
  $('#movieRating').val('');
});

const editMovies = () =>
    getMovies().then((movies) => {
      // console.log('Here are all the movies:');
      $('#editMovies').html ("");
      let movieEdit = "";
      movies.forEach(({title, rating, id}) => {
        movieEdit +=`<option>${title} - Rating: ${rating}</option>`;
      });
      $(movieEdit).appendTo('#editMovies')
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
editMovies();