import React, { Component } from 'react';
import './App.css';
import MarketerForm from './MarketerForm'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marketer: {
                firstName: '',
                lastName: '',
                email: '',
                website: '',
                linkedin: '',
            },
            marketerCount: 0,
            completed: false,
            error: { email: false }
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    //fetch the current total count from the server
    componentDidMount() {
        var self = this;
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function(e) {
            self.setState({ marketerCount: JSON.parse(e.target.response).count });
        });
        oReq.open("GET", "/marketers/count");
        oReq.send();
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newMarketer = Object.assign(this.state.marketer, {
            [name]: value
        })

        //if the user changes the e-mail address then remove the error
        var emailError = this.state.error.email;
        if (name === "email") {
            emailError = false;
        }

        this.setState({
            marketer: newMarketer,
            error: {
                email: emailError
            }
        });
    }

    submitForm() {
        var self = this;
        let oReq = new XMLHttpRequest();
        oReq.open("POST", "/marketers");
        oReq.setRequestHeader('Content-Type', 'application/json');
        oReq.addEventListener("load", function(e) {
            if (e.target.status === 200) {
                self.setState({
                    marketerCount: JSON.parse(e.target.response).count,
                    completed: true
                });
            } else {
                self.setState({
                    error: {
                        email: e.target.response
                    }
                });
            }
        });
        oReq.send(JSON.stringify(this.state.marketer));
    }


    renderView() {
        if (!this.state.completed) {
            return (
                <div>
                    <h1 className="title">Join Perfpie as a Marketer</h1> 
                    <MarketerForm submitForm = {this.submitForm} 
                        handleUserInput = {this.handleUserInput}
                        marketer = {this.state.marketer}
                        error = {this.state.error} 
                        marketerCount = {this.state.marketerCount} />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Thank you!</h1>
                    <h2>You are the {this.state.marketerCount.nth()} marketer to have joined us!</h2> 
                </div>
            )
        }
    }

    render() {
        return (
            <div className="App">
                {this.renderView()}
            </div>
        );


    }
}

export default App;