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


        let moviepost = "";
  moviepost += '<h2>Here are the movies!</h2>';
  sortArray.forEach(({title, rating, id}) => {
    moviepost +=`<div>${title} - Rating: ${rating}</div>`;
      console.log(moviepost)

  });
  $(moviepost).appendTo('#movies')
}).catch((error) => {
  console.log(error);
});
movies();



//Function gets value from star ratings
$("select#movieRating").change(function(){
  movieRating = $(this).children("option:selected").val();
  movieRating.then($("#submit").removeAttr("disabled"));
});



//Function gets value for edit star ratings
$("select#editRating").change(function(){
  editRating = $(this).children("option:selected").val();
});

console.log(editRating)

//Posts data to the json, updates movies
$('#submit').click(function (e) {
  e.preventDefault();
  const movieTitle = $('#movieName').val();
  if(movieTitle!=='' && movieRating !== 'How many stars do you give this movie?') {
      let userMovies = {
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
          console.log(editMovie)
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
            console.log(moviesdata)

            moviesdata.forEach(({title, rating, id}) => {
                if (editMovie === title) {
                    // console.log('i found a match')
                    const userMovies = {
                        title: title,
                        rating: editRating
                    };
                    const url = '/api/movies/' + id;
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
    }

    if (movieTitleEdit!=='' && editRating!=="How many stars do you give this movie?"){

        getMovies().then((moviesdata) => {
            console.log(moviesdata)

            moviesdata.forEach(({title, rating, id}) => {
                if (editMovie === title) {
                    // console.log('i found a match')
                    const userMovies = {
                        title: movieTitleEdit,
                        rating: editRating
                    };
                    const url = '/api/movies/' + id;
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
    }
    if (movieTitleEdit!=='' && editRating==="How many stars do you give this movie?"){

        getMovies().then((moviesdata) => {
            console.log(moviesdata)

            moviesdata.forEach(({title, rating, id}) => {
                if (editMovie === title) {
                    // console.log('i found a match')
                    const userMovies = {
                        title: movieTitleEdit,
                        rating: rating
                    };
                    const url = '/api/movies/' + id;
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
    }
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
            console.log(deleteMovieData)
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



// Loads Details of Movie Selected

 $('#movieDetailSelect').click(function (e) {
     e.preventDefault();
     const selectMovieEdit = $('#editMovies').val();
     getMovies().then((movies) => {
         $('#movieDetails').html(" ");
         let moviedetails = " ";
         movies.forEach(({title, rating, id}) => {
             if (selectMovieEdit === title) {
                 moviedetails += `<div>${title} Rating: ${rating}</div>`;
             }
             console.log(moviedetails)
         });
         $(moviedetails).appendTo('#movieDetails')
     }).catch((error) => {
         console.log(error);
     })
 });

