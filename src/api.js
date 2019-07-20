module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
        // .then((movies) => {
        //   const movieData = movies.filter((movie) =>  {
        //     console.log(movie)
        //   })
        // })
  }
};
