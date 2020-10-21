import React, { Component } from 'react';
import {Card} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class Movie extends Component {
    state = {  }

    getGenre = (genreids) => {
        let genreArray = []

       
        genreids.map(id => {
            if ((genreArray.length < 5) && (id === 28)){genreArray.push("Action" + ' ')}
            if (id === 12){genreArray.push("Adventure" + ' ')}
            if (id === 16){genreArray.push("Animation"+ ' ')}
            if (id === 35){genreArray.push("Comedy"+ ' ') }
            if (id === 80){genreArray.push("Crime"+ ' ')}
            if ((genreArray.length < 5) && (id === 99)){genreArray.push("Documentary"+ ' ')}
            if ((genreArray.length < 5) && (id === 18)){genreArray.push("Drama"+ ' ') }
            if ((genreArray.length < 5) && (id === 10751)){genreArray.push("Family"+ ' ')} 
            if ((genreArray.length < 5) && (id === 14)){genreArray.push("Fantasy"+ ' ') }
            if ((genreArray.length < 5) && (id === 36)){genreArray.push("History"+ ' ') }
            if ((genreArray.length < 5) && (id === 27)){genreArray.push("Horror"+ ' ') }
            if (id === 10402){genreArray.push("Music"+ ' ')} 
            if (id === 9648){genreArray.push("Mystery"+ ' ')} 
            if (id === 10749){genreArray.push("Romance"+ ' ')} 
            if (id === 878){genreArray.push("Science Fiction"+ ' ')}
            if ((genreArray.length < 5) && (id === 10770)){genreArray.push("TV Movie"+ ' ') }
            if (id === 53){genreArray.push("Thriller"+ ' ') }
            if (id === 10752){genreArray.push("War"+ ' ') }
            if (id === 37){genreArray.push("Western"+ ' ')}
            
        })

        return genreArray
       
    }

    clickHandler = () => {
        this.props.history.push('/movie/' + this.props.movie.id)
    }
    
    render() { 
        return (  
        <div>
            <img onClick={this.clickHandler} className='movie-img' src={'http://image.tmdb.org/t/p/w185//' + this.props.movie.poster_path}/>
            <Card className='movie-card'>
    <Card.Body>
        <Card.Title>{this.props.movie.title}</Card.Title>
      <Card.Text>
          {'Vote Average: ' + this.props.movie.vote_average}
          <br/>
          {'Release Date: ' + this.props.movie.release_date}

      </Card.Text>
    </Card.Body>
    <Card.Footer>
        <small>{this.getGenre(this.props.movie.genre_ids)}</small>
    </Card.Footer>
  </Card>
        </div>

        );
    }
}
 
export default withRouter(Movie);