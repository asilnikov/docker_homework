import React, { Component } from 'react';
import BBKManager from './BBKApi';

const bbkManager = new BBKManager();

class BBKList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bbks:[],
    };
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentDidMount() {
    var self = this;
    bbkManager.getBBKs().then(function(result) {
      self.setState({bbks: result});
    });
  }

  handleDelete(bbk) {
    var self = this;
    bbkManager.deleteBBK(bbk.id).then(()=>{
      var newArr = self.state.bbks.filter(function(obj){
        return obj.id !== bbk.id;
      });
      self.setState({bbks: newArr})
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
            <th>Код</th>
            <th>Описание</th>
            <th>Действия</th>
            <th><a className="btn btn-sm btn-outline-dark delete" href="/bbks/manage/">Создать код ББК</a></th>
          </tr>
          </thead>
          <tbody>
            {this.state.bbks.map(function(a){
              return (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.code}</td>
                  <td>{a.description}</td>
                  <td>
                    <a href={"/bbks/manage/" + a.id} className="btn btn-sm btn-outline-light delete">Изменить</a>
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
export default BBKList;
