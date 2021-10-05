import React, {Component} from 'react';
import PubManager from './PubApi';

const pubManager = new PubManager();

class PubList extends Component {

  constructor(props){
    super(props);
    this.state = {
      pubs:[],
    };
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentDidMount() {
    var self = this;
    pubManager.getPubs().then(function(result) {
      self.setState({pubs: result});
    });
  }

  handleDelete(pub) {
    var self = this;
    pubManager.deletePub(pub).then(() => {
      var newArr = self.state.pubs.filter(function(obj){
        return obj.id !== pub.id;
      });
      self.setState({pubs: newArr})
    });
  }

  render() {
    var self = this
    return (
      <div className="container">
      <div className="pubs--list">
        <table className="table">
          <thead key="thead">
          <tr>
            <th>#</th>
            <th>Издательство</th>
            <th>Действия</th>
            <th><a className="btn btn-sm btn-outline-dark delete" href="/pubs/manage/">Создать издательство</a></th>
          </tr>
          </thead>
          <tbody>
            {this.state.pubs.map(function(c){
              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    <a href={"/pubs/manage/" + c.id} className="btn btn-sm btn-outline-light delete">Изменить</a>
                    <button onClick={()=> self.handleDelete(c)} className="btn btn-sm btn-outline-light delete">Удалить</button>
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
export default PubList;
