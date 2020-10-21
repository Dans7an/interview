module.exports = {
  Query: {
    getMovieDetails: (
      _,
      { id },
      { dataSources: { theMovieDBAPI } }
    ) => theMovieDBAPI.getMovieDetails(id),
    
    getPopularMovies: (
      _,
      { id },
      { dataSources: { theMovieDBAPI } }
    ) => theMovieDBAPI.getPopularMovies()
  }
}