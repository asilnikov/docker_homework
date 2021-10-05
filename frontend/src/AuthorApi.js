import axios from 'axios'
const API_URL = 'http://localhost:8000/api/v1/lib/author/';

export default class AuthorManager {

  getAuthors(){
    return axios.get(API_URL).then(response => response.data);
  }
  getAuthor(author){
    const url = API_URL + author + '/';
    return axios.get(url).then(response => response.data);
  }
  createAuthor(author){
    return axios.post(API_URL,author)
  }
  updateAuthor(author){
    const url = API_URL + author.pk +'/';
    return axios.patch(url,author)
  }
  deleteAuthor(author){
    const url = API_URL + author.id + '/';
    return axios.delete(url)
  }
}
