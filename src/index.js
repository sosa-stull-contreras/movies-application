/**
 * es6 modules and imports
 */
/**
 * require style imports
 */
const {getMovies, addMovie, editStars, editTitleStars, editTitle, deleteMovie} = require('./api.js');
const $ = require('jquery');

let editMovie;
let movieRating;
let editRating;
let deleteMovieData;
let poster;

//Capitalize Letter
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const testing = (title) => {
    return fetch(`http://www.omdbapi.com/?s=${title}&apikey=41424bce`)
        .then(response => response.json())
        .then(data => {
            poster = data.Search[0].Poster;
            console.log(poster)
        })
};

//Function populates movie list
const movies = () =>
    getMovies().then((movies) => {
  $('#movies').html ("");
// function that sorts the array alphabetically
            const sortArray =
            movies.sort(function (a, b) {
                if (a.title < b.title){
                    return -1}
                else if (a.title > b.title){
                    return 1;}
                else{
                    return 0;}
            });
        let moviePost = "";
  moviePost += '<h1>Browse Movies!</h1>';
  sortArray.forEach(({title, rating, id}) => {
      testing(title);
      moviePost +=`<div><img src=" ">${title} - Rating: ${rating}</div>`;
  });
  $(moviePost).appendTo('#movies')
}).catch((error) => {
  console.log(error);
});
movies();


//Function gets value from star ratings
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
  $("#submit").removeAttr("disabled");
});


//Function gets value for edit star ratings
$("select#editRating").change(function(){
  editRating = $(this).children("option:selected").val();
});


//Posts data to the json, updates movies
$('#submit').click(function (e) {
  e.preventDefault();
  let movieTitle = $('#movieName').val();
  capitalizeFirstLetter(movieTitle);
  if(movieTitle !=='' && movieRating !== 'How many stars do you give this movie?') {
    addMovie(movieTitle, movieRating)
        .then(movies)
        .then(editMovies)
        .then(deleteMovies);
      $('#movieName').val('');
      $('#movieRating').val('How many stars do you give this movie?');
  }
});


//Edit the star rating for movies
const editMovies = () =>
    getMovies().then((movies) => {
        const sortArray =
            movies.sort(function (a, b) {
                if (a.title < b.title){
                    return -1}
                else if (a.title > b.title){
                    return 1;}
                else{
                    return 0;}
            });

      // console.log('Here are all the movies:');
      $('#editMovies').html ("");
      let movieEdit = "<option>pick a movie</option>";
      sortArray.forEach(({title, rating, id}) => {
        movieEdit +=`<option class="pickMovie" value="${title}">${title}</option>`;
      });
      $(movieEdit).appendTo('#editMovies').then($("#editSubmit,#movieDetailSelect").removeAttr("disabled"))
    })
        //gets value for movies option tag
        .then($("select#editMovies").change(function(){
          editMovie = $(this).children("option:selected").val();
        }))
        .catch((error) => {
      console.log(error);
    });
editMovies();


//Updates json with new star rating
$('#editSubmit').click(function (e) {
    e.preventDefault();
    $('#movieDetails').html("");
    const movieTitleEdit = $('#movieNameEdit').val();

    if (movieTitleEdit==='') {
        getMovies().then((moviesdata) => {

            moviesdata.forEach(({title, rating, id}) => {
                if (editMovie === title) {
                    editStars(title, editRating, id)
                        .then(movies)
                        .then(editMovies)
                        .then(deleteMovies);
                }
            });
        });
    }

    if (movieTitleEdit !=='' && editRating !=="How many stars do you give this movie?"){
        getMovies().then((moviesdata) => {

            moviesdata.forEach(({title, rating, id}) => {
                if (editMovie === title) {
                    editTitleStars(movieTitleEdit, editRating, id)
                        .then(movies)
                        .then(editMovies)
                        .then(deleteMovies);
                }
            });
        });
    }
    if (movieTitleEdit !=='' && editRating==="How many stars do you give this movie?"){
        getMovies().then((moviesdata) => {

            moviesdata.forEach(({title, rating, id}) => {
                if (editMovie === title) {
                    editTitle(movieTitleEdit, rating, id)
                        .then(movies)
                        .then(editMovies)
                        .then(deleteMovies);
                }
            });
        });
    }
    $('#movieNameEdit').val('');
    $('#editRating').val('How many stars do you give this movie?');
});

//Lets you delete a movie
const deleteMovies = () =>
    getMovies().then((movies) => {

        const sortArray =
            movies.sort(function (a, b) {
                if (a.title < b.title){
                    return -1}
                else if (a.title > b.title){
                    return 1;}
                else{
                    return 0;}
            });

        $('#deleteMovies').html ("");
        let movieDelete = "<option>pick a movie to delete</option>";
        sortArray.forEach(({title, rating, id}) => {
            movieDelete +=`<option value="${title}">${title}</option>`;
        });
        $(movieDelete).appendTo('#deleteMovies').then($("#deleteSubmit").removeAttr("disabled"))
    })
    //gets value for movies option tag
        .then($("select#deleteMovies").change(function(){
            deleteMovieData = $(this).children("option:selected").val();
        }))
        .catch((error) => {
            console.log(error);
        });
deleteMovies();


//Deletes a movie on submit
$('#deleteSubmit').click(function (e) {
    $('#movieDetails').html("");

    e.preventDefault();
    getMovies().then((moviesdata) => {
        moviesdata.forEach(({title, rating, id}) => {
            if(deleteMovieData===title){
                deleteMovie(title, rating, id)
                    .then(movies)
                    .then(editMovies)
                    .then(deleteMovies);
            }
        });
    });
});


// Loads Details of Movie Selected

 $('#movieDetailSelect').click(function (e) {
     e.preventDefault();
     const selectMovieEdit = $('#editMovies').val();
     getMovies().then((movies) => {
         $('#movieDetails').html(" ");
         let moviedetails = " ";
         movies.forEach(({title, rating, id}) => {
             if (selectMovieEdit === title) {
                 moviedetails += `<div> <h3>${title}</h3> <br> <h3> Rating:</h3> ${rating}</div>`;
             }
         });
         $(moviedetails).appendTo('#movieDetails')
     }).catch((error) => {
         console.log(error);
     })
 });
