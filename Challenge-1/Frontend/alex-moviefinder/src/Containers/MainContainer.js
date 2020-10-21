import React, {Component} from 'react';
import NavBar from '../Components/NavBar'
import {Route, Switch} from 'react-router-dom'
import MovieContainer from '../Containers/MovieContainer'
import HomeContainer from '../Containers/HomeContainer'
import DetailsContainer from '../Containers/DetailsContainer'

class MainContainer extends Component {
    render(){
  return (  
        <div>
            <NavBar movieSearch = {this.props.movieSearch}/>
            <Switch>
                
            <Route
                
                exact path="/"
                render={()=>
                    <HomeContainer/>
                }
            /> 
                
                
                <Route
                
                    exact path="/home"
                    render={()=>
                        <MovieContainer 
                        movies = {this.props.movies}
                        search = {this.props.search}
                        
                        
                        />
                    }
                /> 

                <Route
                
                    exact path="/movie/:id"
                    render={()=>
                        <DetailsContainer
                        movies = {this.props.movies}
                        />
                        
                    }
                /> 
                
                <Route
                    exact path="/signup"
                    render={()=>
                        <h1>signup</h1>
                    }
                    
                /> 
            
                <Route
                    exact path="/login"
                    render={()=>
                        <h1>login</h1>
                    }
                />

                <Route
                    exact path="/details"
                    render={()=>
                        <h1>details</h1>
                    }
                />


            </Switch>
        </div>
    );
}
}
 
export default MainContainer;


