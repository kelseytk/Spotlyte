import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


class NavBar extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render (){
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Spotlyte</Navbar.Brand>
    
            </Navbar>
            
        )
    };
}

export default NavBar;
