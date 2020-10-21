import React, { Component } from 'react';
import {Card} from 'react-bootstrap'

class DetailsContainer extends Component {
    state = {  }
    render() { 
        return (  
            <div className='movie-details'>
                 <img className='movie-img' src={'http://image.tmdb.org/t/p/w185//' + this.props.movie[0].poster_path}/>
                 <Card>
         <Card.Body>
             <Card.Title>{this.props.movie[0].title}</Card.Title>
           <Card.Text>
               {'Vote Average: ' + this.props.movie[0].vote_average}
               <br/>
               {'Release Date: ' + this.props.movie[0].release_date}
               <br/>
               <br/>
               {this.props.movie[0].overview}
     
           </Card.Text>
         </Card.Body>
         <Card.Footer>
             <small>{this.props.genrearray}</small>
         </Card.Footer>
       </Card>
             </div>
             );
    }
}
 
export default DetailsContainer;


