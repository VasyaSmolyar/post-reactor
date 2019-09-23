import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            confirm: ''
        };
    }

    login() {

    }

    password() {

    }

    confirm() {

    }

    send() {

    }

    render() {
        return (
            <div id="modal">
                <div>
                    <button onClick={this.props.cancel}>Cancel</button>
                    <input onChange={this.login}></input>
                    <input onChange={this.password}></input>
                    {(() => {if(this.props.register) {
                        return <input onChange={this.confirm}></input>;
                    }})()}
                    <button onClick={this.send}>{this.props.name}</button>
                </div>
            </div>
        );
    }
}

export default Login;