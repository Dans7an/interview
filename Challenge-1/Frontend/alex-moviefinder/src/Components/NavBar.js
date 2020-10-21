import React, { Component } from 'react';
import {Navbar as BootstrapNav, Form, FormControl,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'

class NavBar extends Component {
    state = {  

    }
    render() { 
        return (  
        
            <BootstrapNav fixed='top' bg="dark" variant="dark">
                <BootstrapNav.Brand href="/">BlockBuster 2.0</BootstrapNav.Brand>
                {/* <Nav className="mr-auto"> */}
                <div className='navbar-nav ml-auto'>
                  <Link className='nav-item nav-link mx-3' to="/signup">SignUp</Link>
                  <Link className='nav-item nav-link mx-3' to="/login">Login</Link>
                </div>
                {/* </Nav> */}
                <Form inline>
                    <FormControl onChange={(e) => this.props.movieSearch(e)} type="text" placeholder="Search Movies" className="mr-sm-2" />
                    
                </Form>
            </BootstrapNav>
      );
    }
}
 
export default NavBar;





