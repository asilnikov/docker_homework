import React, { Component } from 'react';
import KeyWordManager from './KeyWordAPI';

const key_wordManager = new KeyWordManager();

class KeyWordList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key_words:[],
    };
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentDidMount() {
    var self = this;
    key_wordManager.getKeyWords().then(function(result) {
      self.setState({key_words: result});
    });
  }

  handleDelete(key_word) {
    var self = this;
    key_wordManager.deleteKeyWord(key_word.id).then(()=>{
      var newArr = self.state.key_words.filter(function(obj){
        return obj.id !== key_word.id;
      });
      self.setState({key_words: newArr})
    });
  }

  render() {
    var self = this
    return (
      <div className="container">
      <div className="authors--list">
        <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Ключевое слово</th>
            <th>Действия</th>
            <th><a className="btn btn-sm btn-outline-dark delete" href="/key_words/manage/">Создать ключевое слово</a></th>
          </tr>
          </thead>
          <tbody>
            {this.state.key_words.map(function(a){
              return (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>
                    <a href={"/key_words/manage/" + a.id} className="btn btn-sm btn-outline-light delete">Изменить</a>
                    <button onClick={()=> self.handleDelete(a)} className="btn btn-sm btn-outline-light delete">Удалить</button>
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
export default KeyWordList;
