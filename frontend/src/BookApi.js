import axios from 'axios'
const API_URL = 'http://localhost:8000/api/v1/lib/book/';

export default class BookManager {

  getBooks(){
    return axios.get(API_URL).then(response => response.data);
  }
  getBook(book){
    const url = API_URL + book + '/';
    return axios.get(url).then(response => response.data);
  }
  createBook(book){
    console.log(book);
    return axios.post(API_URL,book)
  }
  updateBook(book){
    console.log(book);
    const url = API_URL + book.pk +'/';
    return axios.patch(url,book)
  }
  deleteBook(book){
    const url = API_URL + book + '/';
    return axios.delete(url)
  }
}
