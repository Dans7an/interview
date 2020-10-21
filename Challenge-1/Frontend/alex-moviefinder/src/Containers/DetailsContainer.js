import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import MovieDetails from '../Components/MovieDetails'

class DetailsContainer extends Component {
    state = {  }
    
    getGenre = (genreids) => {
        let genreArray = []
        genreids.map(id => {
            if (id === 28){genreArray.push("Action" + ' ')}
            if (id === 12){genreArray.push("Adventure" + ' ')}
            if (id === 16){genreArray.push("Animation"+ ' ')}
            if (id === 35){genreArray.push("Comedy"+ ' ') }
            if (id === 80){genreArray.push("Crime"+ ' ')}
            if (id === 99){genreArray.push("Documentary"+ ' ')}
            if (id === 18){genreArray.push("Drama"+ ' ') }
            if (id === 10751){genreArray.push("Family"+ ' ')} 
            if (id === 14){genreArray.push("Fantasy"+ ' ') }
            if (id === 36){genreArray.push("History"+ ' ') }
            if (id === 27){genreArray.push("Horror"+ ' ') }
            if (id === 10402){genreArray.push("Music"+ ' ')} 
            if (id === 9648){genreArray.push("Mystery"+ ' ')} 
            if (id === 10749){genreArray.push("Romance"+ ' ')} 
            if (id === 878){genreArray.push("Science Fiction"+ ' ')}
            if (id === 10770){genreArray.push("TV Movie"+ ' ') }
            if (id === 53){genreArray.push("Thriller"+ ' ') }
            if (id === 10752){genreArray.push("War"+ ' ') }
            if (id === 37){genreArray.push("Western"+ ' ')}
            
        })

        return genreArray
    }
    
    
    render() { 
        
        let currentMovie = this.props.movies.results.filter(movie => movie.id === parseInt(this.props.match.params.id))
        return (  
            <div className='detail-container'>
                <MovieDetails                    
                    key={currentMovie.id}
                    movie={currentMovie}
                    genrearray={this.getGenre(currentMovie[0].genre_ids)}
                />
            </div>
                );
    }
}
 
export default withRouter(DetailsContainer);





