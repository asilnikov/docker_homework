import React, {Component} from 'react';
import BookManager from './BookApi';
import { Redirect } from "react-router-dom";

const bookManager = new BookManager();

class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      bbk: [],
      authors: [],
      author_sign: '',
      keywords: [],
      description: '',
      place: '',
      additional_data: '',
      series: '',
      issue_city: {},
      publishing_house: {},
      issue_year: '',
      pages: '',
      redirect: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(book) {
    var self = this;
    const {match: {params}} = this.props;
    if(params && params.pk) {
      bookManager.deleteBook(params.pk).then(()=>{
        this.setState({redirect:true})
      })
    }
  }

  componentDidMount(){
    const {match: {params}} = this.props;
    if(params && params.pk) {
      bookManager.getBook(params.pk).then((a)=>{
        this.setState({
          id:params.pk,
          name:a.name,
          bbk:a.bbk,
          authors:a.author,
          author_sign: a.author_sign,
          keywords: a.keywords,
          description: a.description,
          place: a.place,
          additional_data: a.additional_data,
          series: a.series,
          issue_city: a.issue_city,
          publishing_house: a.publishing_house,
          issue_year: a.issue_year,
          pages: a.pages,
        })
      })
    }
  }

  render() {
    var self = this
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="container">
          <div className="book-card">
          <div className="row justify-content-end">
            <div className="col-1">
              <a href={"/books/manage/" + this.props.match.params.pk} className="btn btn-sm btn-outline-light delete">Изменить</a>
            </div>
            <div className="col-1">
              <button onClick={()=> self.handleDelete(this.props.pk)} className="btn btn-sm btn-outline-light delete">Удалить</button>
            </div>
          </div>
              <table className="table">
              <tbody>
                  <tr>
                      {this.state.bbk.map(function(b){
                        return (
                          <td width="100">
                              {b.code}
                          </td>
                        )})}
                  </tr>
                  <tr>
                      <td>{this.state.author_sign}</td>
                      <td>{this.state.authors.map(function(a, index){
                          if (index===0) {
                              return (
                                  <span key={a.id}>{a.short_name}</span>)
                          }
                          else {
                              return (<span key={a.id}>, {a.short_name} </span>)
                          }})}
                      </td>
                  </tr>
                  <tr>
                      <td></td>
                      <td>{self.state.name} / {self.state.additional_data} - {self.state.issue_city.name}: {self.state.publishing_house.name}, {self.state.issue_year}. - {self.state.pages} - {self.state.series}</td>
                  </tr>
                  <tr>
                      <td></td>
                      <td><i>{this.state.description}</i></td>
                  </tr>
                  <tr>
                    <td>{this.state.place}</td>
                    <td></td>
                  </tr>
                  <tr>
                     <td></td>
                     <td>{this.state.keywords.map(function(w){
                        return (
                          <span>{w.name}, </span>
                        )
                      })}</td>
                  </tr>
              </tbody>
              </table>
          </div>
      </div>
    )
  }
}

export default BookCard;
