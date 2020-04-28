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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">n
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Orderd by" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Playcount</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Alphabetical</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Date added</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success"></Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            
        )
    };
}

export default NavBar;
