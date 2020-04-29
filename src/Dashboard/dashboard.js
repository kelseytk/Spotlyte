import React, {Component, useCallback} from 'react'; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"

var fs = require('fs'); 

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            trackList:[], 
            currentSorting:undefined,
            decreasingSorting:true,
            formValue:undefined,
        }
    }

    componentDidMount(){
        console.log("component did mount")
        this.updateTracklist()
    }

    updateTracklist(){
        console.log("updating track list")
        var trackList = [ //call data extractor 
            {
                name: 'song 1',
                artist : 'artsit1',
                playCount : 5,
            },
            {
                name: 'song 2',
                artist : 'artsit1',
                playCount : 3,
            },
            {
                name: 'song 3',
                artist : 'artsit1',
                playCount : 8,
            },
            {
                name: 'song 1',
                artist : 'artsit2',
                playCount : 12,
            },
            {
                name: 'song 2',
                artist : 'artsit2',
                playCount : 7,
            },
            {
                name: 'song 3',
                artist : 'artsit2',
                playCount : 3,
            },
        ]
        this.setState({
            trackList:trackList
        })
    }

    changeSortingType(sortingType){
        if(this.state.currentSorting === sortingType){
            var newDirection= !this.state.decreasingSorting
            this.setState({decreasingSorting:newDirection}, ()=>{
                this.sortTrackList()
            })
        }
        else{
            var newDirection= false
            if(sortingType==="playCount") newDirection=true

            this.setState({currentSorting:sortingType, decreasingSorting:newDirection}, ()=>{
                this.sortTrackList()
            })
        }
    }
    sortTrackList(sortingType){

      

        var sortedList=this.state.trackList
        if(this.state.decreasingSorting){
            sortedList.sort((a, b)=> (a[this.state.currentSorting]<b[this.state.currentSorting])?1:-1)
        }
        else{
            sortedList.sort((a, b)=> (a[this.state.currentSorting]>b[this.state.currentSorting])?1:-1)
        }
        this.setState({trackList:sortedList}) 
       
    }

    generateTableEntry(trackObject){
        return(
            <tr>
                <td>{trackObject.name}</td>
                <td>{trackObject.artist}</td>
                <td>{trackObject.playCount}</td>
            </tr>
        )
    }

    buttonPress(){
        console.log("buttonIsPressed")
        //perform request here
        //user token here, should change to auth token but how get???
        this.props.doAPostRequest({usertoken:this.props.token, value:this.state.formValue}, "/api/xjava", (resdata)=>{
            console.log("recieved in dashboard")
            console.log(resdata)

        })
    }

    changeFormValue(value){
        console.log("changing form value", value)
        this.setState({
            formValue:value
        })
    }
    
    readFile(){
        this.props.doAPostRequest({}, "/api/readFile", (resdata)=>{
            console.log("recieved in dashboard")
            console.log(resdata)
        })
          
        console.log('readFile called');
    }

    render (){
        
        return(
            <div>
                Hello, please insert Spotify playlist
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label> for example: https://open.spotify.com/playlist/xyz </Form.Label>
                        <Form.Control
                            onChange={(event)=>{
                                this.changeFormValue(event.target.value)
                    
                            }}
                            as="textarea" rows="3" />
                    </Form.Group>
                </Form>
                <Button variant="Graph" onClick={()=>this.buttonPress()}>Submit</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={()=>this.changeSortingType("name")}>Track Name</th>
                            <th onClick={()=>this.changeSortingType("artist")}>Artist</th>
                            <th onClick={()=>this.changeSortingType("playCount")}>Play Count </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.trackList.map(entry => (
                            this.generateTableEntry(entry)
                            ))}
                    </tbody>
                </Table>
            </div>
        )
    };
}

export default Dashboard;
