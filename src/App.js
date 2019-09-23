import React from 'react';
import Login from './Login.js' 
import logo from './logo.svg';
import './App.css';

function Header(props) {
    return <div><img src={props.logo} /><span>Post Reactor</span></div>
}

function Profile(props) {
    if (props.isLogged)
        return <h1>User profile</h1>
    else
        return (<div>
                    <h1>Login or register</h1>
                    <button onClick={props.login}>Login</button>
                    <button onClick={props.register}>Register</button>
                </div>);
}

function Menu(props) {
    return (
        <div>
            <button data-target='main' onClick={props.clickHandler}>All posts</button>
            <button data-target='create' onClick={props.clickHandler}>Create post</button>
            <button data-target='profile' onClick={props.clickHandler}>Profile</button>
        </div>
    );
}

function Main(props) {
    return <h1>All posts</h1>
}

function Create(props) {
    return <h1>Create a post</h1>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged : false,
            view: 'profile',
            modal: null
        };
        this.changeView = this.changeView.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    changeView(event) {
        this.setState({
            view: event.target.dataset.target
        });
    }
    register() {
        this.setState({
            modal : 'register'
        });
        console.log(1);
    }
    login() {
        this.setState({
            modal : 'login'
        });
    }
    cancel() {
        this.setState({
            modal : null
        });
    }
    render() {
        return (
            <div>
                <Header />
                {(() => {
                    switch(this.state.view) {
                        case 'main':
                            return <Main />;
                        case 'create':
                            return <Create />;
                        case 'profile':
                            return <Profile isLogged={this.state.isLogged} register={this.register} login={this.login}/>; 
                    }
                })()}
                {(() => {
                    switch(this.state.modal) {
                        case 'login':
                            return <Login name="Login" register={false} cancel={this.cancel}/>;
                        case 'register':
                            return <Login name="Register" register={true} cancel={this.cancel}/>;
                        default:
                            return null; 
                    }
                })()}
                <Menu clickHandler={this.changeView}/>
            </div>
        );
    }

}

export default App;
