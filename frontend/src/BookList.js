import React, { Component } from 'react';
import BookManager from './BookApi';


const bookManager = new BookManager();

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books:[],
    }
  };

  componentDidMount() {
    var self = this;
    bookManager.getBooks().then(function(result) {
      self.setState({books: result});
    });
  }



  render() {
    var self = this
    return (
      <div className="container">
      <div className="books--list">
        <table className="table">
          <thead key="thead">
          <tr >
            <th>#</th>
            <th>Автор</th>
            <th>Название</th>
            <th>Год издания</th>
            <th>Действия</th>
            <th><a className="btn btn-sm btn-outline-dark delete" href="/books/manage/">Создать книгу</a></th>
          </tr>
          </thead>
          <tbody>
            {this.state.books.map(function(b){
              return (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.author.map(function(a, index){
                    if (index===0) {
                      return (
                          <span key={a.id}>{a.short_name}</span>)
                    }
                    else {
                      return (<span key={a.id}>, {a.short_name} </span>)
                    }
                  })}</td>
                  <td>{b.name}</td>
                  <td>{b.issue_year}</td>
                  <td>
                    <a href={"/books/card/" + b.id} className="btn btn-sm btn-outline-light delete">Просмотреть карточку</a>
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default BookList;
