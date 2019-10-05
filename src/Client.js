const server = 'http://localhost:8000/';

class Client {
    constructor() {
        this.server = server; 
    }

    send(url, callback, method='GET') {
        var http = new XMLHttpRequest();
        http.open(method, this.server + url, true);
        /*
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
        */
        http.onload = (function() {
            if(http.status != 200) {
                callback({error : http.statusText, status : http.status});
            } else {
                callback(JSON.parse(http.response));
            }
        });
        http.onerror = (function() {
            callback({error : 'Network Error', status: -1});
        });
       http.send();
    }

    getPosts(callback) {
        return this.send('posts/', callback);
    }
}

export default Client;