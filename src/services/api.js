class Api {
  url = 'https://simple-blog-api.crew.red/';

  fetch(url, method = 'GET', data = null ) {
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
    return this.fetch('posts')
  }

  getPost(id) {
	  return this.fetch(`posts/${id}?_embed=comments`);
  }
  
  addPost(data) {
	  return this.fetch('posts', 'POST', data)
  }
  
  changePost(id, data) {
	  return this.fetch(`posts/${id}`, 'PUT', data)
  }
}

const api = new Api(); 

export default api;