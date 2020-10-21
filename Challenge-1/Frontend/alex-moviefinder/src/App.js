import React, {Component} from 'react';
import './App.css';
import MainContainer from './Containers/MainContainer'

class App extends Component {
  state = {
    movies: '',
    search: '',
    searchedMovies: ''
  }

  componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=c73ff9db1c1c1d2942d1ad8f49bfba66&language=en-US&page=1')
    .then(res => res.json())
    .then(data => this.setState({movies: data}))
  
  }



  movieSearch = (event) => {
     
      this.setState({search: event.target.value})
      

      


      
      
    }

  render(){
    if (this.state.movies === undefined){
      return <div></div>
    }

  return (
    <div className="App">
     <MainContainer
        movies={this.state.movies}
        movieSearch={this.movieSearch}
        search={this.state.search}
     />
    </div>
  );
}
}

export default App;
