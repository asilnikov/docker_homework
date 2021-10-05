import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AuthorList from './AuthorList'
import AuthorCreateUpdate from './AuthorCreateUpdate'
import BookList from './BookList'
import BookCard from './BookCard'
import BookCreateUpdate from './BookCreateUpdate'
import CityList from './CityList'
import CityCreateUpdate from './CityCreateUpdate'
import PubList from './PubList'
import PubCreateUpdate from './PubCreateUpdate'
import BBKList from './BBKList'
import BBKCreateUpdate from './BBKCreateUpdate'
import KeyWordList from './KeyWordList'
import KeyWordCreateUpdate from './KeyWordCreateUpdate'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">Список книг</a>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"  aria-controls="navbarNavAltMarkup"  aria-expanded="false"  aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse"  id="navbarNavAltMarkup">
       <div className="navbar-nav">
           <a className="nav-item nav-link" href="/authors/">Авторы</a>
           <a className="nav-item nav-link" href="/cities/">Города</a>
           <a className="nav-item nav-link" href="/pubs/">Издательства</a>
           <a className="nav-item nav-link" href="/bbks/">Коды ББК</a>
           <a className="nav-item nav-link" href="/key_words/">Ключевые слова</a>


       </div>
    </div>
    </nav>

   <div className="content">
      <Route path="/" exact component={BookList} />
      <Route path="/books/card/:pk" exact component={BookCard} />
      <Route path="/books/manage/" exact component={BookCreateUpdate} />
      <Route path="/books/manage/:pk" exact component={BookCreateUpdate} />
      <Route path="/authors/" exact component={AuthorList} />
      <Route path="/authors/manage/:pk" exact component={AuthorCreateUpdate} />
      <Route path="/authors/manage/" exact component={AuthorCreateUpdate} />
      <Route path="/cities/" exact component={CityList} />
      <Route path="/cities/manage/:pk" exact component={CityCreateUpdate} />
      <Route path="/cities/manage/" exact component={CityCreateUpdate} />
      <Route path="/pubs/" exact component={PubList} />
      <Route path="/pubs/manage/:pk" exact component={PubCreateUpdate} />
      <Route path="/pubs/manage/" exact component={PubCreateUpdate} />
      <Route path="/bbks/" exact component={BBKList} />
      <Route path="/bbks/manage/" exact component={BBKCreateUpdate} />
      <Route path="/bbks/manage/:pk" exact component={BBKCreateUpdate} />
      <Route path="/key_words/" exact component={KeyWordList} />
      <Route path="/key_words/manage/" exact component={KeyWordCreateUpdate} />
      <Route path="/key_words/manage/:pk" exact component={KeyWordCreateUpdate} />
   </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}
export default App;
