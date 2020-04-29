import React, { Component, useCallback } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"


var fs = require('fs');

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trackList: [],
            currentSorting: undefined,
            decreasingSorting: true,
            formValue: undefined,
        }
    }

    componentDidMount() {
        console.log("component did mount")
        // this.updateTracklist()
    }

    updateTracklist() {
        console.log("updating track list")
    }

    changeSortingType(sortingType) {
        if (this.state.currentSorting === sortingType) {
            var newDirection = !this.state.decreasingSorting
            this.setState({ decreasingSorting: newDirection }, () => {
                this.sortTrackList()
            })
        }
        else {
            var newDirection = false
            if (sortingType === "playCount") newDirection = true

            this.setState({ currentSorting: sortingType, decreasingSorting: newDirection }, () => {
                this.sortTrackList()
            })
        }
    }
    sortTrackList(sortingType) {
        var sortedList = this.state.trackList
        if (this.state.decreasingSorting) {
            sortedList.sort((a, b) => (a[this.state.currentSorting] < b[this.state.currentSorting]) ? 1 : -1)
        }
        else {
            sortedList.sort((a, b) => (a[this.state.currentSorting] > b[this.state.currentSorting]) ? 1 : -1)
        }
        this.setState({ trackList: sortedList })

    }

    generateTableEntry(trackObject) {
        return (
            <tr>
                <td>{trackObject.songName}</td>
                <td>{trackObject.artistName}</td>
                <td>{trackObject.albumName}</td>
                <td>{trackObject.playcount}</td>
            </tr>
        )
    }

    submitPlaylistData() {
        console.log("submit playlist data button pressed")

        this.props.doAPostRequest({ usertoken: this.props.token, value: this.state.formValue }, "/api/xjava", (resdata) => {
            console.log("recieved in dashboard")
            console.log(resdata)

            this.setState({
                trackListLoading: true
            }, () => {
                setTimeout(() => {
                    this.readFile()
                }, 20000);
            })
        })
    }

    changeFormValue(value) {
        console.log("changing form value", value)
        this.setState({
            formValue: value
        })
    }

    readFile() {
        this.props.doAPostRequest({}, "/api/readFile", (resdata) => {
            console.log("recieved in dashboard")
            console.log(resdata)
            var json = (resdata + "]").trim()
            json = json.replace(',},]', "}]")
            var check = json.includes(',},{')

            while (check) {
                json = json.replace(',},{', '},{')
                var check = json.includes(',},{')

            }
            console.log(json)
            var parseData = JSON.parse(json)
            console.log(parseData)
            parseData.forEach(element => {
                element.playcount= parseInt(element.playcount)
            });
            console.log(parseData.length)
            this.setState({
                trackList: parseData
            })
        })

        console.log('readFile called');
    }

    render() {

        return (
            <div>
                Hello, please insert Spotify playlist

                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="https://open.spotify.com/playlist/playlist_id"
                        aria-describedby="basic-addon2"
                        onChange={(event) => { this.changeFormValue(event.target.value) }}
                    />
                    <InputGroup.Append>
                        <Button onClick={() => this.submitPlaylistData()} variant="outline-secondary">Button</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* 
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label> for example: https://open.spotify.com/playlist/xyz </Form.Label>
                        <Form.Control
                            
                            as="textarea" rows="3" />
                    </Form.Group>
                </Form>
                <Button variant="Graph" onClick={()=>this.buttonPress()}>Submit</Button> */}
                {/* <Button variant="Graph" onClick={()=>this.readFile()}>Display Playlist</Button> */}


                {this.state.trackList.length == 0 ?
                    <Card>
                        {this.state.trackListLoading == undefined
                            ?
                            <Card.Body>
                                <Card.Title>No playlist had been entered.</Card.Title>
                                <Card.Text>
                                    Please enter a playlist URL in the Input Box Above.
                                    </Card.Text>
                            </Card.Body>
                            :
                            <Card.Body>
                                <Card.Title>Playlist Data is being loaded.</Card.Title>
                                <Card.Text>
                                    We are fetching your data, please wait :)
                                    </Card.Text>
                            </Card.Body>
                        }
                    </Card>

                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => this.changeSortingType("songName")}>Track Name</th>
                                <th onClick={() => this.changeSortingType("songArtist")}>Artist</th>
                                <th onClick={() => this.changeSortingType("albumName")}>Album</th>
                                <th onClick={() => this.changeSortingType("playcount")}>Play Count </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.trackList.map(entry => (
                                this.generateTableEntry(entry)
                            ))}
                        </tbody>
                    </Table>
                }
            </div>
        )
    };
}

export default Dashboard;
