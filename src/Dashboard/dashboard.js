import React, {Component, useCallback} from 'react'; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    buttonPress(){
        console.log("buttonIsPressed")
        //perform request here
        this.props.doAPostRequest({artistId:"abc"}, "/api/getAlbums", (resdata)=>{
            console.log("recieved in dashboard")
            console.log(resdata)

        })

        

    }
    
    render (){
        return(
            <div>
                Hello, please insert Spotify playlist
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label> for example: https://open.spotify.com/playlist/xyz </Form.Label>
                        <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                </Form>
                <Button variant="Graph" onClick={()=>this.buttonPress()}>Primary</Button>
            </div>
        )
    };
}

export default Dashboard;
