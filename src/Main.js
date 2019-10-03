import React from 'react';
import Picture from './default.jpg';

function getPosts() {
    const sample = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non sem lacus. Fusce auctor mattis lorem. Maecenas lectus nunc, tempus sit amet velit ut, pulvinar imperdiet massa. Donec vitae enim viverra, hendrerit sapien quis, maximus ligula. Phasellus convallis odio magna. Aliquam eu elit vitae dui iaculis maximus. Maecenas nunc nulla, fermentum et imperdiet eget, rhoncus ac massa. Donec venenatis risus enim, vitae iaculis ex pellentesque et. Phasellus vestibulum malesuada nibh eget imperdiet. Proin cursus iaculis orci quis lacinia. Sed id tortor vestibulum, ultricies nulla nec, elementum massa. Donec neque turpis, mollis ut maximus ac, facilisis sed quam.

    Sed finibus suscipit accumsan. Integer nec auctor risus. Curabitur iaculis nibh pulvinar, facilisis tellus id, molestie turpis. Praesent tempor et urna eget finibus. Proin hendrerit metus ligula, non lacinia ipsum rhoncus vitae. Pellentesque eros sem, dignissim in elementum ut, consectetur sit amet metus. In congue nisl nulla, nec venenatis ipsum mollis vitae. Aliquam pellentesque metus mi, ut finibus nunc sagittis at. Aliquam erat volutpat. Sed mattis et nunc ac rutrum. Suspendisse volutpat lacinia nulla a eleifend. Cras laoreet eros nunc, eget tristique nisi consectetur quis. In pulvinar eu nibh vitae fermentum.

    Vivamus sed purus vel lectus mattis fringilla vitae eu purus. Vivamus imperdiet sapien sit amet facilisis fermentum. Pellentesque sit amet egestas purus. Praesent eu vulputate sapien. Donec egestas leo sapien, lacinia consequat augue convallis a. Suspendisse malesuada dolor eu orci scelerisque, nec faucibus velit dapibus. Sed ornare orci nec leo sodales, non pellentesque sapien viverra. Nunc arcu turpis, luctus eget tellus sed, finibus dignissim nisl. Pellentesque at aliquam metus. Nulla molestie dignissim lectus nec fringilla. 
    `;
    return [
        {title : 'Post 1', text : sample, pic: Picture},
        {title : 'Post 2', text : sample, pic: Picture},
        {title : 'Post 3', text : sample, pic: Picture}
    ];
}

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
    }
    check(post) {
        return () => {
            return this.props.check(post);
        };
    }
    cut(str) {
        return str.slice(0, 200);
    }
    render() {
        const data = getPosts().map((post) => {
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