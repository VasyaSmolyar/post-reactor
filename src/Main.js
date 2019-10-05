import React from 'react';
import Picture from './default.jpg';
import Client from './Client.js';



function Post(props) {
    return (<div>
        <h3>{props.post.title}</h3>
        <p><img className="picture" src={props.post.pic} />{props.cut(props.post.text)}...</p>
        <button onClick={props.check}>Read</button>
    </div>);
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {posts : []};
        const client = new Client();
        client.getPosts(this.refresh);
        if (this.props.liveReload) {
            setInterval(() => {client.getPosts(this.refresh)}, 100);
        }
    }
    check(post) {
        return () => {
            return this.props.check(post);
        };
    }
    cut(str) {
        return str.slice(0, 200);
    }
    refresh(data) {
        this.setState({posts: data});
    }
    render() {
        const mes = this.state.posts;
        if('error' in mes) {
            return (<div className="view"><h1>{mes.error} {mes.status}</h1></div>)
        } 
        const data = mes.map((post) => {
            if (post.pic == '') {
                post.pic = Picture;
            }
            return <Post post={post} cut={this.cut} check={this.check(post)} />;
        });
        return ( <div className="view">
            <h1>All posts</h1>
            {data}
        </div>
        );
    }
}

export default Main;