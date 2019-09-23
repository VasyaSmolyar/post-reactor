import React from 'react';

const stdLogin = 'Login must consist only of latin letters and numbers';
const stdPass = 'Password must be longer than 7 characters and contain only latin letters and numbers';
const errConf = 'Passwords must match';
var reg = /^[\w\d]+$/;

function auth() {
    /*
    TODO: add work with backend 
    */
    var users = [
        {
            name: 'test',
            pass: 'testpass'
        }
    ];
    return {
        register: function(name, pass) {
            var res = null;
            users.forEach(function(user) {
                if(user.name == name) {
                    res = user;
                }
            });
            if(res != null) 
                return null;
            res = {
                name: name,
                pass: pass
            }
            users.push(res);
            res = Object.create(res);
            delete res.pass;
            return res;
        },
        login: function(name, pass) {
            var res = null;
            users.forEach(function(user) {
                if(user.name == name && user.pass == pass) {
                    res = user;
                }
            });
            if(res != null) {
                delete res.pass;
            }
            return res;
        }
    }

}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            confirm: '',
            loginMes: stdLogin,
            passMes: stdPass,
            confirmMes: '',
            loginClass: 'regular',
            passClass: 'regular',
            confirmClass: 'regular'
        };
        this.login = this.login.bind(this);
        this.password = this.password.bind(this);
        this.confirm = this.confirm.bind(this);
        this.send = this.send.bind(this);
    }

    login(event) {
        var text = event.target.value;
        var mes, step;
        if(text == '' || !reg.test(text)) {
            mes = stdLogin;
            step = 'error';
        } else {
            mes = '';
            step = 'great';
        }
        this.setState({
            login: text,
            loginMes: mes,
            loginClass: step
        });
    }

    password(event) {
        var text = event.target.value;
        var mes, conf, step, confStep = this.state.confClass;
        if(text == '' || !reg.test(text)) {
            step = 'error';
            mes = stdPass;
        } else if(text.length < 8) {
            step = 'error';
            mes = 'Password must be longer than 7 characters';
        } else if (this.state.confirm != '' && this.state.confirm != text) {
            confStep = 'error';
            conf = errConf;
        } else {
            conf = '';
            step = 'great';
        }
        this.setState({
            password: text,
            passMes: mes,
            confirmMes: conf,
            passClass: step,
            confirmClass: confStep
        });
    }

    confirm(event) {
        var text = event.target.value;
        var mes, step;
        if(text != this.state.password) {
            mes = errConf;
            step = 'error';
        } else {
            mes = '';
            step = 'great';
        }
        this.setState({
            confirm: text,
            confirmMes: mes,
            confirmClass: step
        });
    }

    send() {
        var request = auth(), user;
        var login = this.state.loginClass == this.state.passClass;
        var conf = this.state.passClass == this.state.confirmClass;
        var reg = this.state.confirmClass == this.state.loginClass;
        if(this.props.name == 'Login') {
            if(!login || (this.state.loginClass != 'great'))
                return;
            user = request.login(this.state.login, this.state.password);
        } else {
            if(!login || !conf || !reg || (this.state.loginClass != 'great'))
                return;
            user = request.register(this.state.login, this.state.password);
        }
        if(user != null) {
            this.props.setUser(user);
        }
    }

    render() {
        return (
            <div id="modal">
                <div>
                    <button onClick={this.props.cancel}>Cancel</button>
                    <input onChange={this.login} value={this.state.login} className={this.state.loginClass}/>
                    <span>{this.state.loginMes}</span>
                    <input onChange={this.password} value={this.state.password} className={this.state.passClass}/>
                    <span>{this.state.passMes}</span>
                    {(() => {if(this.props.register) {
                        return(<span>
                                <input onChange={this.confirm} value={this.state.confirm} className={this.state.confirmClass} />
                                <span>{this.state.confirmMes}</span>
                        </span>);
                    }})()}
                    <button onClick={this.send}>{this.props.name}</button>
                </div>
            </div>
        );
    }
}

export default Login;