import React, {Component} from 'react';
import './App.css';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Dashboard from "./Dashboard/dashboard"
import Navbar from './Navbar/navbar';




class App extends Component {

  doAPostRequest(body, endpoint, callback){
    console.log("doing a post request to "+endpoint)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    console.log(requestOptions)
    fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (!res.success){
          console.log('some error')
      }else{
          console.log('success')

          callback(res.data)
      }
    });
  }

  render(){
    return (
      <div className="App">
        <Navbar>
          
        </Navbar>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <Dashboard
                doAPostRequest={(body, endpoint, callback)=>{this.doAPostRequest(body, endpoint, callback)}}
              
              />
            </Col>
            <Col></Col>
          </Row>
         </Container>
      </div>
    )
  }
}

export default App;
