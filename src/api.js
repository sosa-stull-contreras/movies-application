module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
  },

  addMovie: (movieTitle, movieRating) => {
    let poster;
    return fetch(`http://www.omdbapi.com/?s=${movieTitle}&r=json&apikey=41424bce`)
          .then(response => response.json())
          .then(data => {
            poster = data.Search[0].Poster;
            let userMovie = {
              title: movieTitle,
              rating: movieRating,
              poster: poster
            };
            const url = '/api/movies';
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userMovie)
            };
            fetch(url, options)
          });
  },

  editStars: (title, editRating, id) => {
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
    return fetch(url, options)
  },

  editTitleStars: (movieTitleEdit, editRating, id) => {
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
    return fetch(url, options)
  },

  editTitle: (movieTitleEdit, rating, id) => {
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
    return fetch(url, options)
  },

  deleteMovie: (title, rating, id) => {
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
    return fetch(url, options)
  }
};

