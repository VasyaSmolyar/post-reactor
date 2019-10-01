import React from 'react';
import Login from './Login.js';
import Main from './Main.js' 
//import Full from './Main.js' 
import logo from './logo.svg';
import './App.css';

function Header(props) {
    return <div className='header'><img src={props.logo} /><span>Post Reactor</span></div>
}

function Profile(props) {
    if (props.isLogged)
        return ( <div className="view">
        <h1>User "{props.user.name}" profile</h1>
        <button onClick={props.logout} id="logout">Logout</button>
        </div>);
    else
        return (<div className="view">
                    <h1>Login or register</h1>
                    <p>Use login "test" and password "testpass" for testing. Also you can register a new user.</p>
                    <button onClick={props.login}>Login</button>
                    <button onClick={props.register}>Register</button>
                </div>);
}

function Menu(props) {
    return (
        <div id="menu">
            <button data-target='main' onClick={props.clickHandler}>All posts</button>
            <button data-target='create' onClick={props.clickHandler}>Create post</button>
            <button data-target='profile' onClick={props.clickHandler}>Profile</button>
        </div>
    );
}

function Create(props) {
    return ( <div className="view">
    <h1>Create a post</h1>
    </div>
    );
}

function Full(props) {
    return (<div className="view">
        <h1>{props.post.title}</h1>
        <p>{props.post.text}</p>
        <button data-target='main' onClick={props.back}>Back</button>
    </div>);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged : false,
            user: null,
            view: 'profile',
            modal: null
        };
        this.changeView = this.changeView.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.cancel = this.cancel.bind(this);
        this.setUser = this.setUser.bind(this);
        this.logout = this.logout.bind(this);
        this.read = this.read.bind(this);
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
    setUser(user) {
        this.setState({
            isLogged: true,
            user: user,
            modal: null
        });
    }
    logout() {
        this.setState({
            isLogged: false,
            user: null
        });
    }
    read(post) {
        this.setState({
            view: <Full post={post} back={this.changeView}/>
        });
    }
    render() {
        return (
            <div>
                <Header />
                {(() => {
                    switch(this.state.view) {
                        case 'main':
                            return <Main check={this.read} />;
                        case 'create':
                            return <Create />;
                        case 'profile':
                            return <Profile user={this.state.user} isLogged={this.state.isLogged} register={this.register} login={this.login} logout={this.logout}/>;
                        default:
                            return this.state.view;
                    }
                })()}
                {(() => {
                    switch(this.state.modal) {
                        case 'login':
                            return <Login name="Login" register={false} cancel={this.cancel} setUser={this.setUser}/>;
                        case 'register':
                            return <Login name="Register" register={true} cancel={this.cancel} setUser={this.setUser}/>;
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
