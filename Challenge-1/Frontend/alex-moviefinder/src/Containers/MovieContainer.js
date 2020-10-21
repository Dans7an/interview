import React from 'react';
import Movie from '../Components/Movie'


const MovieContainer = (props) => { 
    
    let filtered = props.search != '' ? props.movies.results.filter(movie => movie.title.toLowerCase().includes(props.search)) : props.movies.results
    
    return (   
        
        <div className='movie-container'>
        
        {

        filtered.map(movie => 
            <Movie                     
                key={movie.id}
                movie={movie}
            />
        )}
        
        </div>
        
        
        );
    
}
 
export default MovieContainer;