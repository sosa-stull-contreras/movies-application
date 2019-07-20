/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

let editMovie;
let movieRating;
let editRating;
let deleteMovieData;

console.log(getMovies());

//Function populates movie list
const movies = () =>
    getMovies().then((movies) => {
  $('#movies').html ("");
  let moviepost = "";
  movies.forEach(({title, rating, id}) => {
    moviepost +=`<div>${title} - Rating: ${rating}</div>`;
  });
  $(moviepost).appendTo('#movies')
}).catch((error) => {
  console.log(error);
});
movies();



//Function gets value from star ratings
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
});



//Function gets value for edit star ratings
$("select#editRating").change(function(){
  editRating = $(this).children("option:selected").val();
  console.log(editRating)
});



//Posts data to the json, updates movies
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
      .then(editMovies)
      .then(deleteMovies);
    $('#movieName').val('');
  $('#movieRating').val('');
});



//Edit the star rating for movies
const editMovies = () =>
    getMovies().then((movies) => {
      // console.log('Here are all the movies:');
      $('#editMovies').html ("");
      let movieEdit = "<option>pick a movie</option>";
      movies.forEach(({title, rating, id}) => {
        movieEdit +=`<option value="${title}">${title}</option>`;
      });
      $(movieEdit).appendTo('#editMovies')
    })
        //gets value for movies option tag
        .then($("select#editMovies").change(function(){
          editMovie = $(this).children("option:selected").val();
          console.log(editMovie)
        }))
        .catch((error) => {
      console.log(error);
    });
editMovies();



//Updates json with new star rating
$('#editSubmit').click(function (e) {
    e.preventDefault();
getMovies().then((moviesdata) => {
    moviesdata.forEach(({title, rating, id}) => {
        if(editMovie===title){
            // console.log('i found a match')


            const userMovies = {
                 title: editMovie,
                 rating: editRating
               };
               const url = '/api/movies/'+id;
               const options = {
                 method: 'PATCH',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(userMovies)
               };
               fetch(url, options)
                   .then(movies)
                   .then(editMovies)
                   .then(deleteMovies);



        }
    });
});
});

const deleteMovies = () =>
    getMovies().then((movies) => {
        // console.log('Here are all the movies:');
        $('#deleteMovies').html ("");
        let movieDelete = "<option>pick a movie to delete</option>";
        movies.forEach(({title, rating, id}) => {
            movieDelete +=`<option value="${title}">${title}</option>`;
        });
        $(movieDelete).appendTo('#deleteMovies')
    })
    //gets value for movies option tag
        .then($("select#deleteMovies").change(function(){
            deleteMovieData = $(this).children("option:selected").val();
            console.log(deleteMovieData)
        }))
        .catch((error) => {
            console.log(error);
        });
deleteMovies();



$('#deleteSubmit').click(function (e) {
    e.preventDefault();
    getMovies().then((moviesdata) => {
        moviesdata.forEach(({title, rating, id}) => {
            if(deleteMovieData===title){
                // console.log('i found a match')


                const userMovies = {
                    title: title,
                    rating: rating
                };
                const url = '/api/movies/'+id;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userMovies)
                };
                fetch(url, options)
                    .then(movies)
                    .then(editMovies)
                    .then(deleteMovies);
            }
        });
    });
});