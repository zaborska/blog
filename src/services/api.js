class Api {
  url = 'https://simple-blog-api.crew.red/';

  fetch(url, data, method = 'GET') {
    try {
      const request = fetch(this.url + url, {
        method,
        headers: { 'Content-type': 'application/json' },
        body: data
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        } else {
          return response.json();
        }
      });
      return request;
    } catch (e) {
      console.log(e);
    }
  }

  getPosts() {
    return this.fetch('posts', null)
  }
}

const api = new Api(); 

export default api;