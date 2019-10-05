const server = 'http://localhost:8000/';

class Client {
    constructor() {
        this.server = server; 
    }

    send(url, method='GET') {
        var http = new XMLHttpRequest();
        var is_load = false;
        http.open(method, this.server + url, false);
        try {
            http.send();
            if(http.status != 200) {
                return {error : http.statusText, status : http.status};
            } 
        } catch (e) {
            if (e.name == 'NetworkError') {
                return {error : 'NetworkError', status: -1};
            }
            return {error : 'Error', status: -1};
        }
        return JSON.parse(http.response); 
    }

    getPosts() {
        return this.send('posts/');
    }
}

export default Client;